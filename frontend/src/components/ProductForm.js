import React, { useEffect, useState } from "react";
import "./ProductForm.css";

const defaultForm = {
  name: "",
  category: "hombre",
  price: "",
  stock: "",
  sizes: [],
  image: ""
};

const allSizes = ["XS", "S", "M", "L", "XL"];

function ProductForm({ onSubmit, product, cancelEdit }) {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (product) setFormData(product);
    else setFormData(defaultForm);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, image: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock || !formData.image) {
      alert("Por favor completa todos los campos.");
      return;
    }
    onSubmit(formData);
    setFormData(defaultForm);
  };

  return (
    <>
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>{product ? "Editar producto" : "Panel Administrador"}</h3>

        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={formData.name}
          onChange={handleInputChange}
        />

      <select
  className="category-select"
  name="category"
  value={formData.category}
  onChange={handleInputChange}
>
  <option value="hombre">Hombre</option>
  <option value="mujer">Mujer</option>
  <option value="niños">Niños</option>
  <option value="accesorios">Accesorios</option>
</select>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Cantidad disponible"
          value={formData.stock}
          onChange={handleInputChange}
        />

        <div className="sizes">
          {allSizes.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                checked={formData.sizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
              />
              {size}
            </label>
          ))}
        </div>

        <div className="file-upload">
          <label htmlFor="imageUpload" className="custom-file-label">Elegir imagen</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {formData.image && <img src={formData.image} alt="preview" className="preview-image" />}

        <div className="form-buttons">
          <button type="submit">{product ? "Actualizar" : "Agregar"}</button>
          {product && <button type="button" onClick={cancelEdit}>Cancelar</button>}
            <button className="report-btn">Reporte en PDF</button>
             <button className="report-btn">Reporte en Excel</button>
        </div>
      </form>

      
    </>
  );
}

export default ProductForm;
