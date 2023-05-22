import CandyContext from "./candyContext";
import React, { useReducer, useEffect } from "react";

const initialState = {
  items: [],
  totalPrice: 0,
  addItem: () => {},
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedPrice =
      state.totalPrice +
      (action.item.Msize + action.item.Lsize + action.item.Ssize) *
        action.item.price;

    let isPresent = false;
    let updatedItems;

    const changedItems = state.items.map((item) => {
      if (item.id === action.item.id) {
        isPresent = true;
        if (action.item.size === "large") {
          return {
            ...item,
            Lsize: item.Lsize + action.item.Lsize,
          };
        } else if (action.item.size === "medium") {
          return {
            ...item,
            Msize: item.Msize + action.item.Msize,
          };
        } else {
          return {
            ...item,
            Ssize: item.Ssize + action.item.Ssize,
          };
        }
      }
      return item;
    });

    if (isPresent) {
      updatedItems = [...changedItems];
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalPrice: updatedPrice,
    };
  }
};

const CandyContextProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    console.log(item);
    dispatch({ type: "ADD", item: item });
  };
  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
  };

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(
        "https://crudcrud.com/api/a3c73fd05f4940fa8fcc2c61a4e731cb/cart"
      );
      const data = await response.json();

      if (response.ok) {
        data.map((item) => cartState.items.push({ ...item }));
      }
    }
    fetchItems();
  }, []);

  return (
    <CandyContext.Provider value={cartContext}>
      {props.children}
    </CandyContext.Provider>
  );
};

export default CandyContextProvider;
