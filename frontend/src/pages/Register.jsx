import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://echosupport.onrender.com/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "linear-gradient(to right top, #020617, #0f172a, #1e1b4b)",

        fontFamily: "Arial",
      }}
    >

      <form
        onSubmit={handleRegister}

        style={{
          width: "100%",
          maxWidth: "420px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter: "blur(12px)",

          padding: "40px",

          borderRadius: "28px",

          border:
            "1px solid rgba(255,255,255,0.08)",

          boxShadow:
            "0 0 40px rgba(0,0,0,0.4)",
        }}
      >

        <h1
          style={{
            textAlign: "center",

            color: "white",

            marginBottom: "35px",

            fontSize: "42px",

            fontWeight: "bold",

            letterSpacing: "1px",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"

          onChange={handleChange}

          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"

          onChange={handleChange}

          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"

          onChange={handleChange}

          style={inputStyle}
        />

        <button
          type="submit"

          style={{
            width: "100%",

            padding: "16px",

            borderRadius: "16px",

            border: "none",

            background:
              "linear-gradient(to right, #8b5cf6, #3b82f6)",

            color: "white",

            fontSize: "17px",

            fontWeight: "bold",

            cursor: "pointer",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            transition: "0.3s",

            boxShadow:
              "0 0 20px rgba(139,92,246,0.4)",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "25px",

            textAlign: "center",

            color: "#cbd5e1",
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"

            style={{
              color: "#8b5cf6",

              textDecoration: "none",

              fontWeight: "bold",
            }}
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "16px",

  marginBottom: "20px",

  borderRadius: "14px",

  border: "1px solid rgba(255,255,255,0.08)",

  outline: "none",

  fontSize: "15px",

  background: "rgba(255,255,255,0.06)",

  color: "white",

  boxSizing: "border-box",
};

export default Register;