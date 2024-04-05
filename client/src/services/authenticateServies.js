import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
export const userRegister = async (credentials) => {
  const config = {
    headers: {
      "Accept ": "application/json",
      "Content-Type": "multipart/form-data",
      withCredentials: "true",
    },
  };

  try {
    const { data } = await axiosInstance.post("/register", credentials, config);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
export const loginUser = async (credentials) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axiosInstance.post("/login", credentials, config);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Credentials not correct...!" });
  }
};
// recover the account by sending the user email
export const recoverAccount = async (credentials) => {
  try {
    const { data } = await axiosInstance.post("/generateOTP", credentials);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Credentials not correct...!" });
  }
};
export const verifyOTP = async (code) => {
  try {
    const { data } = await axiosInstance.post("/verifyOTP", code);
    return Promise.resolve({data});
  } catch (error) {
    return Promise.reject({ error: "OTP not correct...!" });
  }
};
export const resetPassword = async (credentials) =>{
  try {
    const {data} = await axiosInstance.put("/resetPassword", credentials);
    return Promise.resolve({data});
  } catch (error) {
    return Promise.reject({error : "Internal server error...!"}); 
  }
}

