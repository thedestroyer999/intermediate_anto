import Swal from "sweetalert2";
import AuthApi from "../api/auth-api.js";

class AddPresenter {
  constructor({ view }) {
    this.view = view;
    this.token = localStorage.getItem("token");
    this.stream = null;
    this.capturedImage = null;
    this.uploadedImage = null;
    this.lat = null;
    this.lon = null;

    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.init();
  }

  async init() {
    document.getElementById("add-story-form").addEventListener("submit", (e) => this.handleSubmit(e));
    document.getElementById("capture-btn").addEventListener("click", () => this.captureImage());
    document.getElementById("upload-file").addEventListener("change", (e) => this.handleFileUpload(e));
    
    // Reset button (jika ada)
    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetForm());
    }

    window.addEventListener("hashchange", this.handleRouteChange);
    
    this.startCamera();
    this.initMap();
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.getElementById("camera-stream");
      if (video) video.srcObject = this.stream;
    } catch (error) {
      console.error("Camera error:", error);
      Swal.fire({
        icon: "error",
        title: "Camera Error",
        text: "Unable to access camera.",
      });
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  handleRouteChange() {
    this.stopCamera();
  }

  captureImage() {
    const video = document.getElementById("camera-stream");
    const canvas = document.getElementById("snapshot");
    const preview = document.getElementById("image-preview");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);
    canvas.style.display = "block";

    preview.style.display = "none";

    canvas.toBlob((blob) => {
      this.capturedImage = blob;
      this.uploadedImage = null;
    }, "image/jpeg");

    this.stopCamera();
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
      this.capturedImage = null;

      const preview = document.getElementById("image-preview");
      const canvas = document.getElementById("snapshot");

      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);

      canvas.style.display = "none";

      this.stopCamera();
    }
  }

  initMap() {
    const map = L.map("map-picker").setView([-6.2, 106.816666], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    let marker;
    map.on("click", (e) => {
      this.lat = e.latlng.lat;
      this.lon = e.latlng.lng;

      document.getElementById("location-coordinates").textContent =
        `Lat: ${this.lat.toFixed(5)}, Lng: ${this.lon.toFixed(5)}`;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const description = document.getElementById("description").value.trim();
    const imageToUpload = this.uploadedImage || this.capturedImage;

    if (!description) {
      Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Description is required.",
      });
      return;
    }

    if (!imageToUpload) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please capture or upload an image first.",
      });
      return;
    }

    if (this.lat === null || this.lon === null) {
      Swal.fire({
        icon: "warning",
        title: "Location Required",
        text: "Please select a location on the map.",
      });
      return;
    }

    try {
      Swal.showLoading();

      await AuthApi.addNewStory(this.token, {
        description,
        photo: imageToUpload,
        lat: this.lat,
        lon: this.lon,
      });

      this.stopCamera();

      Swal.fire({
        title: "Story Added",
        text: "Story added successfully!",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        window.location.hash = "#/home"; // Redirect ke home setelah submit
      });
    } catch (error) {
      console.error("Error uploading story:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to add story: ${error.message}`,
      });
    } finally {
      Swal.hideLoading();
    }
  }

  resetForm() {
    document.getElementById("add-story-form").reset();
    this.uploadedImage = null;
    this.capturedImage = null;
    this.lat = null;
    this.lon = null;

    document.getElementById("snapshot").style.display = "none";
    document.getElementById("image-preview").style.display = "none";
    document.getElementById("location-coordinates").textContent = "";

    this.startCamera(); // Restart kamera jika perlu
  }
}

export default AddPresenter;
