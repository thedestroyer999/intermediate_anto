import logoImg from "../../assets/images/logo.png";

const RegisterView = {
  render() {
    return `
      <section class="login-section">
        <form id="register-form" class="login-form" novalidate>
          <div class="login-logo-container">
            <img src="${logoImg}" alt="Logo" />
            <h2>Register</h2>
          </div>
          <input type="text" id="name" placeholder="Name" aria-label="Name" required />
          <input type="email" id="email" placeholder="Email" aria-label="Email" required />
          <input type="password" id="password" placeholder="Password" aria-label="Password" required />
          <button type="submit">Register</button>
          <a href="#/login">Already have an account? Login</a>
        </form>
      </section>
    `;
  },

  onRegisterSubmit(callback) {
    setTimeout(() => {
      const form = document.querySelector("#register-form");
      if (!form) return;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const password = form.querySelector("#password").value.trim();
        callback(name, email, password);
      });
    }, 0);
  },
};

export default RegisterView;
