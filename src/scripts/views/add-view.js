const AddForm = {
  render() {
    return `
      <section class="add-story">
        <h2 class="add-story-title">Add New Story</h2>
        <form id="add-story-form" enctype="multipart/form-data" class="add-story-form">
          
          <!-- Description -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" required placeholder="Tell your story..." rows="4"></textarea>
          </div>

          <!-- Upload from Gallery -->
          <div class="form-group">
            <label for="upload-file">Upload from Gallery</label>
            <input type="file" id="upload-file" accept="image/*" />
            <img id="image-preview" alt="Image Preview"
                 style="display: none; margin-top: 10px; max-width: 100%; border-radius: 10px;" />
          </div>

          <!-- Capture from Camera -->
          <div class="form-group">
            <label>Capture Image from Camera</label>
            <video id="camera-stream" autoplay playsinline class="responsive-media"></video>
            <button type="button" id="capture-btn" class="capture-button" style="margin-top: 10px;">
              📸 Capture
            </button>
            <canvas id="snapshot" class="responsive-media" style="display: none;"></canvas>
          </div>

          <!-- Map Picker -->
          <div class="form-group">
            <label>Choose Location</label>
            <div id="map-picker" style="height: 300px; border-radius: 10px; overflow: hidden;"></div>
            <p id="location-coordinates"
               style="text-align: center; font-size: 0.9rem; color: #555;"></p>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-button">🚀 Submit Story</button>
        </form>
      </section>
    `;
  },
};

export default AddForm;
