import axios from "axios";
import { addingProduct } from "../redux/actions/productActions";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/products",
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addProduct = async (credentials) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axiosInstance.post(
        "/addProduct",
        credentials,
        config
      );
      dispatch(addingProduct({data}));
    //   return Promise.resolve({ data });
    } catch (error) {
      dispatch(addingProduct({error}));

    //   return Promise.reject(error.response.data);
    }
  };
};
export const updateProduct = (credentials) => {
  console.log("update Product : ", credentials);
};
