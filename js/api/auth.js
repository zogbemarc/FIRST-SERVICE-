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

export const login = async (email, password) => {
  console.log("Tentative de connexion avec:", email, password);
  
  // Identifiants par défaut pour contourner le blocage serveur
  if (email === 'admin@firstservice.com' && password === '1234') {
    console.log("Accès administrateur autorisé (Mode local)");
    window.location.href = 'admin.html';
    return;
  }

  // Tentative normale via Supabase (si le quota le permet)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Erreur de connexion : " + error.message);
  } else {
    window.location.href = 'admin.html';
  }
};

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
