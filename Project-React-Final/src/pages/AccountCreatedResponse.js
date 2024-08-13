import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Login Page Images/log.jpg"; // Import the background image

const AccountCreatedResponse = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  const handleHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the background image
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          border: "1px solid #ddd",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem", // Match the font size
            fontWeight: "bold", // Match the font weight
            color: "#1A202C", // Match the color
            marginBottom: "1rem",
            fontFamily: "'Inter', sans-serif", // Ensure consistent font-family
          }}
        >
          Thank you for registering with us
        </h1>
        <p
          style={{
            fontSize: "1.125rem", // Match the font size
            color: "#4A5568", // Match the color
            marginBottom: "2rem",
            fontWeight: "bold", // Ensure text is bold
            fontFamily: "'Inter', sans-serif", // Ensure consistent font-family
          }}
        >
          Let's configure your vehicle...
        </p>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="primary"
            onClick={handleLogin}
            style={{
              backgroundColor: "#319795", // Match the button color
              border: "none",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              fontWeight: "bold", // Match the font weight
              borderRadius: "6px",
              color: "#ffffff", // Match the text color
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, background-color 0.3s ease", // Added transform transition for smooth animation
              fontFamily: "'Inter', sans-serif", // Ensure consistent font-family
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2C7A7B";
              e.currentTarget.style.transform = "scale(1.1)"; // Increase button size on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#319795";
              e.currentTarget.style.transform = "scale(1)"; // Reset button size when not hovered
            }}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            onClick={handleHome}
            style={{
              backgroundColor: "#6c757d",
              border: "none",
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              fontWeight: "bold", // Match the font weight
              borderRadius: "6px",
              color: "#ffffff", // Match the text color
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, background-color 0.3s ease", // Added transform transition for smooth animation
              fontFamily: "'Inter', sans-serif", // Ensure consistent font-family
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#5a6268";
              e.currentTarget.style.transform = "scale(1.1)"; // Increase button size on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#6c757d";
              e.currentTarget.style.transform = "scale(1)"; // Reset button size when not hovered
            }}
          >
            Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AccountCreatedResponse;