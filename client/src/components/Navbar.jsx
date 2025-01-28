import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="absolute top-0 w-full text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest">
          <Link to="/">TESTOPIA</Link>
        </h1>
        <div className="tracking-widest font-bold">
          <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 hover:bg-gray-700 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
