import { setActiveNav, showAlert } from "./dom.js";
import { supabaseReady } from "../config/supabase.js";

const PAGE_MAP = {
  home: "index",
  services: "services",
  produits: "produits",
  contact: "contact",
  admin: "admin",
};

document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.page || "home";
  setActiveNav(page);
  injectCookieNotice();
  enableReveal();

  // Alerte de configuration Supabase sur les pages qui en ont besoin
  if (!supabaseReady && ["produits", "contact", "admin"].includes(page)) {
    const status = document.querySelector("#produitsStatus") || document.querySelector("#contactAlert");
    showAlert(
      status,
      "Supabase non configure : ajoutez vos identifiants dans js/config/supabase.js.",
      "warning"
    );
    return;
  }

  const moduleName = PAGE_MAP[page] || "index";
  try {
    const module = await import(`../pages/${moduleName}.js`);
    if (module?.init) {
      module.init();
    }
  } catch (err) {
    console.error(`Impossible de charger le module de page ${moduleName}`, err);
  }
});

function injectCookieNotice() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("cookieNoticeAccepted") === "1") return;

  const banner = document.createElement("div");
  banner.id = "cookie-notice";
  banner.style.position = "fixed";
  banner.style.bottom = "12px";
  banner.style.left = "12px";
  banner.style.right = "12px";
  banner.style.zIndex = "1050";
  banner.style.padding = "12px 14px";
  banner.style.background = "#0d6efd";
  banner.style.color = "#fff";
  banner.style.borderRadius = "8px";
  banner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  banner.style.display = "flex";
  banner.style.flexWrap = "wrap";
  banner.style.gap = "10px";
  banner.innerHTML = `
    <div style="flex:1;min-width:260px;font-size:14px;">
      Nous n'utilisons pas de cookies marketing. Des cookies techniques peuvent être créés par Supabase pour l'authentification.
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <button id="cookie-accept" class="btn btn-light btn-sm">Compris</button>
      <a href="privacy.html" class="btn btn-outline-light btn-sm">Détails</a>
    </div>`;

  banner.querySelector("#cookie-accept")?.addEventListener("click", () => {
    localStorage.setItem("cookieNoticeAccepted", "1");
    banner.remove();
  });

  document.body.append(banner);
}

function enableReveal() {
  if (!("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach((el) => {
    obs.observe(el);
    // fallback : si déjà visible au chargement, force la classe
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("visible");
    }
  });
}
