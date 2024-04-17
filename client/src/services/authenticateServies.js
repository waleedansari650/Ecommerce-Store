import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getUserData, loginSession } from "../redux/actions/productActions";
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
export const loginUser = (credentials) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axiosInstance.post("/login", credentials, config);
      console.log("user Login : ", data);
      console.log("data.success", data.success);
      if (data.success) {
        dispatch(loginSession(data.success));
        return Promise.resolve({ data });
      }
    } catch (error) {
      return Promise.reject({ error: "Credentials not correct...!" });
    }
  };
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
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "OTP not correct...!" });
  }
};
export const resetPassword = async (credentials) => {
  try {
    const { data } = await axiosInstance.put("/resetPassword", credentials);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Internal server error...!" });
  }
};
export const getUser = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      let token = localStorage.getItem("token");
      if (!token) {
        return Promise.reject("Cannot find token...!");
      }
      let decode = jwtDecode(token);
      const { data } = await axiosInstance.get(
        `/getUser/${decode.userId}`,
        config
      );
      if (data.success) {
        dispatch(getUserData(data));
        return Promise.resolve(data);
      } else {
        return Promise.reject(data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return Promise.reject({ error });
    }
  };
};
