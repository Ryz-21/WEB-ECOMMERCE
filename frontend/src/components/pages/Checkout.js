import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [name, setName] = useState(user ? user.fullName.split(" ")[0] : "");
  const [lastname, setLastname] = useState(user ? user.fullName.split(" ")[1] || "" : "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [cardType, setCardType] = useState("credito");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      alert("Debe ingresar un número de teléfono.");
      return;
    }

    const payload = {
      user: user?.username || null,
      name: user ? user.fullName.split(" ")[0] : name,
      lastname: user ? user.fullName.split(" ")[1] || "" : lastname,
      address,
      phone,
      total,
      payment: {
        type: cardType,
        cardNumber,
        expiry,
        cvv,
      },
      products: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Pago procesado correctamente");
        clearCart();
      } else {
        const errorData = await response.text();
        alert("Error al procesar el pago: " + errorData);
      }
    } catch (err) {
      console.error(err);
      //alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Pago</h1>
      <form onSubmit={handleSubmit}>
        {/* Mostrar datos personales solo si no hay usuario */}
        {!user && (
          <>
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
          </>
        )}

        <label>
          Teléfono:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <select value={cardType} onChange={(e) => setCardType(e.target.value)} required>
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
          Total a pagar: <strong>S/. {total.toFixed(2)}</strong>
        </div>

        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default Checkout;
