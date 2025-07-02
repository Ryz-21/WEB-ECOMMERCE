import React, {useState} from "react";
import "./Niños.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";


const products = [
  {id:19, name:"Camisa N1B", image:require("../../image/Ropa/Niños/camisa1.jpg"), price: 119.90, category: "Camisa"},
  {id:20, name:"Polo V1S", image:require("../../image/Ropa/Niños/camisa2.webp"), price: 129.90, category: "Polo"},
  {id:21, name:"Polo V2S", image:require("../../image/Ropa/Niños/camisa3.webp"), price: 139.90, category: "Polo"},
  {id:22, name:"Pantalon RS2", image:require("../../image/Ropa/Niños/pantalon1.jpg"), price: 149.90, category: "Pantalón"},
  {id:23, name:"Pantalon NRB", image:require("../../image/Ropa/Niños/pantalon2.webp"), price: 89.90, category: "Pantalón"},
  {id:24, name:"Pantalon W2E", image:require("../../image/Ropa/Niños/pantalon3.webp"), price: 89.90, category: "Pantalón"},
  {id:25, name:"Polera R1", image:require("../../image/Ropa/Niños/polera1.webp"), price: 99.90, category: "Polera"},
  {id:26, name:"Polera BBG", image:require("../../image/Ropa/Niños/polera2.jpg"), price: 69.90, category: "Polera"},
  {id:27, name:"Polera MM2", image:require("../../image/Ropa/Niños/polera3.jpg"), price: 74.90, category: "Polera"},
];

function Niños() {
 const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const withinPriceRange = product.price >= minPrice && product.price <= maxPrice;
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && withinPriceRange && matchesCategory;
  });

   const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedSize("");
  };

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((q) => q + 1);
    else if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  }; //isInWishlist

  return (
    <section className="niños-page">
     <div className="filters-box">
  <div className="price-slider-container">
    <label className="price-range-label">Filtrar por precio:</label>
    <div className="slider-values">
      <span>S/. {minPrice}</span>
      <span>S/. {maxPrice}</span>
    </div>
    <div className="slider">
      <input
        type="range"
        min="0"
        max="900"
        step="10"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <input
        type="range"
        min="0"
        max="900"
        step="10"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
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

              {/* Botón Agregar al Carrito con integración */}
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