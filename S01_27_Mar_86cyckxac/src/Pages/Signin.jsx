import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signupUser } from "../indexedDB";
import { Link } from "react-router-dom";
const Signin = () => {
  const navigate = useNavigate();
  const [userName,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const showPopup = (message,isSuccess)=>{
    alert(message)
  }
  const handleSignin = async ()=>{
    try {
        if(userName=="" || password=="" || email==""){
            showPopup("Please fill all the fields",false)
        }else{
            const response = await signupUser(userName,email,password)
            showPopup(response,true)
    
            setTimeout(() => {
                navigate("/login"); 
                }, 2000);
    
        }
       
    } catch (error) {
        showPopup(error,false)
    }
  }
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={styles.title}>Welcome Back! 👋</h1>

        <div style={styles.formItem}>
          <label style={styles.label}>Username</label>
          <input type="text" placeholder="Enter your username" required style={styles.input} onChange={(e)=>setUserName(e.target.value)} value={userName} />
        </div>

        <div style={styles.formItem}>
          <label style={styles.label}>Email</label>
          <input type="email" placeholder="Enter your email" required style={styles.input} onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>

        <div style={styles.formItem}>
          <label style={styles.label}>Password</label>
          <input type="password" placeholder="Enter your password" required style={styles.input} onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.button}
          onClick={handleSignin}
        >
          Sign In
        </motion.button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <motion.span
            whileHover={{ scale: 1.1, color: "#ff6b81" }}
            style={styles.link}
          >
             <Link to="/login" style={{textDecoration:"none"}}>Log In</Link> 
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
};

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f4f4f4", // Light gray background
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff", // White card
      padding: "25px",
      width: "350px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
      textAlign: "center",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333", // Dark text
    },
    formItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#555", // Medium-dark gray
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc", // Light border
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      width: "100%", // Matches input width
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      background: "#007bff", // Simple blue button
      color: "#fff",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.2s",
    },
    buttonHover: {
      background: "#0056b3", // Darker blue on hover
    },
    footerText: {
      fontSize: "14px",
      marginTop: "10px",
      color: "#666",
    },
    link: {
      cursor: "pointer",
      fontWeight: "bold",
      color: "#007bff",
    },
  };
  
export default Signin;
