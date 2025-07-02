import React, { useState } from "react";
import ProductForm from "./ProductForm";
import "./AdminPanel.css"; // Este CSS debe incluir sólo ajustes específicos

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="admin-panel-container">

      <div className="form-container">
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          product={editingProduct}
          cancelEdit={() => setEditingProduct(null)}
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
    </div>
  );
}

export default AdminPanel;  