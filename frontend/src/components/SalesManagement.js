import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserManagement.css"; // Reutilizamos estilos

function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/sales");
      setSales(res.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta venta?")) {
      await axios.delete(`http://localhost:8080/api/sales/${id}`);
      fetchSales();
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setFormData({ ...sale });
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:8080/api/sales/${editingSale.id}`, formData);
    setEditingSale(null);
    fetchSales();
  };

  return (
    <div className="user-management-container">
      <h2>Gestión de Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.name} {sale.lastname}</td>
              <td>
                {editingSale?.id === sale.id ? (
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  sale.phone
                )}
              </td>
              <td>
                {editingSale?.id === sale.id ? (
                  <input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                ) : (
                  sale.address
                )}
              </td>
              <td>S/. {sale.total.toFixed(2)}</td>
              <td>
                {editingSale?.id === sale.id ? (
                  <button onClick={handleSave}>Guardar</button>
                ) : (
                  <button onClick={() => handleEdit(sale)}>Editar</button>
                )}
                <button onClick={() => handleDelete(sale.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesManagement;
