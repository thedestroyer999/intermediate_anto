import Swal from "sweetalert2";
import AuthApi from "../api/auth-api.js";
import LoginView from "../views/login-view.js";

class LoginPresenter {
  constructor({ view }) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.onLoginSubmit(this.handleLogin.bind(this));

    // Autofill email jika tersimpan sebelumnya
    const savedEmail = localStorage.getItem("lastEmail");
    if (savedEmail) {
      this.view.setEmail(savedEmail);
    }

    // Support tekan tombol Enter
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      passwordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const email = document.getElementById("email").value.trim();
          const password = document.getElementById("password").value;
          this.handleLogin(email, password);
        }
      });
    }
  }

  async handleLogin(email, password) {
    // Validasi kosong
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Empty Fields",
        text: "Email and password must not be empty.",
      });
      return;
    }

    try {
      Swal.showLoading();

      const result = await AuthApi.login(email, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("lastEmail", email); // simpan email terakhir untuk autofill

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Jika ingin arahkan berdasarkan role:
      // if (result.role === "admin") window.location.hash = "#/admin-dashboard";
      // else
      window.location.hash = "#/stories";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      Swal.hideLoading();
    }
  }
}

export default LoginPresenter;
