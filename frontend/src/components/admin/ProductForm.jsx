import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";               
import autoTable from "jspdf-autotable"; 
import * as XLSX from "xlsx";

import "../../styles/ProductForm.css";


const defaultForm = {
  name: "",
  category: "Seleccionar",
  categoryId: "",
  price: "",
  stock: "",
  sizes: [],
  image: ""
};


const allSizes = ["XS", "S", "M", "L", "XL"];

function ProductForm({ product, cancelEdit, fetchProducts }) {
  const [formData, setFormData] = useState(defaultForm);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(defaultForm);
    }
  }, [product]);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAllCategories(data))
      .catch((err) => console.error("Error al cargar categorías:", err));

  }, []);

  const filteredCategories = allCategories.filter(
    (cat) => cat.tipo.toLowerCase() === formData.category.toLowerCase()
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { categoryId: "" } : {})
    }));
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
        setFormData((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, stock, image, categoryId } = formData;
    if (!name || !price || !stock || !image || !categoryId) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      if (product) {
        await axios.put(`http://localhost:8080/api/products/${product.id}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post("http://localhost:8080/api/products", formData, {
          withCredentials: true,
        });
      }

      alert("Producto guardado con éxito");
      setFormData(defaultForm);
      if (fetchProducts) fetchProducts(); // recargar lista
      if (cancelEdit) cancelEdit();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };
const exportToExcel = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products", { withCredentials: true });
    const products = response.data;

    const exportData = products.map((p) => ({
      ID: p.id,
      Nombre: p.name,
      Tipo: p.category,
      Categoría: p.categoryId,
      Precio: p.price,
      Stock: p.stock,
      Tallas: p.sizes.join(", "),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, "productos.xlsx");
  } catch (error) {
    console.error("Error al exportar Excel:", error);
  }
};

const exportToPDF = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products", {
      withCredentials: true,
    });

    const products = response.data;

    const doc = new jsPDF();

    const tableColumn = [
      "ID",
      "Nombre",
      "Tipo",
      "Categoría",
      "Precio",
      "Stock",
      "Tallas",
    ];

    const tableRows = products.map((p) => [
      p.id || "",
      p.name || "",
      p.category || "",
      p.categoryId || "",
      p.price || "",
      p.stock || "",
      Array.isArray(p.sizes) ? p.sizes.join(", ") : "",
    ]);

    doc.text("Reporte de Productos", 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("productos.pdf");
  } catch (error) {
    console.error("Error al exportar PDF:", error);
    alert("Error al generar el PDF. Revisa la consola.");
  }
};

  return (
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

      {filteredCategories.length > 0 && (
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="category-select"
        >
          <option value="">Seleccionar categoría</option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}

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
        <label htmlFor="imageUpload" className="custom-file-label">
          Elegir imagen
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {formData.image && (
        <img
          src={formData.image}
          alt="preview"
          className="preview-image"
        />
      )}

      <div className="form-buttons">
        <button type="submit">{product ? "Actualizar" : "Agregar"}</button>
        {product && (
          <button type="button" onClick={cancelEdit}>
            Cancelar
          </button>
        )}
        <button type="button" className="report-btn" onClick={exportToPDF}>
          Reporte en PDF
        </button>
        <button type="button" className="report-btn" onClick={exportToExcel}>
          Reporte en Excel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
