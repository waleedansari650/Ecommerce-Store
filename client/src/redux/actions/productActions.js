export {ADD_NEW_PRODUCT, DECREASE_QUANTITY,INCREASE_QUANTITY, PRODUCT_REMOVE_TO_CART, GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT,PRODUCT_LIST_TO_CART} from "../action-types/productActionType";

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
export const removeProductToCart = (data) =>{
    return {
        type: "PRODUCT_REMOVE_TO_CART",
        payload : data
    }
}
export const increaseQuantity = (id) =>{
    console.log("data", id);
    return {
        type: "INCREASE_QUANTITY",
        payload : id
    }
}
export const decreaseQuantity = (id) =>{
    console.log("ID : ", id)
    return {
        type : "DECREASE_QUANTITY",
        payload : id
    }
}