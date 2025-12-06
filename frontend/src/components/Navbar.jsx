// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/mujer">Mujer</Link>
      <Link to="/hombre">Hombre</Link>
      <Link to="/niños">Niños</Link>
      <Link to="/accesorios">Accesorios</Link>
    </nav>
  );
}

export default Navbar;
