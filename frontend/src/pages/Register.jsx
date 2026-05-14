import { useState } from "react";
import axios from "axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;

    if (
      formData.name.trim().length < 3
    ) {

      return alert(
        "Name must be at least 3 characters"
      );
    }

    if (
      !emailRegex.test(formData.email)
    ) {

      return alert(
        "Invalid email format"
      );
    }

    if (
      !passwordRegex.test(
        formData.password
      )
    ) {

      return alert(
        "Password must contain minimum 6 characters, 1 uppercase letter, 1 number and 1 special character"
      );
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return alert(
        "Passwords do not match"
      );
    }

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/register",

        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(
        "Registration Successful 🎉"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex justify-center items-center text-white px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-5"
      >

        <h1 className="text-4xl font-bold text-center">
          Create Account 🚀
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="p-4 rounded-xl bg-black/30 border border-gray-700 outline-none"
          onChange={handleChange}
        />

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

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="confirmPassword"
          placeholder="Confirm Password"
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

        <div className="bg-black/30 p-4 rounded-xl text-sm text-gray-300">

          Password must contain:
          <ul className="list-disc ml-5 mt-2">

            <li>
              Minimum 6 characters
            </li>

            <li>
              One uppercase letter
            </li>

            <li>
              One number
            </li>

            <li>
              One special character
            </li>

          </ul>

        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 rounded-xl font-bold hover:scale-105 transition-all"
        >
          Register
        </button>

        <p className="text-center text-gray-300">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;