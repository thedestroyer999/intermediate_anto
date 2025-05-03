// src/models/user-model.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://story-api.dicoding.dev/v1", // Ganti jika baseURL berbeda
  headers: {
    "Content-Type": "application/json",
  },
});

const UserModel = {
  async login(email, password) {
    try {
      const response = await api.post("/login", { email, password });
      const { data } = response;

      if (!data.error && data.loginResult) {
        return {
          success: true,
          data: data.loginResult,
        };
      }

      return {
        success: false,
        message: data.message || "Login failed",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Unexpected error during login",
      };
    }
  },

  async register(name, email, password) {
    try {
      const response = await api.post("/register", { name, email, password });
      const { data } = response;

      if (!data.error) {
        return {
          success: true,
          message: data.message,
        };
      }

      return {
        success: false,
        message: data.message || "Registration failed",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Unexpected error during registration",
      };
    }
  },

  async checkAuth(token) {
    try {
      const response = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      console.error("Auth check error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Invalid token",
      };
    }
  },
};

export default UserModel;
