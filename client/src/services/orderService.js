import axios from "axios";
import { deleteOrder, deliverOrder, getSpecificOrderDetail, getYourAddress, getYourOrders } from "../redux/actions/productActions";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/order/",
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addAddress = async (credentials) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const { data } = await axiosInstance.post(
      "/addAddress",
      credentials,
      config
    );
    return Promise.resolve( data );
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get("/getAddress", config);
      if (data.success) {
        dispatch(getYourAddress(data.data));
      }
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get("/getOrders", config);
      if(data.success){
        dispatch(getYourOrders(data.data));
      }
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
}

export const getSpecificOrder = ({id})=>{
  return async(dispatch)=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get(`/getSpecificOrder/${id}`, config);
      if(data.success){
        dispatch(getSpecificOrderDetail(data.data));
      }
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
}
export const deleteSpecificProduct = (id) =>{
  return async(dispatch)=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.delete(`/deleteSpecificProduct/${id}`, config);
      if(data.success){
        dispatch(deleteOrder(id));
      }
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error.response.data);
    }

  }
}

export const deliverProduct = (credentials) =>{
  console.log("Services credentials : ", credentials);
  return async(dispatch)=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.put(`/deliverProduct`, credentials,config);
      console.log("Services data : ", data.data);
      if(data.success){
        dispatch(deliverOrder(data.data));
      }
      return Promise.resolve(data);  
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
}