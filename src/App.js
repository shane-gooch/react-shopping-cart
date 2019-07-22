import React, { useState } from "react";
import data from "./data";
import { Route } from "react-router-dom";
import { useLocalStorage } from "./customHooks/useLocalStorage";

///Context
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("cart", []);

  console.log(cart);

  const addItem = item => {
    setCart([...cart, item]);
    // setCartLocal([...cart, item]);
  };
  const deleteItem = itemId => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, deleteItem }}>
        <Navigation cart={cart} />
        <Route path="/cart" component={ShoppingCart} />
      </CartContext.Provider>

      <ProductContext.Provider value={{ products, addItem }}>
        <Route exact path="/" component={Products} />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
