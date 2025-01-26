import React, { useState } from "react";
import doom from "../assets/doom.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5003/api/user/login", {
        username,
        password,
      });

      if (res.status === 200) {
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else if (res.data.user.role === "student") {
          navigate("/student");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${doom})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/80"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-10 rounded-2xl">
        <h2 className="text-3xl text-gray-300 font-semibold text-center mb-6">
          Welcome Back to{" "}
          <span className="text-yellow-600 tracking-wide">Testopia</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-sm shadow focus:outline-none focus:ring focus:ring-yellow-700 text-gray-300"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-sm shadow focus:outline-none focus:ring focus:ring-yellow-700 text-gray-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-yellow-700 text-white px-10 py-1 rounded-sm cursor-pointer font-bold text-lg shadow-lg hover:bg-yellow-800 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-200 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-yellow-600 tracking-wide font-bold hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};
