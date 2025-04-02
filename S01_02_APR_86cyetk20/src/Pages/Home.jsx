import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactSlice";
import Navbar from "../components/Navbar";

const Home = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  // Sort contacts alphabetically
  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter contacts based on search query
  const filteredContacts = sortedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.heading}>Contacts List</h1>

        
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />

        {filteredContacts.length === 0 ? (
          <div style={styles.noContacts}>No Contacts Found</div>
        ) : (
          <div style={styles.contactList}>
            {filteredContacts.map((contact, index) => (
              <div key={index} style={styles.contactCard}>
                <Link to={`/contact/${contact.id}`} style={{ textDecoration: "none", flex: 1 }}>
                  {contact.photo ? (
                    <img
                      src={contact.photo}
                      alt={`${contact.name}'s profile`}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.initials}>{getInitials(contact.name)}</div>
                  )}
                  <div style={styles.contactDetails}>
                    <h2 style={styles.contactName}>{contact.name}</h2>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                  </div>
                </Link>
                <div style={styles.buttonContainer}>
                  <button
                    onClick={() => dispatch(deleteContact(contact.id))}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      if (contact?.id) {
                        localStorage.setItem("id", contact.id);
                        navigate("/edit");
                      } else {
                        console.error("Contact ID is undefined");
                      }
                    }}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link to="/add">
          <button style={styles.addButton}>+ Add New Contact</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    overflowY: "auto",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    outline: "none",
  },
  noContacts: {
    fontSize: "1.5rem",
    color: "#999",
    marginTop: "20px",
    textAlign: "center",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "900px",
    width: "100%",
    marginBottom: "20px",
  },
  contactCard: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    transition: "transform 0.2s, box-shadow 0.2s",
    width: "100%",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #1E40AF",
  },
  initials: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#1E40AF",
    color: "white",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  contactDetails: {
    textAlign: "left",
    flexGrow: 1,
  },
  contactName: {
    fontSize: "1.5rem",
    margin: "0",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  addButton: {
    marginTop: "20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Home;
