import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.46.0/+esm";

// Renseignez vos identifiants Supabase ici.
// Option rapide : remplacez les valeurs ci-dessous.
// Option plus sûre : définissez window.__SUPABASE_URL et window.__SUPABASE_ANON_KEY
// dans un petit script chargé avant js/utils/init.js (non commité).
// URL corrigée : project ID = msnjheipxldinmxvvmew (deux "v" à la fin, un seul "x").
export const SUPABASE_URL = "https://msnjheipxldinmxvvmew.supabase.co";
// Clé publishable (recommandée côté navigateur)
export const SUPABASE_ANON_KEY = "sb_publishable_olaM1LlSrPUDoCG2ruEnPw_dKvhOOGT";

const urlFromWindow =
  typeof window !== "undefined" ? window.__SUPABASE_URL : undefined;
const keyFromWindow =
  typeof window !== "undefined" ? window.__SUPABASE_ANON_KEY : undefined;

const url = urlFromWindow || SUPABASE_URL;
const key = keyFromWindow || SUPABASE_ANON_KEY;

export const supabaseReady =
  url.startsWith("http") && !url.includes("YOUR") && key && !key.includes("YOUR");

export const supabase = supabaseReady ? createClient(url, key) : null;

export function ensureClient() {
  if (!supabaseReady || !supabase) {
    throw new Error(
      "Supabase non configuré. Ajoutez vos identifiants dans js/config/supabase.js ou via window.__SUPABASE_URL / window.__SUPABASE_ANON_KEY."
    );
  }
  return supabase;
}
