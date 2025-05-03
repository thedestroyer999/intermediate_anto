const BASE_URL = "https://story-api.dicoding.dev/v1";

const AuthApi = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data.loginResult;
  },

  async register(name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data;
  },

  async getStories(token) {
    const response = await fetch(`${BASE_URL}/stories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data.listStory;
  },

  async getDetailStory(token, id) {
    const response = await fetch(`${BASE_URL}/stories/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data.story;
  },

  async subscribeNotification(token, endpoint, p256dh, auth) {
    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endpoint,
        keys: { p256dh, auth },
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data.data;
  },

  async unsubscribeNotification(token, endpoint) {
    const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data;
  },

  async addNewStory(token, { description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat !== undefined) formData.append("lat", lat);
    if (lon !== undefined) formData.append("lon", lon);

    const response = await fetch(`${BASE_URL}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data;
  },

  async addNewStoryGuest({ description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    if (lat !== undefined) formData.append("lat", lat);
    if (lon !== undefined) formData.append("lon", lon);

    const response = await fetch(`${BASE_URL}/stories/guest`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.message);
    return data;
  },
};

export default AuthApi;
