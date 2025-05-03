import logoImg from "../../assets/images/logo.png";

const LoginView = {
  render() {
    return `
      <section id="main-content" tabindex="-1" class="login-section">
        <form id="login-form" class="login-form" novalidate>
          <div class="login-logo-container">
            <img src="${logoImg}" alt="Logo" class="login-logo" />
            <h2 ">storylane app</h2>
          </div>
          <input type="email" id="email" placeholder="Email" aria-label="Email" required />
          <input type="password" id="password" placeholder="Password" aria-label="Password" required />
          <button type="submit">Login</button>
          <a href="#/register">Don't have an account? Register</a>
        </form>
      </section>
    `;
  },

  onLoginSubmit(callback) {
    // Pastikan DOM sudah dirender sebelum binding event
    setTimeout(() => {
      const form = document.querySelector("#login-form");
      if (!form) return;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = form.querySelector("#email").value.trim();
        const password = form.querySelector("#password").value.trim();
        callback(email, password);
      });
    }, 0);
  },
};

export default LoginView;
