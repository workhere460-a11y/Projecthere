const form = document.getElementById("contactForm");
if (form) form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `[Wellness Daily] ${data.get("subject")}`;
  const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
  const mailto = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById("formStatus").textContent = "Your email app should open with the message prepared. Replace hello@example.com in contact.js with your real contact email before publishing.";
  window.location.href = mailto;
});