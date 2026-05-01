/* ============================================================
   LOGIQUE DE L'ESPACE ADMINISTRATION (JavaScript)
   ============================================================ */

/* 1. LES IMPORTATIONS : On ramène des outils depuis d'autres fichiers */
import { qs, showAlert, formatPrice, escapeHtml, showToast } from "../utils/dom.js";
import { fetchProducts, insertProduct, updateProduct, deleteProduct } from "../api/products.js";
import { fetchMessages } from "../api/messages.js";
import { currentSession, signIn, signOut, hasAdminRole } from "../api/auth.js";
import { ensureClient } from "../config/supabase.js";

/* LES VARIABLES "CACHE" : On stocke les données ici pour éviter de les 
   redemander à chaque fois au serveur (gain de vitesse) */
let productsCache = [];
let messagesCache = [];

/* LA FONCTION INIT : C'est le point de départ du script sur cette page */
export function init() {
  const loginForm = qs("#loginForm");
  if (!loginForm) return;

  checkExistingSession(); // Vérifie si l'admin est déjà connecté
  bindLogin();            // Prépare le bouton de connexion
  bindLogout();           // Prépare le bouton de déconnexion
  bindProductForm();      // Prépare le formulaire d'ajout/modif de produits
  bindTableActions();     // Prépare les boutons Supprimer/Modifier dans le tableau
  bindSearch();           // Prépare la barre de recherche
}

/* GESTION DE LA CONNEXION */
async function checkExistingSession() {
  /* On demande à Supabase si l'utilisateur est déjà identifié */
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

  /* Quand on clique sur "Se connecter" */
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche la page de se recharger
    const email = qs("#loginEmail").value.trim();
    const password = qs("#loginPassword").value;
    
    showAlert(loginAlert, "Connexion en cours…", "info");
    
    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      await onAuthenticated(data.session.user);
      showToast("Vous êtes connecté", "success");
    } catch (err) {
      console.error(err);
      showAlert(loginAlert, "Email ou mot de passe incorrect.", "danger");
    }
  });
}

/* GESTION DES PRODUITS (AJOUT ET MODIFICATION) */
function bindProductForm() {
  const form = qs("#productForm");
  const alertEl = qs("#productAlert");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    /* On récupère les valeurs saisies dans le formulaire */
    const id = qs("#productId").value; // Si y'a un ID, c'est une modification
    const payload = {
      nom: qs("#productName").value.trim(),
      description: qs("#productDescription").value.trim(),
      prix: parseInt(qs("#productPrice").value, 10),
      image: qs("#productImage").value || "PRODUIT.png",
    };

    try {
      showAlert(alertEl, "Enregistrement...", "info");

      /* Si on a un ID, on modifie, sinon on crée un nouveau produit */
      const result = id
        ? await updateProduct(id, payload)
        : await insertProduct(payload);

      if (result.error) throw result.error;

      /* On vide le formulaire et on recharge la liste */
      form.reset();
      qs("#productId").value = "";
      await loadAdminProducts();
      showToast(id ? "Produit mis à jour." : "Produit ajouté.", "success");
    } catch (err) {
      showAlert(alertEl, "Une erreur est survenue.", "danger");
    }
  });
}

/* AFFICHAGE DES MESSAGES REÇUS */
async function loadMessages() {
  const tbody = qs("#messagesList");
  if (!tbody) return;
  
  tbody.innerHTML = "<tr><td colspan='4'>Chargement des messages...</td></tr>";

  try {
    const { data, error } = await fetchMessages();
    if (error) throw error;
    messagesCache = data || [];
    
    /* On vide le tableau et on ajoute chaque message ligne par ligne */
    tbody.innerHTML = "";
    messagesCache.forEach((m) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(m.nom)}</td>
        <td>${escapeHtml(m.email)}</td>
        <td>${escapeHtml(m.message)}</td>
        <td class="small text-muted">${new Date(m.created_at).toLocaleString()}</td>`;
      tbody.append(tr);
    });
  } catch (err) {
    tbody.innerHTML = "<tr><td colspan='4' class='text-danger'>Erreur lors du chargement.</td></tr>";
  }
}

