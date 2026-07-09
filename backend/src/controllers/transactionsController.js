import Transaction from "../models/transaction.model.js";

export async function createTransaction(req, res){
  try {
    const { title, amount, category } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      category,
      user: req.user._id,
    });

     const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export async function getTransactionsByUserId(req, res) {
  try {
   const transaction = await Transaction.findOne(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found!" });
    res.json(transaction);
  } catch (error) {
     console.log("Error getting the transactions", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update Transaction
export async function  updateTransaction (req, res){
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Transaction
export async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error gettin the summary", error);
    res.status(500).json({ message: "Internal server error" });
  }
}















