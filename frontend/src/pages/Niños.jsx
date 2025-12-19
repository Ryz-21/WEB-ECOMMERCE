import React, { useState, useEffect } from "react";
import "../styles/Niños.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import axios from "axios";

function Niños() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  const subCategoryMap = {
    Todos: null,
    Polo: 11,
    Camisa: 17,
    Pantalón: 12,
    Polera: 13,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const subCategoryId = subCategoryMap[selectedCategory];
        const url = subCategoryId
          ? `http://localhost:8080/api/products/ninosx/${subCategoryId}`
          : "http://localhost:8080/api/products/ninosx";

        const response = await axios.get(url, { withCredentials: true });
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos de niños:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const withinPriceRange = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && withinPriceRange;
  });

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedSize("");
  };

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <section className="niños-page">
      {/* Filtros */}
      <div className="filters-box">
        <div className="price-slider-container">
          <label className="price-range-label">Filtrar por precio:</label>
          <div className="slider-values">
            <span>S/. {minPrice}</span>
            <span>S/. {maxPrice}</span>
          </div>
          <div className="slider">
            <input type="range" min="0" max="900" step="10" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
            <input type="range" min="0" max="900" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          </div>
        </div>

        <div className="category-filter">
          <label className="category-label">Filtrar por categoría:</label>
          <div className="category-buttons">
            {["Todos", "Polo", "Camisa", "Pantalón", "Polera"].map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Productos */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              onClick={() => setSelectedProduct(product)}
            />
            <h3>{product.name}</h3>
            <p className="price">S/. {product.price.toFixed(2)}</p>

            <button
              className="like-btn"
              onClick={() => toggleWishlist({ ...product, size: "M" })}
            >
              {isInWishlist(product.id) ? "♡" : "♡"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-image"
            />
            <div className="modal-content">
              <div>
                <h3>{selectedProduct.name}</h3>
                <p className="price">S/. {selectedProduct.price.toFixed(2)}</p>

                <div className="sizes">
                  <label>Tallas:</label>
                  <div className="size-options">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={selectedSize === size ? "active" : ""}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quantity">
                  <label>Cantidad:</label>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantity("dec")}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantity("inc")}>+</button>
                  </div>
                </div>
              </div>

              <button
                className="add-to-cart"
                onClick={() => {
                  addToCart({ ...selectedProduct, size: selectedSize }, quantity);
                  closeModal();
                }}
                disabled={!selectedSize}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Niños;
