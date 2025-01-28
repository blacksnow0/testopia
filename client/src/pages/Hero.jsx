import React from "react";
import quiz from "../assets/quiz.jpeg";
import leaderboard from "../assets/leaderboard.jpeg";
import knowledge from "../assets/knowledge.jpeg";
import background from "../assets/background.jpeg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "student") {
        navigate("/student");
      }
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-600 to-yellow-700 text-white px-6">
      <div
        className="max-w-4xl text-center space-y-6 rounded-2xl p-24 shadow-lg"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl">
          <h1 className="text-5xl font-semibold tracking-tight">
            Welcome to{" "}
            <span className="text-yellow-500 tracking-widest">Testopia</span>
          </h1>
          <p className="text-lg font-medium tracking-wider">
            Unlock your potential with interactive tests and quizzes. Challenge
            yourself, learn new things, and track your progress!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all shadow-md cursor-pointer"
            >
              Dashboard
            </button>
            <button className="px-6 py-2 bg-transparent border-2 border-yellow-300 text-yellow-300 font-bold text-lg rounded-lg hover:bg-yellow-500 hover:text-black transition-all shadow-md cursor-pointer">
              Learn More
            </button>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <img
              src={quiz}
              alt="Quiz Icon"
              className="w-20 h-20 rounded-full border-4 border-yellow-300 object-cover"
            />
            <img
              src={leaderboard}
              alt="Leaderboard Icon"
              className="w-20 h-20 rounded-full border-4 border-yellow-300 object-cover"
            />
            <img
              src={knowledge}
              alt="Knowledge Icon"
              className="w-20 h-20 rounded-full border-4 border-yellow-300 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
