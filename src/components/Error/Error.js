import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "1rem",
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "black",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#6c757d",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "orangered",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

const Error = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.card}>
        <h1 style={styles.title}>Oops! Something went wrong.</h1>
        <p style={styles.message}>{message}</p>
        <button style={styles.button} onClick={() => navigate("/")}>
          Back to Popular Feed
        </button>
      </div>
    </div>
  );
};

export default Error;
