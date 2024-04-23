import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/cart/",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const productListToCart = (credentials) => {
    return async (dispatch) =>{
        try {
            const config = {
                headers: {
                  "Content-Type" : "application/json",
                  authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              };
              const { data } = await axiosInstance.post("/addToCart",{credentials} ,config);
              console.log("response : ", data );
            //   dispatch(addProductToCart(data.data));
        } catch (error) {
            
        }
    }
}






