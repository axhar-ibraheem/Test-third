import "./App.css";
import CandyContext from "./Store/candyContext";
import CandyContextProvider from "./Store/candyContextProvider";
import CandyForm from "./components/CandyForm";
import CandyItems from "./components/CandyItems";
import Cart from "./components/Cart";
import React, { useState, useEffect, useContext } from "react";
function App() {
  const [candyItems, setCandyItems] = useState([]);
  const onAddItemHandler = (item) => {
    setCandyItems([item, ...candyItems]);
  };
  const ctx = useContext(CandyContext);
  console.log(ctx.items);

  return (
    <CandyContextProvider>
      <CandyForm onAddCandy={onAddItemHandler}></CandyForm>
      <CandyItems candies={candyItems}></CandyItems>
      {<Cart></Cart>}
    </CandyContextProvider>
  );
}

export default App;
