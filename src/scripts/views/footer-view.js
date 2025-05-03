class FooterView {
  constructor() {
    this.footerElement = document.createElement("footer");
    this.footerElement.classList.add("footer");
    this.footerElement.setAttribute("id", "footer-content");
    this.footerElement.setAttribute("tabindex", "-1"); // Agar bisa difokus saat skip link diklik
  }

  render() {
    this.footerElement.innerHTML = `
      <div class="footer-container">
        <p class="footer-credit">© 2025 Storylane app| anto </p>
      </div>
    `;
    return this.footerElement;
  }
}

export default FooterView;
