import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from "./redux/reducers/productReducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    getproductsdata: productReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
