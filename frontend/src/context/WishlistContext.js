import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Añadir un producto con cantidad (sin duplicados)
  const addToWishlist = (product, quantity = 1) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // ✅ Alternar entre agregar y quitar
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Verificar si un producto ya está en la lista
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  // ✅ Eliminar un producto de la lista
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Obtener un producto por ID
  const getWishlistItem = (id) => {
    return wishlist.find((item) => item.id === id);
  };

  // ✅ Contador total de productos
  const totalWishlistItems = wishlist.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        getWishlistItem,
        totalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
