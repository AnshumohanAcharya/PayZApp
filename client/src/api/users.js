import { axiosInstance } from ".";

//Login User
export const loginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("api/users/login", payload);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

//Register User
export const registerUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("api/users/register", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get("api/users/get-user-info");
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("api/users/get-all-users");
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const updateUserVerifiedStatus = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "api/users/update-verified-status",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
