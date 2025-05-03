import Swal from "sweetalert2";
import AuthApi from "../api/auth-api.js";
import StoryView from "../views/story-view.js";

class StoryPresenter {
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

      const stories = await AuthApi.getStories(this.token);
      this.view.showStories(stories);

      this.attachDetailButtonListeners();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Stories",
        text: "There was an issue loading the stories.",
      });
    }
  }

  attachDetailButtonListeners() {
    const detailButtons = document.querySelectorAll(".detail-button");

    detailButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = button.dataset.id;
        if (id) {
          window.location.hash = `#/stories/${id}`;
        }
      });
    });
  }
}

export default StoryPresenter;
