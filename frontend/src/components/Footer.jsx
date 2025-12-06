// src/components/Footer.js
import React, { useState } from "react";
import "../styles/Footer.css";

function Footer() {
  const [activePanel, setActivePanel] = useState(null);

  const closeModal = () => setActivePanel(null);

  return (
    <footer className="footer">
      <p>&copy; 2025 RASS</p>

      <div className="newsletter">
        <label>ÚNETE A NUESTRA NEWSLETTER</label>
      </div>

      <div className="socials">
        <p>Síguenos en: TikTok · Instagram · Facebook · Pinterest · YouTube · Spotify</p>
      </div>

      <div className="footer-links">
        <button onClick={() => setActivePanel("cookies")}>Configuración de cookies</button>
        <button onClick={() => setActivePanel("privacy")}>Política de privacidad y cookies</button>
        <button onClick={() => setActivePanel("terms")}>Condiciones de compra</button>
        <button onClick={() => setActivePanel("claims")}>Libro de reclamaciones</button>
      </div>

      <div className="address">
        <p>Calle Las Amapolas 122, San Isidro</p>
      </div>

      {/* Modal dinámico */}
      {activePanel && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <h2>
              {activePanel === "cookies" && "Configuración de Cookies"}
              {activePanel === "privacy" && "Política de Privacidad y Cookies"}
              {activePanel === "terms" && "Condiciones de Compra"}
              {activePanel === "claims" && "Libro de Reclamaciones"}
            </h2>
            <p>
              {/* Contenido simulado */}
              Esta es una sección informativa ficticia para mostrar detalles sobre "{activePanel}".
              Puedes agregar más contenido aquí para mejorar la experiencia del usuario.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
