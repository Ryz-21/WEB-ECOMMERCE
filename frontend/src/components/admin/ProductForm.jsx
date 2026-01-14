import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";               
import autoTable from "jspdf-autotable"; 
import * as XLSX from "xlsx";

import "../../styles/ProductForm.css";


const defaultForm = {
  name: "",
  category: "Seleccionar",
  tipoProducto: "Seleccionar",
  categoryId: "",
  price: "",
  stock: "",
  sizes: [],
  image: ""
};


const allSizes = ["XS", "S", "M", "L", "XL"];

const subCategoryMaps = {
  hombre: {
    Polo: 1,
    Pantalón: 4,
    Polera: 10,
    Camisa: 9,
  },
  mujer: {
    Polo: 3,
    Pantalón: 5,
    Polera: 8,
  },
  niños: {
    Polo: 2,
    Pantalón: 6,
    Polera: 7,
  },
  accesorios: {
    // agregar si hay
  },
};

function ProductForm({ product, cancelEdit, fetchProducts }) {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (product) {
      const map = subCategoryMaps[product.category] || {};
      const tipoProducto = Object.keys(map).find(key => map[key] === product.categoryId) || "Seleccionar";
      setFormData({ ...product, tipoProducto });
    } else {
      setFormData(defaultForm);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { categoryId: "", tipoProducto: "Seleccionar" } : {}),
      ...(name === "tipoProducto" ? { categoryId: subCategoryMaps[prev.category]?.[value] || "" } : {})
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
    const { name, price, stock, image, categoryId, category } = formData;
    const hasTypes = Object.keys(subCategoryMaps[category] || {}).length > 0;
    if (!name || !price || !stock || !image || (hasTypes && !categoryId)) {
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

    const exportData = products.map((p) => {
      const map = subCategoryMaps[p.category] || {};
      const tipoProducto = Object.keys(map).find(key => map[key] === p.categoryId) || "N/A";
      return {
        ID: p.id,
        Nombre: p.name,
        Tipo: p.category,
        Subtipo: tipoProducto,
        Precio: p.price,
        Stock: p.stock,
        Tallas: p.sizes.join(", "),
      };
    });

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
      "Subtipo",
      "Precio",
      "Stock",
      "Tallas",
    ];

    const tableRows = products.map((p) => {
      const map = subCategoryMaps[p.category] || {};
      const tipoProducto = Object.keys(map).find(key => map[key] === p.categoryId) || "N/A";
      return [
        p.id || "",
        p.name || "",
        p.category || "",
        tipoProducto,
        p.price || "",
        p.stock || "",
        Array.isArray(p.sizes) ? p.sizes.join(", ") : "",
      ];
    });

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
        <option value="seleccionar">Seleccionar</option>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="niños">Niños</option>
        <option value="accesorios">Accesorios</option>
      </select>

      <select
        className="category-select"
        name="tipoProducto"
        value={formData.tipoProducto}
        onChange={handleInputChange}
      >
        <option value="Seleccionar">Seleccionar tipo</option>
        {Object.keys(subCategoryMaps[formData.category] || {}).map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
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
