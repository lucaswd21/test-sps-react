import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import userService from "../services/UserService";


export async function userLoader({ params }) {
  if (params.userId === "new") {
    return null;
  }
  try {
    const response = await userService.get(params.userId);
    return response.data;
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

function UserEdit() { 
  const navigate = useNavigate();

  

  const userData = useLoaderData();
  const { userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("user");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    verifyUser()
    
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setType(userData.type || "user");
    }
  }, [userData]);

  function verifyUser() {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("Faça login para carregar essa página.");
      navigate("/signin");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("O nome é obrigatório");
      return;
    }
    if (!email.trim()) {
      alert("O e-mail é obrigatório");
      return;
    }
    if (!type.trim()) {
      alert("O tipo de usuário é obrigatório");
      return;
    }

    if (userId === "new" && !password.trim()) {
      alert("A senha é obrigatória ao criar um novo usuário");
      return;
    }
    
    try {
      if (userId === "new") {
        await userService.create({ name, email, type, password });
      } else {
        await userService.update(userId, { name, email, type, password });
      }
      navigate("/users");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao salvar usuário");
    }
  }

  function handleCancel() {
    navigate("/users");
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {userId === "new" ? "Criar Usuário" : "Editar Usuário"}
      </h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>E-mail</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo</label>
          <select
            style={styles.input}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Nova senha ou deixe vazio"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.actions}>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>
            Voltar
          </button>
          <button type="submit" style={styles.submitButton}>
            {userId === "new" ? "Criar" : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    backgroundColor: "#999",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UserEdit;
