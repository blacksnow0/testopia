// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./pages/AdminDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { Login } from "./pages/Login";
import { ExamPage } from "./pages/ExamPage";
import { ResultPage } from "./pages/ResultPage";
import { ExamCard } from "./components/ExamCard";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/exam/:id" element={<ExamCard />} />
          </Routes>
        </main>
        {/* Footer (Optional) */}
        <footer className="bg-gray-900 text-white p-4 text-center tracking-widest">
          © {new Date().getFullYear()} TESTOPIA
        </footer>
      </div>
    </Router>
  );
}

export default App;
