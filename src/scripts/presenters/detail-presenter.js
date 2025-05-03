import Swal from "sweetalert2";
import AuthApi from "../api/auth-api.js";

class DetailPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem("token");
    this.init();
  }

  async init() {
    try {
      if (!this.token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login first.",
        });
        window.location.hash = "#/login";
        return;
      }

      const url = window.location.hash.split("/");
      const id = url[url.length - 1];

      if (!id) {
        Swal.fire({
          icon: "error",
          title: "Invalid URL",
          text: "Story ID not found.",
        });
        return;
      }

      // Tampilkan loading (jika view mendukung)
      if (this.view.showLoading) {
        this.view.showLoading();
      }

      const story = await AuthApi.getDetailStory(this.token, id);

      if (!story) {
        Swal.fire({
          icon: "info",
          title: "Not Found",
          text: "Story not found.",
        });
        return;
      }

      this.view.showDetail(story);
    } catch (error) {
      console.error("DetailPresenter Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load story detail.",
      });
    } finally {
      // Sembunyikan loading jika ada
      if (this.view.hideLoading) {
        this.view.hideLoading();
      }
    }
  }
}

export default DetailPresenter;
