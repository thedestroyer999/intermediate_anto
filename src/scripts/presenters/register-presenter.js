import Swal from "sweetalert2";
import AuthApi from "../api/auth-api.js";
import RegisterView from "../views/register-view.js";

class RegisterPresenter {
  constructor({ view }) {
    this.view = view;
    this.init();
  }

  init() {
    this.view.onRegisterSubmit(this.handleRegister.bind(this));
  }

  async handleRegister(name, email, password) {
    // Validasi input kosong
    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Name, email, and password are required.",
      });
      return;
    }

    // Validasi email format
    if (!this.isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Validasi panjang password
    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      Swal.showLoading();

      await AuthApi.register(name, email, password);

      // Simpan email agar bisa di-autofill saat login
      localStorage.setItem("lastEmail", email);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in!",
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.hash = "#/login";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      Swal.hideLoading();
    }
  }

  isValidEmail(email) {
    // Regex sederhana untuk validasi email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

export default RegisterPresenter;
