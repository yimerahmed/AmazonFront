import React, { createContext, useReducer } from "react";

// Create context
export const DataContext = createContext();

// Initial state
const initialState = {
  basket: [],
  user: null,
};

// Action types
export const actionTypes = {
  ADD_TO_BASKET: "ADD_TO_BASKET",
  REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  SET_USER: "SET_USER", // ✨ added
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    // ✨ Save logged-in user or null on logout
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    // Add product to basket
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
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    // Increase quantity
    case actionTypes.INCREASE_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount + 1 } : item
        ),
      };

    // Decrease quantity
    case actionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        ),
      };

    // Remove from basket
    case actionTypes.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
};

// Provider
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
