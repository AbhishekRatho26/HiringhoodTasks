import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = {
    navbar: {
      background: "linear-gradient(to right, #6a11cb, #2575fc)", 
      padding: "15px 30px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff",
      textDecoration: "none",
      cursor: "pointer",
    },
    menu: {
      display: "flex",
      gap: "20px",
    },
    menuItem: {
      color: "#fff",
      fontSize: "18px",
      textDecoration: "none",
      transition: "color 0.3s ease-in-out",
    },
    mobileMenu: {
      position: "absolute",
      top: "60px",
      right: "20px",
      background: "#2575fc", 
      borderRadius: "8px",
      padding: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    menuButton: {
      display: "none",
      fontSize: "24px",
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.navbar}>
      
      <Link
        to="/Home"
        style={styles.title}
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
      >
        Contact Manager
      </Link>

      
      <div style={styles.menu} className="hidden md:flex">
        {["Home", "Add"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            style={styles.menuItem}
            className="hover:text-gray-200"
          >
            {item}
          </Link>
        ))}
      </div>

      
      <div
        style={styles.menuButton}
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

     
      {menuOpen && (
        <div style={styles.mobileMenu} className="md:hidden">
          {["Home", "Add"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              style={{ ...styles.menuItem, display: "block", padding: "8px 0" }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
