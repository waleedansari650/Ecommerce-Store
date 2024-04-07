export {ADD_NEW_PRODUCT} from "../action-types/productActionType";

export const addingProduct = (data) =>{
    console.log("Actions Data : ", data);
    return {
        type: "ADD_NEW_PRODUCT",
        payload: data
    }
}



