export {ADD_NEW_PRODUCT, GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT,PRODUCT_LIST_TO_CART} from "../action-types/productActionType";

export const addingProduct = (data) =>{
    return {
        type: "ADD_NEW_PRODUCT",
        payload: data.data
    }
}
export const getAllProducts = (data) =>{
    return {
        type: "GET_ALL_PRODUCTS",
        payload: data.data
    }
}
export const deleteTheProduct = (data) =>{
    return{
        type: "DELETE_PRODUCT",
        payload: data.data
    }
}
export const updateTheProduct = (data) =>{
    return {
        type: "UPDATE_PRODUCT",
        payload: data.data
    }
}
export const addProductToCart = (data) =>{
    console.log("action : ", data);
    return {
        type: "PRODUCT_LIST_TO_CART",
        payload : data
    }
}

