import L from "leaflet";

const DetailView = {
  _map: null, // Menyimpan instance map Leaflet

  render() {
    return `
      <section id="detail" class="detail-page" style="display: flex; flex-direction: column; align-items: center; margin-top: 2rem;">
        <div class="detail-container" style="max-width: 500px; width: 100%; background: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div class="detail-image-container">
            <img id="detail-image" alt="Story Image" class="detail-image" style="width: 100%; height: auto;" />
          </div>
          <div class="detail-info" style="padding: 1rem;">
            <h2 id="detail-name" style="margin-bottom: 0.5rem;"></h2>
            <p id="detail-description" style="margin-bottom: 1rem;"></p>
            <p style="font-size: 0.9rem; color: #555;">
              <strong>Created at:</strong> <span id="detail-createdAt"></span>
            </p>
            <p style="font-size: 0.9rem; color: #555;">
              <strong>Location:</strong> <span id="detail-location"></span>
            </p>
          </div>
        </div>
        <div id="map" style="width: 100%; height: 400px; margin-top: 2rem; max-width: 500px;"></div>
      </section>
    `;
  },

  showDetail(story) {
    const img = document.getElementById("detail-image");
    img.src = story.photoUrl || "default.jpg";
    img.alt = story.name || "Story Image";

    document.getElementById("detail-name").textContent =
      story.name || "No name";
    document.getElementById("detail-description").textContent =
      story.description || "No description";
    document.getElementById("detail-createdAt").textContent = new Date(
      story.createdAt,
    ).toLocaleString("en-GB");

    if (story.lat !== undefined && story.lon !== undefined) {
      document.getElementById("detail-location").textContent =
        `${story.lat}, ${story.lon}`;
      this.showMap(story.lat, story.lon);
    } else {
      document.getElementById("detail-location").textContent = "Unknown";
    }
  },

  showMap(lat, lon) {
    // Hancurkan map sebelumnya jika ada
    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    this._map = L.map("map").setView([lat, lon], 13);

    const streets = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      },
    );

    const satellite = L.tileLayer(
      "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=2sxrVeV47fFEDxOxOeGS",
      {
        attribution: "&copy; MapTiler & OpenStreetMap contributors",
      },
    );

    const dark = L.tileLayer(
      "https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=2sxrVeV47fFEDxOxOeGS",
      {
        attribution: "&copy; MapTiler & OpenStreetMap contributors",
      },
    );

    streets.addTo(this._map);

    L.marker([lat, lon])
      .addTo(this._map)
      .bindPopup("Location of the Story")
      .openPopup();

    L.control
      .layers({
        Streets: streets,
        Satellite: satellite,
        "Dark Mode": dark,
      })
      .addTo(this._map);
  },
};

export default DetailView;
