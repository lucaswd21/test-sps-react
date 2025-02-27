import React from "react";
import { Link } from "react-router-dom";



function Home() {
  const token = localStorage.getItem("token")
  const authenticated = token ? true : false

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SPS REACT TEST</h1>
      <p style={styles.subtitle}>Bem-vindo.</p>
      <div style={styles.linkContainer}>
        {
          authenticated ? (
            <Link to="/users" style={styles.linkButton}>Usuários</Link>
          ) : (
            <Link to="/signin" style={styles.linkButton}>Login</Link>
          )
        }
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  linkButton: {
    fontSize: "20px",
    textDecoration: "none",
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "4px",
  },
};

export default Home;
