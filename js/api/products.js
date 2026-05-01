import { ensureClient } from "../config/supabase.js";

export async function fetchProducts() {
  const supabase = ensureClient();
  return supabase.from("produits").select("*").order("nom", { ascending: true });
}

export async function insertProduct(payload) {
  const supabase = ensureClient();
  return supabase.from("produits").insert(payload).select();
}

export async function updateProduct(id, payload) {
  const supabase = ensureClient();
  return supabase.from("produits").update(payload).eq("id", id).select();
}

export async function deleteProduct(id) {
  const supabase = ensureClient();
  return supabase.from("produits").delete().eq("id", id);
}
