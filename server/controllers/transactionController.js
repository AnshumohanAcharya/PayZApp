import { Transaction } from "../models/transactionModel";
import User from "../models/userModel";
import { uuid } from "uuidv4";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transferFund = async (req, res) => {
  try {
    //Save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    //Update the balance of the sender
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balanceAmount: -req.body.amount },
    });

    //Update the balance of the receiver
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balanceAmount: req.body.amount },
    });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account number verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account number not found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account number not found",
      data: error.message,
      success: false,
    });
  }
};

const getAllTransations = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .sort({ createdAt: -1 })
      .populate("sender")
      .populate("receiver");
    res.send({
      message: "Transactions fetched",
      data: transactions,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transactions not found",
      data: error.message,
      success: false,
    });
  }
};

const depositFunds = async (req, res) => {
  try {
    const { token, amount } = req.body;
    //Create customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    //Create charge
    const charge = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Deposit of ${amount} INR to PayZApp`,
      },
      {
        idempotencyKey: uuid(),
      }
    );
    //Save the transaction
    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "Stripe deposit",
        status: "success",
      });
      await newTransaction.save();

      //Update the balance of the user
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balanceAmount: amount },
      });
      res.send({
        message: "Funds deposited successfully",
        data: newTransaction,
        success: true,
      });
    } else {
      res.send({
        message: "Transaction Failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: "Transaction Failed",
      data: error.message,
      success: false,
    });
  }
};

export { transferFund, verifyAccount, getAllTransations, depositFunds };
