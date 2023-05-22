import React from "react";

const CandyContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: () => {},
});

export default CandyContext;
