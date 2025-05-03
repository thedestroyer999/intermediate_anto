import "./assets/styles/style.css";
import "./routes/router.js";

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("skip-link")) {
    e.preventDefault();

    const targetId = e.target.getAttribute("href")?.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus();

        // Hapus tabindex setelah fokus untuk mencegah tabbing aneh
        target.addEventListener(
          "blur",
          () => {
            target.removeAttribute("tabindex");
          },
          { once: true }
        );
      }, 0);
    } else {
      console.warn(`Element with ID '${targetId}' not found.`);
    }
  }
});

// Tambahan: Fokus ke #maincontent jika hash langsung mengarah ke #/stories
window.addEventListener("load", () => {
  if (window.location.hash === "#/stories") {
    const main = document.getElementById("maincontent");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.addEventListener("blur", () => {
        main.removeAttribute("tabindex");
      }, { once: true });
    }
  }
});
