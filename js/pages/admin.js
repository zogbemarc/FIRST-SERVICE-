import { qs, showAlert, formatPrice, escapeHtml, showToast } from "../utils/dom.js";
import { fetchProducts, insertProduct, updateProduct, deleteProduct } from "../api/products.js";
import { fetchMessages } from "../api/messages.js";
import { currentSession, signIn, signOut, hasAdminRole } from "../api/auth.js";
import { ensureClient } from "../config/supabase.js";

let productsCache = [];
let messagesCache = [];

export function init() {
  const loginForm = qs("#loginForm");
  if (!loginForm) return;

  checkExistingSession();
  bindLogin();
  bindLogout();
  bindProductForm();
  bindTableActions();
  bindSearch();
}

async function checkExistingSession() {
  try {
    const session = await currentSession();
    if (session) {
      await onAuthenticated(session.user);
    }
  } catch (err) {
    console.warn("Pas de session active", err);
  }
}

function bindLogin() {
  const loginForm = qs("#loginForm");
  const loginAlert = qs("#loginAlert");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = qs("#loginEmail").value.trim();
    const password = qs("#loginPassword").value;
    showAlert(loginAlert, "Connexion…", "info");
    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      await onAuthenticated(data.session.user);
      showToast("Connecté", "success");
    } catch (err) {
      console.error(err);
      showAlert(loginAlert, "Identifiants invalides.", "danger");
    }
  });
}

function bindLogout() {
  const logoutBtn = qs("#logoutBtn");
  if (!logoutBtn) return;
  logoutBtn.addEventListener("click", async () => {
    await signOut();
    toggleAdmin(false);
    showToast("Déconnecté.", "info");
  });
}

async function onAuthenticated(user) {
  const loginAlert = qs("#loginAlert");
  try {
    const isAdmin = await hasAdminRole(user.email);
    if (!isAdmin) {
      await signOut();
      showAlert(
        loginAlert,
        "Accès refusé : rôle admin requis (table users.role = 'admin').",
        "danger"
      );
      return;
    }
    qs("#adminUser").textContent = user.email || "";
    toggleAdmin(true);
    await loadAdminProducts();
    await loadMessages();
  } catch (err) {
    console.error(err);
    showAlert(loginAlert, "Erreur lors de la vérification du rôle.", "danger");
  }
}

function toggleAdmin(authenticated) {
  const loginRow = qs("#loginRow");
  const adminPanels = qs("#adminPanels");
  if (authenticated) {
    loginRow?.classList.add("d-none");
    adminPanels?.classList.remove("d-none");
  } else {
    loginRow?.classList.remove("d-none");
    adminPanels?.classList.add("d-none");
  }
}

function bindProductForm() {
  const form = qs("#productForm");
  const alertEl = qs("#productAlert");
  const resetBtn = qs("#resetProductForm");
  if (!form) return;

  resetBtn?.addEventListener("click", () => resetProductForm(alertEl));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = qs("#productId").value;
    const fileInput = qs("#productImageFile");
    const file = fileInput?.files[0];
    let imageUrl = qs("#productImage").value; // Valeur actuelle (pour l'édition)

    showAlert(alertEl, "Préparation...", "info");

    try {
      // 1. Upload si un nouveau fichier est sélectionné
      if (file) {
        showAlert(alertEl, "Upload de l'image en cours...", "info");
        const supabase = ensureClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('produits') // Bucket 'produits'
          .upload(filePath, file);

        if (uploadError) {
          console.error("Storage Error:", uploadError);
          throw new Error("Erreur lors de l'upload. Vérifiez que le bucket 'produits' existe dans Supabase.");
        }

        const { data: { publicUrl } } = supabase.storage
          .from('produits')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      // 2. Préparer le payload
      const payload = {
        nom: qs("#productName").value.trim(),
        description: qs("#productDescription").value.trim(),
        prix: parseInt(qs("#productPrice").value, 10),
        image: imageUrl || "PRODUIT.png",
      };

      if (!payload.nom) {
        showAlert(alertEl, "Le nom du produit est requis.", "danger");
        return;
      }
      if (Number.isNaN(payload.prix) || payload.prix < 0) {
        showAlert(alertEl, "Le prix doit être un nombre entier positif (ex: 15000).", "danger");
        return;
      }

      showAlert(alertEl, "Enregistrement en base de données...", "info");

      const result = id
        ? await updateProduct(id, payload)
        : await insertProduct(payload);

      if (result.error) throw result.error;

      resetProductForm(alertEl);
      await loadAdminProducts();
      showToast(id ? "Produit mis à jour." : "Produit ajouté.", "success");
    } catch (err) {
      console.error(err);
      showAlert(alertEl, err.message || "Erreur lors de l'opération.", "danger");
    }
  });
}

function resetProductForm(alertEl) {
  qs("#productForm")?.reset();
  qs("#productId").value = "";
  alertEl?.classList.add("d-none");
}

function bindTableActions() {
  const table = qs("#adminProductsTable");
  if (!table) return;

  table.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("[data-edit-id]");
    const deleteBtn = e.target.closest("[data-delete-id]");

    if (editBtn) {
      const id = Number(editBtn.dataset.editId);
      const product = productsCache.find((p) => Number(p.id) === id);
      if (product) fillProductForm(product);
    }

    if (deleteBtn) {
      const id = Number(deleteBtn.dataset.deleteId);
      if (!id) return;
      const confirmed = confirm("Supprimer ce produit ?");
      if (!confirmed) return;
      try {
        const { error } = await deleteProduct(id);
        if (error) throw error;
        await loadAdminProducts();
        showToast("Produit supprimé.", "success");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression du produit.");
      }
    }
  });
}

function fillProductForm(product) {
  qs("#productId").value = product.id || "";
  qs("#productName").value = product.nom || "";
  qs("#productDescription").value = product.description || "";
  qs("#productPrice").value = product.prix || "";
  qs("#productImage").value = product.image || "";
  const fileInput = qs("#productImageFile");
  if (fileInput) fileInput.value = "";
}

async function loadAdminProducts() {
  const tbody = qs("#adminProductsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="3" class="text-muted small"><span class="spinner-border spinner-border-sm me-2" role="status" aria-label="Chargement"></span>Chargement…</td></tr>`;
  try {
    const { data, error } = await fetchProducts();
    if (error) throw error;
    productsCache = data || [];
    renderAdminProducts(tbody, filterProducts());
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="3" class="text-danger small">Erreur de chargement.</td></tr>`;
  }
}

function renderAdminProducts(tbody, products) {
  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-muted small">Aucun produit.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  products.forEach((p) => {
    const tr = document.createElement("tr");
    tr.classList.add("fade-up");
    tr.style.animationDelay = `${products.indexOf(p) * 40}ms`;
    const displayImage = p.image && p.image.startsWith('http') 
      ? `<a href="${p.image}" target="_blank" class="text-primary small text-decoration-none"><i class="bi bi-link-45deg"></i> Image personnalisée</a>`
      : `<span class="small">${escapeHtml(p.image || 'PRODUIT.png')}</span>`;

    tr.innerHTML = `
      <td>
        <span class="fw-bold">${escapeHtml(p.nom)}</span><br>
        <small class="text-muted">Image: ${displayImage}</small>
      </td>
      <td class="text-nowrap">${formatPrice(p.prix) || "-"}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary me-1" data-edit-id="${p.id}" title="Modifier"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" data-delete-id="${p.id}" title="Supprimer"><i class="bi bi-trash"></i></button>
      </td>`;
    tbody.append(tr);
  });
}

async function loadMessages() {
  const tbody = qs("#messagesList");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="4" class="text-muted small"><span class="spinner-border spinner-border-sm me-2" role="status" aria-label="Chargement"></span>Chargement…</td></tr>`;

  try {
    const { data, error } = await fetchMessages();
    if (error) throw error;
    messagesCache = data || [];
    renderMessages(tbody, filterMessages());
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="4" class="text-danger small">Erreur de chargement.</td></tr>`;
  }
}

function renderMessages(tbody, messages) {
  if (!messages.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-muted small">Aucun message.</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  messages.forEach((m) => {
    const tr = document.createElement("tr");
    tr.classList.add("fade-up");
    tr.style.animationDelay = `${messages.indexOf(m) * 40}ms`;
    const date = m.created_at ? new Date(m.created_at).toLocaleString() : "-";
    tr.innerHTML = `
      <td>${escapeHtml(m.nom)}</td>
      <td>${escapeHtml(m.email)}</td>
      <td>${escapeHtml(m.message)}</td>
      <td class="small text-muted">${date}</td>`;
    tbody.append(tr);
  });
}

function bindSearch() {
  const productSearch = qs("#productSearch");
  const messageSearch = qs("#messageSearch");
  productSearch?.addEventListener("input", () => {
    const tbody = qs("#adminProductsTable tbody");
    if (tbody) renderAdminProducts(tbody, filterProducts());
  });
  messageSearch?.addEventListener("input", () => {
    const tbody = qs("#messagesList");
    if (tbody) renderMessages(tbody, filterMessages());
  });
}

function filterProducts() {
  const term = qs("#productSearch")?.value.trim().toLowerCase() || "";
  if (!term) return productsCache;
  return productsCache.filter((p) => (p.nom || "").toLowerCase().includes(term));
}

function filterMessages() {
  const term = qs("#messageSearch")?.value.trim().toLowerCase() || "";
  if (!term) return messagesCache;
  return messagesCache.filter((m) => {
    const blob = `${m.nom || ""} ${m.email || ""} ${m.message || ""}`.toLowerCase();
    return blob.includes(term);
  });
}
