import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch all transactions
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch transactions");
      }

      setTransactions(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  }, []);

  // Fetch summary
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch summary");
      }

      setSummary(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  }, []);

  // Load both together
  const loadData = useCallback(async () => {
    setIsLoading(true);

    try {
      await Promise.all([
        fetchTransactions(),
        fetchSummary(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary]);

  // Create transaction
  const createTransaction = async (transaction) => {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      await loadData();

      Alert.alert("Success", "Transaction created successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  // Update transaction
  const updateTransaction = async (id, transaction) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      await loadData();

      Alert.alert("Success", "Transaction updated successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      await loadData();

      Alert.alert("Success", data.message);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};