import {
  ADD_NEW_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_LIST_TO_CART,
  PRODUCT_REMOVE_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  LOGIN_SESSION,
  LOGOUT_USER,
  GET_USER_DATA,
  REMOVE_CART_ITEMS,
  GET_ADDRESS,
  GET_ORDERS,
  GET_SPECIFIC_ORDER,
  
} from "../action-types/productActionType";

const initialState = {
  session : localStorage.getItem("token")? true : false,
  user : {},
  specificOrder : {},
  orders : [],
  address : {},
  products: [],
  cartItems: [],
  totalCount: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).reduce(
        (total, item) => total + item.quantity,
        0
      )
    : 0,
  totalPrice: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
    : 0,
};
const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
if (savedCartItems) {
  initialState.cartItems = savedCartItems;
}
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SESSION :
      return {
        ...state,
        session : action.payload
      }
      case GET_USER_DATA: 
      return {
        ...state,
        user : action.payload
      }
      case LOGOUT_USER : {
        localStorage.removeItem('token');
        return{
          ...state,
          session : action.payload
        }
      }
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
      const productId = action.payload;
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.product._id === productId
      );
      let updatedCartItems;
      if (existingCartItemIndex !== -1) {
        // If product already exists in cart, increment the quantity
        updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingCartItemIndex) {
            return { ...item, quantity: item.quantity + 1 }; // Increment quantity
          }
          return item;
        });
      } else {
        // If product doesn't exist in cart, add it with quantity of 1
        const productToAdd = state.products.find(
          (product) => product._id === productId
        );
        if (!productToAdd) {
          throw new Error("Product not found");
        }
        updatedCartItems = [
          ...state.cartItems,
          { product: productToAdd, quantity: 1 },
        ];
      }
      // Save updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      const totalCount = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Calculate total count
      const totalPrice = updatedCartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ); // Calculate total price
      return { ...state, cartItems: updatedCartItems, totalCount, totalPrice };


      case REMOVE_CART_ITEMS: 
      return {...state,
       cartItems : [],
       totalCount : 0,
       totalPrice : 0,
      };
    case PRODUCT_REMOVE_TO_CART:
      const productIdToRemove = action.payload;
      const existingCartItemIndexToRemove = state.cartItems.findIndex(
        (item) => item.product._id === productIdToRemove
      );

      if (existingCartItemIndexToRemove !== -1) {
        // If the product is found in the cartItems array
        const updatedCartItems = [...state.cartItems];
        updatedCartItems.splice(existingCartItemIndexToRemove, 1); // Remove the item at the specific index

        // Save updated cart items to local storage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        const totalCountAfterRemoveToCart = updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ); // Calculate total count

        const totalPriceAfterRemoveToCart = updatedCartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ); // Calculate total price

        return {
          ...state,
          cartItems: updatedCartItems,
          totalCount: totalCountAfterRemoveToCart,
          totalPrice: totalPriceAfterRemoveToCart,
        };
      } else {
        return state;
      }
    case INCREASE_QUANTITY:
      const productIdToIncrease = action.payload;
      const existingCartItemIndexToIncrease = state.cartItems.findIndex(
        (item) => item.product._id === productIdToIncrease
      );
      if (existingCartItemIndexToIncrease !== -1) {
        // If the product is found in the cartItems array
        // targeted index item quantity increase
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndexToIncrease] = {
          ...updatedCartItems[existingCartItemIndexToIncrease],
          quantity:
            updatedCartItems[existingCartItemIndexToIncrease].quantity + 1,
        };
        const totalCountAfterIncrease = updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ); // Calculate total count

        const totalPriceAfterIncrease = updatedCartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ); // Calculate total price
        // Save updated cart items to local storage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

        return {
          ...state,
          cartItems: updatedCartItems,
          totalCount: totalCountAfterIncrease,
          totalPrice: totalPriceAfterIncrease,
        };
      } else {
        return state;
      }
      case GET_ADDRESS : 
      return {
        ...state,
        address : action.payload
      }


      case DECREASE_QUANTITY:
        const productIdToDecrease = action.payload;
        const existingCartItemIndexToDecrease = state.cartItems.findIndex(
          (item) => item.product._id === productIdToDecrease
        );
      
        if (existingCartItemIndexToDecrease !== -1) {
          const decreaseCartItems = [...state.cartItems];
          // Decrease the quantity without mutating the existing state
          decreaseCartItems[existingCartItemIndexToDecrease] = {
            ...decreaseCartItems[existingCartItemIndexToDecrease],
            quantity: decreaseCartItems[existingCartItemIndexToDecrease].quantity - 1,
          };
      
          // Check if the quantity is zero, then remove the item from the cart
          if (decreaseCartItems[existingCartItemIndexToDecrease].quantity === 0) {
            decreaseCartItems.splice(existingCartItemIndexToDecrease, 1);
          }
      
          const totalCountAfterDecrease = decreaseCartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          const totalPriceAfterDecrease = decreaseCartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
          localStorage.setItem("cartItems", JSON.stringify(decreaseCartItems));
          return {
            ...state,
            cartItems: decreaseCartItems,
            totalCount: totalCountAfterDecrease,
            totalPrice: totalPriceAfterDecrease,
          };
        }
        return state;
      case GET_ORDERS :
        return {
          ...state,
          orders : action.payload
        }
        case GET_SPECIFIC_ORDER : {
          return {
            ...state,
            specificOrder : action.payload
          }
        }
    default:
      return state;
  }
};
