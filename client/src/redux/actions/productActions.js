export {ADD_NEW_PRODUCT, GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT} from "../action-types/productActionType";

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


