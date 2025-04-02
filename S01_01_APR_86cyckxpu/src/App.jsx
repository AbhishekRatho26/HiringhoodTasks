import React, { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
    setError("");
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/^[0-9+\-*/.%]$/.test(key)) {
      event.preventDefault();
      setInput((prev) => prev + key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculateResult();
    } else if (key === "Backspace") {
      event.preventDefault();
      handleBackspace();
    } else {
      event.preventDefault();
    }
  };

  const clearInput = () => {
    setInput("");
    setError("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      if (input.includes("/0")) {
        setError("Cannot divide by zero");
        return;
      }
      const result = eval(input);
      if (isNaN(result)) {
        setError("Invalid Calculation");
      } else {
        setInput(result.toString());
        setError("");
      }
    } catch {
      setError("Invalid Expression");
    }
  };

  const calculateSquareRoot = () => {
    try {
      const number = parseFloat(input);
      if (isNaN(number)) {
        setError("Enter a valid number");
        return;
      }
      if (number < 0) {
        setError("Cannot calculate square root of a negative number");
        return;
      }
      setInput(Math.sqrt(number).toString());
      setError("");
    } catch {
      setError("Error calculating square root");
    }
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#2c3e50",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/[^0-9+\-*/.%]/g, ""))}
        onKeyDown={handleKeyPress}
        style={{
          width: "90%",
          padding: "15px",
          fontSize: "24px",
          textAlign: "right",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#34495e",
          color: "white",
        }}
      />
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "%", "+"].map(
          (char) => (
            <button
              key={char}
              onClick={() => handleClick(char)}
              style={{
                padding: "15px",
                fontSize: "20px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#ecf0f1",
                cursor: "pointer",
              }}
            >
              {char}
            </button>
          )
        )}
        <button
          onClick={calculateSquareRoot}
          style={{
            padding: "15px",
            fontSize: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#ecf0f1",
            cursor: "pointer",
          }}
        >
          √
        </button>
        <button
          onClick={handleBackspace}
          style={{
            padding: "15px",
            fontSize: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#f39c12",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⌫
        </button>
        <button
          onClick={calculateResult}
          style={{
            padding: "15px",
            fontSize: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2ecc71",
            color: "white",
            cursor: "pointer",
          }}
        >
          =
        </button>
        <button
          onClick={clearInput}
          style={{
            gridColumn: "span 4",
            padding: "15px",
            fontSize: "20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
