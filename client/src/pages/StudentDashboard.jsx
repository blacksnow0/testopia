import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ye from "../assets/ye.jpeg";
import { useAuth } from "../context/AuthContext";

export const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const [completed, setCompleted] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const exams = await axios.get(
          "http://localhost:5003/api/exam/get-all-exams"
        );
        setExams(exams.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const completedExams = await axios.get(
          `http://localhost:5003/api/result/get-taken-exams/${user.id}`
        );
        setCompleted(completedExams.data.exams);
      } catch (error) {
        console.log(`Error:`, error);
      }
    };
    fetchCompleted();
  });

  return (
    <div
      className="p-4 min-h-screen bg-cover bg-center text-white flex  items-center"
      style={{ backgroundImage: `url(${ye})` }}
    >
      <div className="bg-gradient-to-br from-gray-600 to-yellow-700 p-6 py-48 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const isCompleted = completed.some(
              (completedExam) => completedExam.examId === exam._id
            );

            return (
              <div
                key={exam._id}
                className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{exam.title}</h3>
                <p className="mb-4">{exam.description}</p>

                {isCompleted ? (
                  <p className="font-bold text-green-700 w-full bg-gray-800 p-3">
                    Score:{" "}
                    {
                      completed.find(
                        (completedExam) => completedExam.examId === exam._id
                      )?.score
                    }
                  </p>
                ) : (
                  <Link
                    to={`/exam/${exam._id}`}
                    className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition-colors duration-200"
                  >
                    Take Test
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
