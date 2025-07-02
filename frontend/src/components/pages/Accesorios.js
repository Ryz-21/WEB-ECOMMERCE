import React,{useState} from "react";
import "./Accesorios.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";


const products = [
  { id: 28, name: "Collar V1S", image: require("../../image/Ropa/Accesorios/Aretes1.jpg"), price: 129.90, category: "Aretes" }, // según aclaración
  { id: 29, name: "Cont PZZ", image: require("../../image/Ropa/Accesorios/collar2.webp"), price: 149.90, category: "Collares" },
  { id: 30, name: "Phatom MS", image: require("../../image/Ropa/Accesorios/Collar1.jpg"), price: 89.90, category: "Collares" },
  { id: 31, name: "Pulse WW", image: require("../../image/Ropa/Accesorios/Pulsera1.jpeg"), price: 89.90, category: "Pulseras" },
];

function Accesorios() {
   const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(900);

    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { searchTerm } = useSearch();
  
    
   // Filtrar por búsqueda y por rango de precio
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
      <section className="Accesorios-page">
        <div className="product-grid">

          
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
    {["Todos", "Collares", "Pulseras", "Aretes", "Anillos"].map((cat) => (
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
export default Accesorios;
