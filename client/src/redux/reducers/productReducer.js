import { ADD_NEW_PRODUCT } from "../action-types/productActionType";

const initialState = {
    products : []
}


export const productReducer = (state = initialState,  action)=>{
    switch(action.type){
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        default:
            return state;
    }
}


