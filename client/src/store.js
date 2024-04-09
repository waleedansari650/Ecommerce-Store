import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from "./redux/reducers/productReducer";

const store = configureStore({
  reducer: {
    getproductsdata: productReducer
  }
});

export default store;