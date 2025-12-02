import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import "..styles/AdminPanel.css";
import UserManagement from "./UserManagement";
import CategoryManagement from "./CategoryManagement";
import SalesManagement from "./SalesManagement";
import axios from "axios";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeView, setActiveView] = useState("productos");


   // ✅ Nueva función para obtener productos desde el backend
  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/products", { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };
   useEffect(() => {
    fetchProducts(); // cargar productos al montar
  }, []);

   const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
  if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        withCredentials: true,
      });
      // Actualizar lista desde el servidor
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Ocurrió un error al eliminar el producto.");
    }
  }
};


  return (
    <div className="admin-panel-container">
      {/* NAV DE SECCIONES */}
      <div className="admin-nav">
        <button onClick={() => setActiveView("productos")}>Productos</button>
        <button onClick={() => setActiveView("usuarios")}>Usuarios</button>
        <button onClick={() => setActiveView("categorias")}>Categorías</button>
                <button onClick={() => setActiveView("ventas")}>Ventas</button>

      </div>

      {/* SECCIÓN PRODUCTOS */}
      {activeView === "productos" && (
        <>
          <div className="form-container">
            <ProductForm
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              product={editingProduct}
              cancelEdit={() => setEditingProduct(null)}
              fetchProducts={fetchProducts} 
            />
          </div>

          <h3 className="admin-subtitle">Productos creados</h3>
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Precio:</strong> S/. {product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Tallas:</strong> {product.sizes.join(", ")}</p>
                <div className="product-actions">
                  <button onClick={() => setEditingProduct(product)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* SECCIÓN USUARIOS */}
      {activeView === "usuarios" && (
        <div>
          <UserManagement />
        </div>
      )}

      {/* SECCIÓN CATEGORÍAS */}
      {activeView === "categorias" && (
        <div>
          <CategoryManagement />
        </div>
      )}

     {/* SECCIÓN VENTAS */}
{activeView === "ventas" && (
  <div>
    <SalesManagement/>
  </div>
)}
    </div> // 👈 Este cierre faltaba
  );
}

export default AdminPanel;
