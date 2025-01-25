// pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") navigate("/admin");
    else navigate("/student");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <button
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-4"
        onClick={() => handleLogin("admin")}
      >
        Login as Admin
      </button>
      <button
        className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        onClick={() => handleLogin("student")}
      >
        Login as Student
      </button>
    </div>
  );
};
