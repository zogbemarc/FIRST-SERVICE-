import { ensureClient } from "../config/supabase.js";

export async function currentSession() {
  const supabase = ensureClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signIn(email, password) {
  const supabase = ensureClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = ensureClient();
  return supabase.auth.signOut();
}

export async function hasAdminRole(email) {
  if (!email) return false;
  const supabase = ensureClient();
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("email", email)
    .maybeSingle();
  if (error) {
    console.error("Role check error", error);
    return false;
  }
  return data?.role === "admin";
}
