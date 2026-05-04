import { fetchProducts } from "../api/products.js";
import { renderProducts } from "../ui/products.js";
import { showAlert } from "../utils/dom.js";

export async function init() {
  const grid = document.querySelector("#produitsGrid");
  const status = document.querySelector("#produitsStatus");
  if (!grid) return;

  if (status) status.classList.add("d-none");

  try {
    // Essayer de charger depuis Supabase en premier
    console.log("Tentative de chargement depuis Supabase...");
    const { data, error } = await fetchProducts();
    
    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }
    
    if (data && data.length > 0) {
      console.log("Produits chargés depuis Supabase:", data);
      renderProducts(data, grid);
      if (status) {
        showAlert(status, `${data.length} produit(s) chargé(s) depuis Supabase`, "success");
      }
    } else {
      console.log("Aucun produit dans Supabase, utilisation des produits par défaut");
      const defaultProducts = getLocalProducts();
      renderProducts(defaultProducts, grid);
      if (status) {
        showAlert(status, "Affichage des produits par défaut (ajoutez des produits dans Supabase)", "info");
      }
    }
  } catch (err) {
    console.error("Erreur complète:", err);
    // Si Supabase ne fonctionne pas, utiliser des produits locaux
    const localProducts = getLocalProducts();
    renderProducts(localProducts, grid);
    // Message supprimé pour ne pas afficher l'alerte mode démo
    // if (status) {
    //   showAlert(status, "Supabase non accessible - Mode démo activé", "warning");
    // }
  }
}

// Produits locaux par défaut
function getLocalProducts() {
  // Forcer la réinitialisation avec 4 produits par défaut
  const defaultProducts = [
    {
      id: 1,
      nom: "Corde Marine Premium",
      description: "Corde en polypropylène haute résistance, idéale pour les amarres et le remorquage maritime.",
      prix: 15000,
      image: "ava.png"
    },
    {
      id: 2,
      nom: "Gilet de Sauvetage",
      description: "Gilet de sauvetage certifié SOLAS, avec fermeture éclair et sifflet d'urgence.",
      prix: 8500,
      image: "soutage.png"
    },
    {
      id: 3,
      nom: "Kit de Réparation Coque",
      description: "Kit complet pour réparations d'urgence comprenant résine epoxy, tissu de verre et applicateurs.",
      prix: 22000,
      image: "about.png"
    },
    {
      id: 4,
      nom: "Bouée de Sauvetage",
      description: "Bouée circulaire avec lumière LED et sifflet, conforme aux normes maritimes internationales.",
      prix: 12000,
      image: "first.png"
    }
  ];
  
  // Sauvegarder tous les produits par défaut
  localStorage.setItem('localProducts', JSON.stringify(defaultProducts));
  console.log("Produits par défaut chargés:", defaultProducts.length, "produits");
  return defaultProducts;
}
