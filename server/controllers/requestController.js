import { Request } from "../models/requestModel";
import { Transaction } from "../models/transactionModel";
import User from "../models/userModel";

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .populate("sender")
      .populate("receiver")
      .sort({ createdAt: -1 });
    res.send({
      data: requests,
      message: "Requests fetched successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error.message,
      message: "Requests not found",
      success: false,
    });
  }
};

const sendRequest = async (req, res) => {
  try {
    const { receiver, amount, description } = req.body;
    const request = new Request({
      sender: req.body.userId,
      receiver,
      amount,
      description,
    });
    await request.save();
    res.send({
      data: request,
      message: "Request sent successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error.message,
      message: "Request not sent",
      success: false,
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    if (req.body.status === "Accepted") {
      //Create a transaction
      const newTransaction = new Transaction({
        sender: req.body.receiver._id,
        receiver: req.body.sender._id,
        amount: req.body.amount,
        reference: req.body.description,
        status: "success",
      });
      await newTransaction.save();

      await User.findByIdAndUpdate(req.body.sender._id, {
        $inc: { balanceAmount: req.body.amount },
      });
      await User.findByIdAndUpdate(req.body.receiver._id, {
        $inc: { balanceAmount: -req.body.amount },
      });
      await Request.findByIdAndUpdate(req.body._id, {
        status: req.body.status,
      });
    } else {
      await Request.findByIdAndUpdate(req.body._id, {
        status: req.body.status,
      });
    }
    res.send({
      data: null,
      message: "Request status updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: "Request status not updated",
      success: false,
    });
  }
};

export { getAllRequests, sendRequest, updateRequestStatus };
