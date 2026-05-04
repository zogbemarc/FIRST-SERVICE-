import { fetchProducts } from "../api/products.js";
import { renderProducts } from "../ui/products.js";
import { showAlert } from "../utils/dom.js";

export async function init() {
  const grid = document.querySelector("#produitsGrid");
  const status = document.querySelector("#produitsStatus");
  if (!grid) return;

  if (status) status.classList.add("d-none");

  try {
    const { data, error } = await fetchProducts();
    if (error) throw error;
    renderProducts(data || [], grid);
  } catch (err) {
    console.error(err);
    // Si Supabase ne fonctionne pas, utiliser des produits locaux
    const localProducts = getLocalProducts();
    renderProducts(localProducts, grid);
    if (status) {
      showAlert(status, "Affichage des produits locaux (Mode démo)", "info");
    }
  }
}

// Produits locaux par défaut
function getLocalProducts() {
  const savedProducts = localStorage.getItem('localProducts');
  if (savedProducts) {
    return JSON.parse(savedProducts);
  }
  
  // Produits par défaut
  const defaultProducts = [
    {
      id: 1,
      nom: "Corde Marine Premium",
      description: "Corde en polypropylène haute résistance, idéale pour les amarres et le remorquage maritime.",
      prix: 15000,
      image: "PRODUIT.png"
    },
    {
      id: 2,
      nom: "Gilet de Sauvetage",
      description: "Gilet de sauvetage certifié SOLAS, avec fermeture éclair et sifflet d'urgence.",
      prix: 8500,
      image: "PRODUIT.png"
    },
    {
      id: 3,
      nom: "Kit de Réparation Coque",
      description: "Kit complet pour réparations d'urgence comprenant résine epoxy, tissu de verre et applicateurs.",
      prix: 22000,
      image: "PRODUIT.png"
    }
  ];
  
  localStorage.setItem('localProducts', JSON.stringify(defaultProducts));
  return defaultProducts;
}
