import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/UserService";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const response = await userService.list();
      setUsers(response.data);
    } catch (err) {
      alert("Faça login para carregar essa página.");
      handleLogout()
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    try {
      await userService.delete(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Erro ao excluir usuário.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Listagem de Usuários</h1>
      
      <div style={styles.actions}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>

        <Link to="/users/new" style={styles.createButton}>
          Criar Usuário
        </Link>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <Link to={`/users/${user.id}`} style={styles.editLink}>
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={styles.deleteButton}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  createButton: {
    textDecoration: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#f2f2f2",
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
    verticalAlign: "middle",
  },
  editLink: {
    marginRight: "10px",
    marginTop: "10px",
    textDecoration: "none",
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
  },
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Users;
