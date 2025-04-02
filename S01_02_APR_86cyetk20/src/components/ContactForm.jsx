import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    notes: "",
    photo: null,
  });

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {  // Limit file size to 2MB
        alert("File size must be under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setContact({ ...contact, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = contacts.some(
      (c) => c.name === contact.name || c.phone === contact.phone
    );

    if (exists) {
      alert("A contact with this name or phone number already exists.");
      return;
    }

    dispatch(
      addContact({
        id: uuidv4(),
        ...contact,
      })
    );

    alert("Contact Added successfully");
    navigate("/home");

    setContact({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      notes: "",
      photo: null,
    });

    setFileInputKey(Date.now());
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add Contact</h2>

      {contact.photo ? (
        <img src={contact.photo} alt="Profile" style={styles.imagePreview} />
      ) : contact.name ? (
        <div style={styles.initialsDP}>{getInitials(contact.name)}</div>
      ) : (
        <div style={styles.initialsPlaceholder}>DP</div>
      )}

      <input
        key={fileInputKey}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={styles.inputFile}
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={contact.phone}
        onChange={handleChange}
        required
        pattern="[0-9]{10}"
        title="Enter a valid 10-digit phone number"
        style={styles.input}
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={contact.address}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={contact.company}
        onChange={handleChange}
        style={styles.input}
      />

      <textarea
        name="notes"
        placeholder="Additional Notes"
        value={contact.notes}
        onChange={handleChange}
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>Add Contact</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  textarea: {
    display: "block",
    width: "100%",
    padding: "12px",
    height: "80px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  inputFile: {
    marginBottom: "10px",
  },
  imagePreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
    display: "block",
    margin: "10px auto",
    border: "3px solid #1E40AF",
  },
  initialsDP: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#1E40AF",
    color: "white",
    fontSize: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px auto",
    fontWeight: "bold",
    border: "3px solid #1E40AF",
  },
  initialsPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    color: "#555",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px auto",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1E40AF",
    color: "white",
    padding: "12px",
    border: "none",
    width: "100%",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default ContactForm;
