import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
  const response = await axios.get("http://localhost:8080/api/users", {
    withCredentials: true,
  });
  setUsers(response.data);
};

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers();
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, formData);
    setEditingUser(null);
    fetchUsers();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, "usuarios.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Username", "Nombres", "Apellidos", "Rol"];
    const tableRows = users.map((u) => [u.id, u.username, u.firstName, u.lastName, u.role]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("usuarios.pdf");
  };

  return (
  <div className="user-management-container">
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={exportToExcel}>Exportar Excel</button>
      <button onClick={exportToPDF}>Exportar PDF</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              {editingUser?.id === u.id ? (
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              ) : (
                u.username
              )}
            </td>
            <td>
              {editingUser?.id === u.id ? (
                <input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              ) : (
                u.firstName
              )}
            </td>
            <td>
              {editingUser?.id === u.id ? (
                <input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              ) : (
                u.lastName
              )}
            </td>
            <td>
              {editingUser?.id === u.id ? (
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              ) : (
                u.role
              )}
            </td>
            <td>
              {editingUser?.id === u.id ? (
                <button onClick={handleSave}>Guardar</button>
              ) : (
                <button onClick={() => handleEdit(u)}>Editar</button>
              )}
              <button onClick={() => handleDelete(u.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default UserManagement;
