import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";


const Login = () => {

  const navigate =
    useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({

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


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(
          formData.email
        )
      ) {

        return alert(
          "Invalid email format"
        );
      }

      try {

        const res =
          await axios.post(

            "https://echo-support-backend.onrender.com/api/auth/login",

            formData
          );

        localStorage.setItem(

          "token",

          res.data.token
        );

        localStorage.setItem(

          "user",

          JSON.stringify(
            res.data.user
          )
        );

        alert(
          "Login Successful 🔥"
        );


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

          error.response?.data
            ?.message ||

            "Invalid Credentials"
        );
      }
    };


  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 flex justify-center items-center px-4 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col gap-5"
      >

        <div className="text-center">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">

            EchoSupport

          </h1>

          <p className="text-gray-300 mt-3">
            AI Powered Support Platform
          </p>

        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-black/40 border border-gray-700 outline-none focus:border-blue-500"
        />

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-black/40 border border-gray-700 outline-none focus:border-purple-500"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="text-left text-blue-400 hover:text-blue-300"
        >

          {showPassword
            ? "Hide Password"
            : "Show Password"}

        </button>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Login
        </button>

        <div className="flex justify-between items-center text-sm text-gray-300 mt-2">

          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Create Account
          </Link>

          <button
            type="button"
            className="text-pink-400 hover:text-pink-300"
          >
            Forgot Password?
          </button>

        </div>

      </form>

    </div>
  );
};

export default Login;