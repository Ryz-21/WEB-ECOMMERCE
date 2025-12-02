  // context/CartContext.js
  import React, { createContext, useContext, useState } from "react";

  const CartContext = createContext();

  export const useCart = () => useContext(CartContext);

  export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    };

    const removeFromCart = (productId) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };

