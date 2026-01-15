import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/Checkout.css";

const stripePromise = loadStripe("${STRIPE_SECRET_KEY}"); // Reemplaza con tu clave pública de Stripe

function CheckoutForm() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState(user ? user.fullName.split(" ")[0] : "");
  const [lastname, setLastname] = useState(user ? user.fullName.split(" ")[1] || "" : "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Crear payment intent en el backend
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/payment/create-intent?amount=" + Math.round(total * 100) + "&currency=usd", {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error('Error creando payment intent:', error);
        alert('Error al inicializar el pago. Intenta de nuevo.');
      }
    };
    if (total > 0) createPaymentIntent();
  }, [total]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || processing) return;

  setProcessing(true);

  const cardElement = elements.getElement(CardElement);

  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name + " " + lastname,
          phone: phone,
          address: { line1: address },
        },
      },
    }
  );

  if (error) {
    alert("Error en el pago: " + error.message);
    setProcessing(false);
    return;
  }

  if (paymentIntent.status === "succeeded") {
    try {
      const payload = {
        user: user?.username || null,
        name,
        lastname,
        address,
        phone,
        total,
        payment: { paymentIntentId: paymentIntent.id },
        products: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
      };

      const response = await fetch("http://localhost:8080/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Pago procesado correctamente");
        clearCart();
      } else {
        alert("Error al procesar la venta");
      }
    } catch (err) {
      alert("Error en el servidor");
    }
  }

  setProcessing(false);
};

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos personales */}
      {!user && (
        <>
          <label>Nombre: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label>Apellido: <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required /></label>
        </>
      )}
      <label>Teléfono: <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
      <label>Dirección: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required /></label>

      <hr />
      <h3>Método de pago</h3>
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />

      <hr />
      <div className="total">Total: <strong>${total.toFixed(2)}</strong></div>
      <button type="submit" disabled={!stripe}>Pagar</button>
    </form>
  );
}

function Checkout() {
  return (
    <div className="checkout-container">
      <h1>Pago</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Checkout;
