import { actionTypes } from "./actionType";

export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    // Add item to basket
    case actionTypes.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        basket: [...state.basket, { ...action.item, amount: 1 }],
      };

    // Remove item from basket
    case actionTypes.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    // Increase quantity of an item
    case actionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    // Decrease quantity of an item
    case actionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0), // remove if amount <= 0
      };

    // Empty basket
    case actionTypes.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    // Set user after login
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
