import L from "leaflet";

const StoryView = {
  _map: null,
  _markers: [],

  render() {
    return `
      <section id="main-content" tabindex="-1" class="story-feed" style="padding: 1rem;">
        <h2 tabindex="0" style="margin-bottom: 1rem;">Daftar Cerita</h2>
        <div id="story-list" class="story-list" role="list" aria-label="Daftar cerita pengguna"></div>
        <div id="map" style="height: 400px; margin-top: 20px;" aria-label="Peta lokasi cerita"></div>
      </section>
    `;
  },

  showStories(stories) {
    const storyList = document.getElementById("story-list");
    storyList.innerHTML = "";

    // Map reset
    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    this._map = L.map("map").setView([-6.2, 106.816666], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this._map);

    const latLngs = [];
    this._markers = [];

    if (!stories.length) {
      storyList.innerHTML = `<p style="text-align:center; color: gray;">Tidak ada cerita untuk ditampilkan.</p>`;
      return;
    }

    stories.forEach((story, index) => {
      const storyItem = document.createElement("article");
      storyItem.classList.add("story-item");
      storyItem.setAttribute("role", "listitem");
      storyItem.setAttribute("tabindex", "0");
      storyItem.setAttribute("aria-label", `Cerita oleh ${story.name}`);
      storyItem.style.animation = `fadeIn 0.3s ease ${index * 0.1}s forwards`;
      storyItem.style.opacity = 0;

      storyItem.innerHTML = `
        <header class="story-header" style="display: flex; align-items: center; gap: 8px;">
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(story.name)}"
               alt="Avatar ${story.name}" width="40" height="40" style="border-radius: 50%;" />
          <span class="username" style="font-weight: bold;">${story.name}</span>
        </header>
        <div class="story-image" style="margin-top: 8px;">
          <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" loading="lazy"
               style="width: 100%; border-radius: 8px;" />
        </div>
        <div class="story-caption" style="margin-top: 10px; word-break: break-word;">
          <p>${story.description}</p>
          <div style="margin-top: 10px;">
            <button class="detail-button" data-id="${story.id}" aria-label="Lihat detail cerita dari ${story.name}">
              Lihat Detail
            </button>
          </div>
        </div>
      `;

      storyList.appendChild(storyItem);

      // Marker
      if (typeof story.lat === "number" && typeof story.lon === "number") {
        const customIcon = L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([story.lat, story.lon], { icon: customIcon }).addTo(this._map);
        marker.bindPopup(`<strong>${story.name}</strong><br/>${story.description}`);
        latLngs.push([story.lat, story.lon]);
        this._markers.push(marker);

        // Interaksi hover
        storyItem.addEventListener("mouseenter", () => {
          marker.openPopup();
        });
        storyItem.addEventListener("mouseleave", () => {
          marker.closePopup();
        });
      }
    });

    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      this._map.fitBounds(bounds);
    }
  },
};

export default StoryView;
