import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AdminDashboard } from "./pages/AdminDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { Login } from "./pages/Login";
import { ExamPage } from "./pages/ExamPage";
import { ResultPage } from "./pages/ResultPage";
import { ExamCard } from "./components/ExamCard";
import Hero from "./pages/Hero";
import Register from "./components/Register";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Conditionally Render Navbar */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/student"
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/exam"
              element={
                <PrivateRoute>
                  <ExamPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/result"
              element={
                <PrivateRoute>
                  <ResultPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/exam/:id"
              element={
                <PrivateRoute>
                  <ExamCard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

const AuthAwareNavbar = () => {
  const { user } = useAuth();

  return user ? <Navbar /> : null;
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
