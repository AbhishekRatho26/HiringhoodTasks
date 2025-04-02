import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { updateContact } from "../redux/contactSlice";

const EditContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactId = localStorage.getItem("id"); 
  const contacts = useSelector((state) => state.contacts.contacts);

  const contact = contacts.find((c) => c.id === contactId);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    company: "",
    photo: "",
  });

  // Load contact data into the form
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address || "",
        notes: contact.notes || "",
        company: contact.company || "",
        photo: contact.photo || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!contactId) return;

    dispatch(
      updateContact({
        id: contactId,
        ...formData,
      })
    );

    localStorage.removeItem("id"); // Remove ID from localStorage
    navigate("/Home"); // Redirect to home page
  };

  if (!contact) {
    return <p style={styles.errorMessage}>Contact not found!</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Contact</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter Company Name"
            value={formData.company}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Notes</label>
          <textarea
            name="notes"
            placeholder="Enter any notes"
            value={formData.notes}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={styles.input}
          />
          {formData.photo && (
            <div style={styles.photoPreview}>
              <img
                src={formData.photo}
                alt="Preview"
                style={styles.photoImage}
              />
            </div>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: "#28a745" }}
          >
            Update
          </button>
          <Link to="/Home">
            <button
              style={{ ...styles.button, backgroundColor: "#dc3545" }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
    textAlign: "left",
    display: "block",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    color: "#333",
    transition: "0.3s",
    outline: "none",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    color: "#333",
    transition: "0.3s",
    outline: "none",
    width: "100%",
    height: "100px",
  },
  photoPreview: {
    marginTop: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  photoImage: {
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default EditContact;
