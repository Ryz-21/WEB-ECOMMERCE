import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Checkout.css";

function Checkout() {
  const { user } = useAuth();

  // Datos del usuario/invitado
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Datos de pago
  const [cardType, setCardType] = useState("credito");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = 149.99; // Puedes conectar esto con tu contexto de carrito

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user && !phone.trim()) {
      alert("Debe ingresar un número de teléfono.");
      return;
    }

    alert("Procesando pago...");
    // Aquí puedes enviar los datos al backend
  };

  return (
    <div className="checkout-container">
      <h1>Pago</h1>

      <form onSubmit={handleSubmit}>
        {!user && (
          <>
            <label>
              Teléfono:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </>
        )}

        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Apellido:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>

        <label>
          Dirección de envío:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <hr />

        <h3>Método de pago</h3>

        <label>
          Tipo de tarjeta:
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            required
          >
            <option value="credito">Crédito</option>
            <option value="debito">Débito</option>
          </select>
        </label>

        <label>
          Número de tarjeta:
          <input
            type="text"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </label>

        <label>
          Vencimiento:
          <input
            type="text"
            placeholder="MM/AA"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </label>

        <label>
          CVV:
          <input
            type="text"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </label>

        <hr />

        <div className="total">
          Total a pagar: <strong>${total.toFixed(2)}</strong>
        </div>

        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default Checkout;
