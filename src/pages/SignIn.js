import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";


function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("Você já está logado.");
      navigate("/users");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await userService.signIn(email, password);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/users");
    } catch (err) {
      setError("Login falhou. Verifique as credenciais.");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
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
          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
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
  button: {
    fontSize: "20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SignIn;
