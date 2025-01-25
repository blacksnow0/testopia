import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 rounded-lg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest">
          <Link to="/">TESTOPIA</Link>
        </h1>
        <div>
          <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </Link>
          <Link to="/admin" className="px-4 py-2 hover:bg-gray-700 rounded">
            Admin
          </Link>
          <Link to="/student" className="px-4 py-2 hover:bg-gray-700 rounded">
            Student
          </Link>
        </div>
      </div>
    </nav>
  );
};
