import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(formData.email)
    ) {

      return alert(
        "Invalid email format"
      );
    }

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/login",

        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 🔥");

      if (
        res.data.user.role ===
        "admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Invalid Credentials"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex justify-center items-center text-white px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-5"
      >

        <h1 className="text-4xl font-bold text-center">
          EchoSupport 🔥
        </h1>

        <p className="text-center text-gray-300">
          AI Powered Support Platform
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
          onChange={handleChange}
        />

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          placeholder="Password"
          className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="text-blue-400 text-left"
        >
          {showPassword
            ? "Hide Password"
            : "Show Password"}
        </button>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl font-bold hover:scale-105 transition-all"
        >
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-300">

          <Link
            to="/register"
            className="text-blue-400"
          >
            Create Account
          </Link>

          <button
            type="button"
            className="text-pink-400"
          >
            Forgot Password?
          </button>

        </div>

      </form>

    </div>
  );
};

export default Login;