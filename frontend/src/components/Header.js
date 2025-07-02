import React, { useState } from "react";
import "./Header.css";
import cartIcon from "../image/icons/OIP.png";
import searchIcon from "../image/icons/search.png";
import userIcon from "../image/icons/User.png";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext"; // 👈 AÑADIDO
import { useNavigate } from "react-router-dom"; // 👈 AÑADIDO
import { useAuth } from "../context/AuthContext"; // 👈 AÑADIDO ultimo 

function Header() {
  const navigate = useNavigate();
  const { wishlist, totalWishlistItems, removeFromWishlist } = useWishlist();
  const { cart, addToCart, removeFromCart } = useCart();
  const { searchTerm, setSearchTerm } = useSearch(); // 👈 AÑADIDO
  const { user, setUser } = useAuth();

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [showForm, setShowForm] = useState(null)  ;
  const [closingSidebar, setClosingSidebar] = useState(false);
  const [showWishlistPanel, setShowWishlistPanel] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  

  // 📌 Paso 1: Estados para auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  

  // 📌 Paso 2: Funciones de login y registro
  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      const { firstName, lastName, username, role } = result; // ✅ agregar role aquí
      setUser({
        username,
        fullName: `${firstName} ${lastName}`,
        role,
      });

      alert("Inicio de sesión exitoso");
      setShowForm(null);
      setEmail("");
      setPassword("");
    } else {
      alert("Error: " + result);
    }
  } catch (error) {
    alert("Error en el servidor");
    console.error(error);
  }
};

  
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
      
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username: email,
        password,
        firstName,
        lastName
}),      });

      const result = await response.text();
      if (response.ok) {
        alert("Registro exitoso");
        setShowForm(null);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
      } else {
        alert("Error: " + result);
      }
    } catch (error) {
      alert("Error en el servidor");
      console.error(error);
    }
  };

const toggleWishlistPanel = () => {
  setShowWishlistPanel((prev) => {
    const newState = !prev;
    if (newState) {
      setShowCartPanel(false);
      setShowSidebar(false);
    }
    return newState;
  });
};

const toggleCartPanel = () => {
  setShowCartPanel((prev) => {
    const newState = !prev;
    if (newState) {
      setShowWishlistPanel(false);
      setShowSidebar(false);
    }
    return newState;
  });
};

  const handleCloseSidebar = () => {
    setClosingSidebar(true);
    setTimeout(() => {
      setShowSidebar(false);
      setActiveSection(null);
      setClosingSidebar(false);
    }, 300);
  };

  return (
    <header className="header">
      <div className="logo">RASS</div>
      
      {/* 🔍 Búsqueda */}
      <div className="search-container">
        <img src={searchIcon} alt="Buscar" className="search-icon" />
        <input
          type="text"
          className="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

  <div className="user-info">
  <img src={userIcon} alt="Usuario" />
  {user?.fullName || "invitado"}
</div>

      <div className="header-actions">
        {/* ❤️ Lista de deseos */}
        <div className="wishlist-wrapper">
          <button className="wishlist-btn" onClick={toggleWishlistPanel} title="Lista de deseos">
            ♡
            {totalWishlistItems > 0 && (
              <span className="wishlist-count">{totalWishlistItems}</span>
            )}
          </button>

          {showWishlistPanel && (
            <div className="wishlist-panel">
              <h4>Lista de deseos</h4>
              {wishlist.length === 0 ? (
                <p>Tu lista está vacía.</p>
              ) : (
                <ul>
                  {wishlist.map((item) => (
                    <li key={item.id} className="wishlist-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <span>S/. {item.price.toFixed(2)}</span>
                      </div>
                      <button
                        className="remove-btn"
                        title="Eliminar de la lista"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        x
                      </button>
                      <button
                        className="wishlist-cart-btn"
                        onClick={() => addToCart(item)}
                      >
                        Agregar al carrito
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* 🛒 Carrito */}
        <div className="cart-wrapper">
          <button className="cart-btn" title="Carrito de compras" onClick={toggleCartPanel}>
            <img src={cartIcon} alt="Carrito" className="cart-icon" />
            {cart.length > 0 && (
              <span className="wishlist-count">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          {showCartPanel && (
            <div className="cart-panel">
              <h4>Carrito</h4>
              {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                <>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <p>{item.name}</p>
                          <span>Talla: {item.size}</span><br />
                          <span>Cantidad: {item.quantity}</span><br />
                          <span>Total: S/. {(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                        <button
                          className="remove-btn"
                          title="Eliminar del carrito"
                          onClick={() => removeFromCart(item.id)}
                        >
                          x
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="checkout-btn"
                     onClick={() => navigate("/checkout")}                  
                     >
                    Realizar pago
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* ☰ Menú */}
<button
  className="menu-btn"
  onClick={() => {
    setShowWishlistPanel(false);
    setShowCartPanel(false);
    setShowSidebar(true);
  }}
>
  ☰
</button>
      </div>

      {/* Sidebar lateral */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={handleCloseSidebar}>
          <div
            className={`sidebar ${closingSidebar ? "slide-out" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleCloseSidebar}>✕</button>

         <ul>
            <li><button onClick={() => setActiveSection("faq")}>¿Preguntas frecuentes?</button></li>
            <li><button onClick={() => setActiveSection("payment")}>¿Métodos de pago?</button></li>
            <li><button onClick={() => setActiveSection("delivery")}>¿Tiempo de entrega?</button></li>
            {user?.role === "ADMIN" && (
              <li>
      <button onClick={() => navigate("/admin")}>Panel Admin</button>
    </li>
  )}

  <li><button onClick={() => setShowForm("login")}>Iniciar sesión</button></li>
  <li><button onClick={() => setShowForm("register")}>Registrarme</button></li>
</ul>

            {activeSection === "faq" && (
              <div className="sidebar-info">
                <p>Resolvemos las preguntas más comunes sobre compras, devoluciones y más.</p>
              </div>
            )}
            {activeSection === "payment" && (
              <div className="sidebar-info">
                <p>Aceptamos tarjetas de crédito, débito y transferencias bancarias.</p>
              </div>
            )}
            {activeSection === "delivery" && (
              <div className="sidebar-info">
                <p>El tiempo de entrega estimado es de 2 a 5 días hábiles.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Login / Registro */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(null)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{showForm === "login" ? "Iniciar Sesión" : "Registrarse"}</h2>

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {showForm === "register" && (
            <>
             <input
                type="password"
                 placeholder="Confirmar contraseña"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                  />
            <input
            type="text"
            placeholder="Nombre"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
              />
              <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
              
  </>
)}
            <button onClick={showForm === "login" ? handleLogin : handleRegister}>
              {showForm === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
