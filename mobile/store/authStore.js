import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  signup: async (userData) => {
    set({ isSigningUp: true });

    try {

      const res = await axiosInstance.post("/auth/signup", userData);

      const { user, token } = res.data;

      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      set({ user, token });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (userData) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", userData);

      const { user, token } = res.data;

      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      set({ user, token });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");

      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
      return {
        success: true,
      };

    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },
}));