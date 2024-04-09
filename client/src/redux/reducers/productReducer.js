import { ADD_NEW_PRODUCT, GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from "../action-types/productActionType";

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
            case GET_ALL_PRODUCTS : 
           
            return {
                ...state,
                products : action.payload
            }
            case DELETE_PRODUCT : 
            return {
                ...state,
                products : state.products.filter(product => product._id !== action.payload._id)
            }
            case UPDATE_PRODUCT : 
            return {
                ...state,
                products : state.products.map(product => product._id === action.payload._id ? action.payload : product)
            }
        default:
            return state;
    }
}


