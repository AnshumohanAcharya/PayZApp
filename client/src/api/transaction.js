import { axiosInstance } from ".";

//Verify Receiver Account
export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Transfer Funds
export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-fund",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Get All Transactions of a User
export const GetAllTransactions = async () => {
  try {
    const {data} = await axiosInstance.get(
      "/api/transactions/get-all-transactions"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//Deposit Funds using stripe
export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/deposit-fund",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
