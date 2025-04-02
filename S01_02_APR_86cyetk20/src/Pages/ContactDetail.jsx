import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ContactDetail = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const contacts = useSelector((state) => state.contacts.contacts);
  const contact = contacts.find((contact) => contact.id === id);
  const navigate = useNavigate();

  // Redirect if contact not found
  useEffect(() => {
    if (!contact) {
      navigate("/Home");
    }
  }, [contact, navigate]);

  if (!contact) {
    return <p style={styles.errorText}>Contact not found!</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          {contact.photo ? (
            <img src={contact.photo} alt="Profile" style={styles.photo} />
          ) : (
            <div style={styles.placeholder}>{contact.name.charAt(0)}</div>
          )}
          <h2 style={styles.name}>{contact.name}</h2>
          <p style={styles.email}>{contact.email}</p>
        </div>
        <div style={styles.details}>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Company:</strong> {contact.company || "N/A"}</p>
          <p><strong>Address:</strong> {contact.address || "N/A"}</p>
          <p><strong>Notes:</strong> {contact.notes || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f7fc",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  photo: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #007bff",
  },
  placeholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#007bff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
  },
  name: {
    fontSize: "24px",
    color: "#333",
    margin: "10px 0 5px",
    fontWeight: "bold",
  },
  email: {
    fontSize: "14px",
    color: "#777",
  },
  details: {
    textAlign: "left",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "inset 0 0 10px rgba(155, 81, 81, 0.05)",
  },
  errorText: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
};

export default ContactDetail;
