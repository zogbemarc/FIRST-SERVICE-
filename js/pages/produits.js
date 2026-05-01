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
    showAlert(status, "Impossible de charger les produits depuis Supabase.", "danger");
  }
}
