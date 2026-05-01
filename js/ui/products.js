import { formatPrice, escapeHtml } from "../utils/dom.js";

export function renderProducts(products = [], gridEl) {
  if (!gridEl) return;
  gridEl.innerHTML = "";

  if (!products.length) {
    gridEl.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info mb-0">Aucun produit pour le moment. Ajoutez-en depuis l'interface admin.</div>
      </div>`;
    return;
  }

  products.forEach((product, i) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3"; 

    const card = document.createElement("div");
    card.className = "card h-100 product-card shadow-sm card-appear";
    card.style.animationDelay = `${i * 80}ms`;

    // Logique de différenciation des images par défaut (Éthique Maritime & Industrielle)
    const nom = (product.nom || "").toLowerCase();
    let defaultImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"; // Logistique portuaire
    
    if (nom.includes("corde") || nom.includes("amarre")) {
      defaultImg = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80"; // Corde marine épaisse
    } else if (nom.includes("gant") || nom.includes("securit") || nom.includes("epi")) {
      defaultImg = "https://images.unsplash.com/photo-1581092921461-eab62e92c859?auto=format&fit=crop&w=800&q=80"; // Équipement sécurité industriel
    } else if (nom.includes("lamp") || nom.includes("eclairage") || nom.includes("pont")) {
      defaultImg = "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80"; // Projecteur / Lanterne marine
    } else if (nom.includes("huil") || nom.includes("moteur") || nom.includes("lubrifiant")) {
      defaultImg = "https://images.unsplash.com/photo-1619641782821-75177239ad21?auto=format&fit=crop&w=800&q=80"; // Huile moteur professionnelle
    } else if (nom.includes("vivre") || nom.includes("provisions") || nom.includes("nourriture") || nom.includes("frais")) {
      defaultImg = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"; // Fruits et légumes frais (avitaillement)
    } else if (nom.includes("soutage") || nom.includes("carburant") || nom.includes("fuel")) {
      defaultImg = "https://images.unsplash.com/photo-1582294158403-1250352b2123?auto=format&fit=crop&w=800&q=80"; // Tuyaux industriels / Bunkering
    }

    let finalImg = product.image || defaultImg;
    // Si l'image est un nom de fichier local (pas de http et pas déjà de images/), on ajoute le préfixe
    if (product.image && !product.image.startsWith("http") && !product.image.startsWith("images/")) {
      finalImg = `images/${product.image}`;
    }

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = finalImg;
    img.alt = escapeHtml(product.nom || "Produit");

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const title = document.createElement("h6");
    title.className = "fw-bold text-navy-900 mb-2";
    title.textContent = product.nom || "Produit";

    const desc = document.createElement("p");
    desc.className = "small text-muted mb-3 flex-grow-1";
    desc.textContent = product.description || "Équipement professionnel pour avitaillement maritime et soutage.";

    const price = document.createElement("p");
    price.className = "price mb-3 fs-6"; 
    price.textContent = formatPrice(product.prix);

    const btn = document.createElement("a");
    btn.href = "contact.html";
    btn.className = "btn btn-marine w-100 mt-auto";
    btn.textContent = "Commander";

    body.append(title, desc, price, btn);
    card.append(img, body);
    col.append(card);
    gridEl.append(col);
  });
}
