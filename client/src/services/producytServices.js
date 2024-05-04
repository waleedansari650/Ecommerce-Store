import axios from "axios";
import { addingProduct, cartItemsRemove, deleteTheProduct, getAllProducts, updateTheProduct } from "../redux/actions/productActions";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/products",
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addProduct = (credentials) => {
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
    if(data.success){
      dispatch(addingProduct(data));
    }
    return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
};
// productServices.js

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get("/getProducts", config);
      if (data.success) {
        dispatch(getAllProducts(data));
      } 
      return Promise.resolve(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      return Promise.reject(error.response.data);
    }
  };
};
export const deleteProduct = (id) =>{
 return async (dispatch) =>{
    try {
      const config = {
        headers : {
          Accept : "application/json",
          authorization : `Bearer ${localStorage.getItem("token")}`
        
        }
      }
      const {data} = await axiosInstance.delete(`/deleteProduct/${id}`, config);
      if (data.success) {
        dispatch(deleteTheProduct(data));
        return Promise.resolve(data);
      } else {
        return Promise.reject(data.error);
      }
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
}
// getAllProducts
export const updateExistingProduct = (credentials) => {
  return async(dispatch)=>{
    try {
      const config = {
        headers : {
          "Content-Type": "multipart/form-data",
          authorization : `Bearer ${localStorage.getItem("token")}`
        
        }
      }
      
      const {data} = await axiosInstance.put(`/updateProduct/${credentials.id}`, credentials,config);
      if (data.success) {
        dispatch(updateTheProduct(data));
        return Promise.resolve(data);
      } else {
        return Promise.reject(data.error);
      }
    } catch (error) {
      return Promise.reject(error.response.data);
      
    }

  }
};
// api hitting services code (productServices.js)

export const getToken = async (setClientToken) => {
  try {
    const response = await axiosInstance.get("/braintree/token");
    if (response.status === 200) {
      setClientToken(response.data.clientToken);
    } else {
      console.error("Failed to get client token:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching client token:", error.message);
  }
};
export const payment =  (nonce, cartItems, totalProductPrice, address) => {
  return async (dispatch)=>{
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    const formattedCartItems = cartItems.map(item => ({
      productId: item.product._id, 
      quantity: item.quantity
    }));
    const { data } = await axiosInstance.post(
      '/braintree/payment',
      {
        nonce,
        cartItems: formattedCartItems,
        address,
        totalProductPrice
      },
      config
    );
      if(data.success){
        dispatch(cartItemsRemove());
      }
      localStorage.removeItem("cartItems");
      localStorage.removeItem("__paypal_storage__");
      return Promise.resolve(data);
  } catch (error) {
    console.error("Payment error:", error);
    return Promise.reject(error.response.data);
  }
}
};