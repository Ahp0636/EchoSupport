import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";


const Register = () => {

  const navigate =
    useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

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

      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;


      if (
        formData.name.trim()
          .length < 3
      ) {

        return alert(
          "Name must be at least 3 characters"
        );
      }


      if (
        !emailRegex.test(
          formData.email
        )
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

        const res =
          await axios.post(

            "https://echo-support-backend.onrender.com/api/auth/register",

            {

              name:
                formData.name,

              email:
                formData.email,

              password:
                formData.password,
            }
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
          "Registration Successful 🚀"
        );


        navigate("/dashboard");

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

            "Registration Failed"
        );
      }
    };


  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-purple-950 flex justify-center items-center px-4 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col gap-5"
      >

        <div className="text-center">

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">

            Create Account

          </h1>

          <p className="text-gray-300 mt-3">
            Join EchoSupport 🚀
          </p>

        </div>


        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-black/40 border border-gray-700 outline-none focus:border-purple-500"
        />


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


        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-black/40 border border-gray-700 outline-none focus:border-blue-500"
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


        <div className="bg-black/30 p-4 rounded-2xl text-sm text-gray-300">

          Password must contain:

          <ul className="list-disc ml-5 mt-2 space-y-1">

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
          className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Register
        </button>


        <p className="text-center text-gray-300">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-400 ml-2 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;