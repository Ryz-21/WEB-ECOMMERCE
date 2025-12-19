// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/common/Header";
import Carousel from "./components/common/Carousel";
import Featured from "./components/common/Featured";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Mujer from "./pages/Mujer";
import Hombre from "./pages/Hombre";
import Niños from "./pages/Niños";
import Accesorios from "./pages/Accesorios";
import Checkout from "./pages/Checkout";
import AdminPanel from "./components/admin/AdminPanel";
import AdminRoute from "./components/admin/AdminRoute";

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