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
import Hero from "./pages/Hero";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-grow ">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/exam/:id" element={<ExamCard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
