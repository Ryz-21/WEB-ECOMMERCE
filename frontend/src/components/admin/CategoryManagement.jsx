import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/CategoryManagement.css";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", tipo: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:8080/api/categories", {
      withCredentials: true,
    });
    setCategories(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta categoría?")) {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      fetchCategories();
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, tipo: cat.tipo });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.tipo) {
      return alert("Completa todos los campos");
    }

    if (editingCategory) {
      await axios.put(
        `http://localhost:8080/api/categories/${editingCategory.id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:8080/api/categories", formData);
    }

    setEditingCategory(null);
    setFormData({ name: "", tipo: "" });
    fetchCategories();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(categories);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categorías");
    XLSX.writeFile(wb, "categorias.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Nombre", "Tipo"];
    const tableRows = categories.map((c) => [c.id, c.name, c.tipo]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("categorias.pdf");
  };

  return (
    <div className="category-management-container">
      <h3>Gestión de Categorías</h3>

      <div className="category-form">
        <input
          type="text"
          placeholder="Nombre de categoría"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
        >
          <option value="">Seleccionar Tipo</option>
          <option value="HOMBRE">HOMBRE</option>
          <option value="MUJER">MUJER</option>
          <option value="ACCESORIOS">ACCESORIOS</option>
          <option value="NIÑOS">NIÑOS</option>
        </select>
        <button onClick={handleSave}>
          {editingCategory ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={exportToExcel}>Exportar Excel</button>
        <button onClick={exportToPDF}>Exportar PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.tipo}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Editar</button>
                <button onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManagement;
