// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Mujer from "./components/pages/Mujer";
import Hombre from "./components/pages/Hombre";
import Niños from "./components/pages/Niños";
import Accesorios from "./components/pages/Accesorios";
import Checkout from "./components/pages/Checkout";
import AdminPanel from "./components/AdminPanel";
import AdminRoute from "./components/AdminRoute";

import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <Router>
              <div className="App">
                <Header />
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<><Carousel /><Featured /></>} />
                    <Route path="/mujer" element={<Mujer />} />
                    <Route path="/hombre" element={<Hombre />} />
                    <Route path="/niños" element={<Niños />} />
                    <Route path="/accesorios" element={<Accesorios />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route
                      path="/admin"
                      element={
                        <AdminRoute>
                          <AdminPanel />
                        </AdminRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;