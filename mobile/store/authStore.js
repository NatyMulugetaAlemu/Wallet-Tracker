import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
  newUser: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Response data:", data);

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("newUser", JSON.stringify(data.newUser));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, newUser: data.newUser, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("newUser", JSON.stringify(data.newUser));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, newUser: data.newUser, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const newUserJson = await AsyncStorage.getItem("newUser");
      const newUser = newUserJson ? JSON.parse(newUserJson) : null;

      set({ token, newUser });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("newUser");
    set({ token: null, newUser: null });
  },
}));