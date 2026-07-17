import { useRouter } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import SignOutButton from "../../components/SignOutButton";
import { useTransactions } from "../../store/useTransactions";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import { useAuthStore } from "../../store/authStore";
import CustomAlert from "../../components/CustomAlert";

export default function Page() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions();
  const { user } = useAuthStore();

  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });


  useEffect(() => {

    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };



  const handleDelete = (id) => {
    setAlert({
      visible: true,
      type: "warning",
      title: "Delete Transaction",
      message: "Are you sure you want to delete this transaction?",
      onConfirm: async () => {
        const result = await deleteTransaction(id);

        setAlert({
          visible: false,
        });

        if (result.success) {
          setAlert({
            visible: true,
            type: "success",
            title: "Success",
            message: "Transaction deleted successfully.",
            onConfirm: () => {
              setAlert({ visible: false });
            },
          });
        } else {
          setAlert({
            visible: true,
            type: "error",
            title: "Error",
            message:
              result.error || "Failed to delete transaction.",
            onConfirm: () => {
              setAlert({ visible: false });
            },
          });
        }
      },
    });
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.username}
              </Text>
            </View>
          </View>
          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.Button} onPress={() => router.push("create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.ButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>

        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <CustomAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        confirmText={
          alert.type === "warning"
            ? "Delete"
            : "OK"
        }
        cancelText={
          alert.type === "warning"
            ? "Cancel"
            : null
        }
        onConfirm={alert.onConfirm}
        onCancel={() =>
          setAlert({ visible: false })
        }
      />
    </View>
  );
}