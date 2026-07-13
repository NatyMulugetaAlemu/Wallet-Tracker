import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import LogoutButton from '../../components/LogoutButton'
import { useTransactions } from '../../store/useTransactions';

const index = () => {

  const {transactions, summary, isLoading, loadData,deleteTransaction} = useTransactions();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View>
      <Text>index</Text>

       <LogoutButton />

       <Text>{summary.balance}</Text>
       <Text>{summary.income}</Text>
       <Text>{summary.expenses}</Text>
    </View>
  )
}




export default index