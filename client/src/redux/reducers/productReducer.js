import {
  ADD_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_LIST_TO_CART,
} from "../action-types/productActionType";

const initialState = {
  products: [],
  cartItems: [],
  totalCount: 0, 
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload._id
        ),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case PRODUCT_LIST_TO_CART:
        const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
        let updatedCartItems;
        if (existingProductIndex !== -1) {
          // If product already exists in cart, increment the quantity
          updatedCartItems = state.cartItems.map((item, index) => {
            if (index === existingProductIndex) {
              return { ...item, quantity: item.quantity + 1 }; // Increment quantity
            }
            return item;
          });
        } else {
          // If product doesn't exist in cart, add it with quantity of 1
          updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
        }
        const totalCount = updatedCartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total count
        return { ...state, cartItems: updatedCartItems, totalCount };

    

    default:
      return state;
  }
};
