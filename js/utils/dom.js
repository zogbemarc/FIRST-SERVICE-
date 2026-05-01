export const qs = (sel, scope = document) => scope.querySelector(sel);
export const qsa = (sel, scope = document) => [...scope.querySelectorAll(sel)];

export function setActiveNav(page) {
  qsa(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

export function showAlert(el, message, type = "info") {
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = message;
  el.classList.remove("d-none");
}

export function showToast(message, type = "info", delay = 3000) {
  const container = document.querySelector("#toastContainer") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${mapType(type)} border-0 show toast-animate`;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${escapeHtml(message)}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Fermer"></button>
    </div>`;
  toast.querySelector("button")?.addEventListener("click", () => toast.remove());
  container.appendChild(toast);
  setTimeout(() => toast.remove(), delay);
}

function createToastContainer() {
  const div = document.createElement("div");
  div.id = "toastContainer";
  div.className = "toast-container position-fixed top-0 end-0 p-3";
  div.style.zIndex = "2000";
  document.body.appendChild(div);
  return div;
}

function mapType(type) {
  if (["success", "danger", "warning", "info"].includes(type)) return type;
  return "secondary";
}

export function formatPrice(value) {
  if (value === undefined || value === null || value === "") return "";
  const num = Number(value);
  // Formatage pour le FCFA (sans décimales car c'est l'usage courant)
  return Number.isFinite(num) ? `${num.toLocaleString("fr-FR")} FCFA` : "";
}

export function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
