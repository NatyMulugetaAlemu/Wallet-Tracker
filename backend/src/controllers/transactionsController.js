import Transaction from "../models/transaction.model.js";

export async function createTransaction(req, res) {
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

export async function getAllTransactions(req, res) {
  try {

    console.log("Logged in user:", req.user._id);
    console.log("Email:", req.user.email);


    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });


    console.log("Transactions found:", transactions.length);


    res.status(200).json(transactions);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

export async function updateTransaction(req, res) {
  try {
    const { title, amount, category } = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        title,
        amount,
        category
      },
      {
        new: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({message:"Transaction updated successfully",updatedTransaction});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export async function deleteTransaction(req, res) {
  try {
    const deleteTransaction = await Transaction.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleteTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }
    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export async function getUserSummary(req, res) {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    const balance = transactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      balance,
      income,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



















