import { submitMessage } from "../api/messages.js";
import { showAlert, qs } from "../utils/dom.js";

export function init() {
  const form = qs("#contactForm");
  if (!form) return;
  const alertEl = qs("#contactAlert");
  const loadTime = performance.now();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = qs("#contactName").value.trim();
    const email = qs("#contactEmail").value.trim();
    const subject = qs("#contactSubject")?.value.trim() || "";
    const type = qs("#contactType")?.value || "";
    const message = qs("#contactMessage").value.trim();
    const honeypot = qs("#contactWebsite")?.value.trim();

    // Anti-spam léger : honeypot + délai minimal 3s
    if (honeypot) {
      showAlert(alertEl, "Requête bloquée.", "danger");
      return;
    }
    if (performance.now() - loadTime < 3000) {
      showAlert(alertEl, "Merci de patienter quelques secondes avant d'envoyer.", "warning");
      return;
    }

    if (!type) {
      showAlert(alertEl, "Sélectionnez un type de demande.", "danger");
      return;
    }
    if (!subject) {
      showAlert(alertEl, "Précisez l'objet de votre demande.", "danger");
      return;
    }

    const fullMessage = `[Type] ${type}\n[Objet] ${subject}\n[Message] ${message}`;

    showAlert(alertEl, "Envoi en cours…", "info");

    try {
      const { error } = await submitMessage({ nom: name, email, message: fullMessage });
      if (error) throw error;
      form.reset();
      showAlert(alertEl, "Message envoyé. Nous revenons vers vous rapidement.", "success");
    } catch (err) {
      console.error(err);
      showAlert(alertEl, "Impossible d'enregistrer le message.", "danger");
    }
  });
}
