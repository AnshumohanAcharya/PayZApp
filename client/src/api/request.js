import { axiosInstance } from ".";

//Get all requests for a user
export const GetAllRequests = async () => {
  try {
    const {data} = await axiosInstance.get("/api/requests/get-all-requests");
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

//Send request to another user
export const SendRequest = async (request) => {
  try {
    const {data} = await axiosInstance.post("/api/requests/send-request", request);
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

//Update Request Status
export const UpdateRequestStatus = async (request) => {
  try {
    const {data} = await axiosInstance.post("/api/requests/update-request-status", request);
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};