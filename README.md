# 🛍️ Rass - E-Commerce Web App

**Rass** es una aplicación web de e-commerce inspirada en **Zara**, desarrollada con **Spring Boot (backend)** y **React (frontend, Create React App)**.  
El sistema permite a los usuarios explorar productos, agregarlos al carrito, guardar en wishlist y gestionar compras.  

> ⚠️ Actualmente en desarrollo: falta la integración con pasarelas de pago reales (APIs de tarjetas) y el envío automático de correos de confirmación.

---

## ✨ Características principales

- 👕 **Catálogo de productos** con diseño estilo Zara.  
- 🛒 **Carrito de compras** persistente.  
- ❤️ **Wishlist** para guardar productos favoritos.  
- 👤 **Gestión de usuarios** (registro / login).  
- 📦 **Módulo de ventas** para administrar pedidos.  
- 🔒 **Backend seguro** con Spring Boot.  
- 📊 **Arquitectura modular**: frontend + backend separados.  

---

## 🛠️ Tecnologías usadas

### Frontend
- React (Create React App, antes de Vite)
- React Router
- Context API / Hooks
- Axios (consumo de API)

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security (en proceso)
- MySQL

---

## 📂 Estructura del proyecto

PROYECTO/
│── backend/ # API REST con Spring Boot
│── frontend/ # Aplicación React (CRA)
│── node_modules/ # Dependencias de React
│── package.json # Configuración del frontend
│── backend.zip # Versión comprimida del backend


---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone https://github.com/Ryz-21/PROYECTO.git
cd PROYECTO

### 2. Levantar el backend (Spring Boot)
   
cd backend
mvn spring-boot:run

### Levantar el frontend (React - Create React App)

cd frontend
npm install
npm start

La app correrá en: http://localhost:3000

🔮 Próximas mejoras

 Integrar API de pagos (ej. Stripe, PayPal, MercadoPago).

 Implementar envío automático de correos (confirmación de compra).

 Mejorar seguridad con JWT en backend.

 Optimizar el diseño responsive y la experiencia de usuario.

📸 Preview (opcional)

(Aquí puedes añadir capturas de pantalla de la app si las tienes.)

📧 Autor

Leo Suasnabar – Technical Programming Student
📩 Ryz21.lv04@gmail.com

🌍 Perú


