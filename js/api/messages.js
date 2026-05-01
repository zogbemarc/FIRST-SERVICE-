import { ensureClient } from "../config/supabase.js";

export async function submitMessage(payload) {
  const supabase = ensureClient();
  return supabase.from("messages").insert(payload);
}

export async function fetchMessages() {
  const supabase = ensureClient();
  return supabase
    .from("messages")
    .select("id, nom, email, message, created_at")
    .order("created_at", { ascending: false });
}
