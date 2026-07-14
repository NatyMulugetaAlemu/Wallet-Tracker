import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useTransactions = create((set, get) => ({
  transactions: [],
  summary: {
    balance: 0,
    income: 0,
    expenses: 0,
  },

  isLoading: false,
  isCreating: false,
  isDeleting: false,
  isUpdating: false,


  // Get transactions + summary
  loadData: async () => {
    set({ isLoading: true });

    try {
      const [
        transactionsResponse,
        summaryResponse,
      ] = await Promise.all([
        axiosInstance.get("/transactions"),
        axiosInstance.get("/transactions/summary"),
      ]);


      set({
        transactions: transactionsResponse.data,
        summary: summaryResponse.data,
      });


    } catch (error) {
      console.log(
        "Load transactions error:",
        error.response?.data?.message
      );
    } finally {
      set({
        isLoading: false,
      });
    }
  },


  // Create transaction
  createTransaction: async (transaction) => {
    set({
      isCreating: true,
    });

    try {

      const res = await axiosInstance.post(
        "/transactions",
        transaction
      );


      // reload data
      await get().loadData();


      return {
        success: true,
      };


    } catch (error) {

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to create transaction",
      };

    } finally {

      set({
        isCreating: false,
      });

    }
  },


  // Update transaction
  updateTransaction: async (id, transaction) => {

    set({
      isUpdating: true,
    });


    try {

      await axiosInstance.put(
        `/transactions/${id}`,
        transaction
      );


      await get().loadData();


      return {
        success: true,
      };


    } catch (error) {

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to update transaction",
      };

    } finally {

      set({
        isUpdating: false,
      });

    }
  },


  // Delete transaction
  deleteTransaction: async (id) => {

    set({
      isDeleting: true,
    });


    try {

      const res = await axiosInstance.delete(
        `/transactions/${id}`
      );


      await get().loadData();


      return {
        success: true,
        message: res.data.message,
      };


    } catch (error) {

      return {
        success: false,
        error:
          error.response?.data?.message ||
          "Failed to delete transaction",
      };


    } finally {

      set({
        isDeleting: false,
      });

    }

  },

}));