import React from "react";
import { ExamCard } from "../components/ExamCard";
import { Link } from "react-router-dom";

export const StudentDashboard = () => {
  const mockExams = [
    {
      title: "Functions And Objects",
      description: "JavaScript Programming",
    },
    { title: "Scopes", description: "JavScript Programming" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockExams.map((exam, index) => (
          <div className="p-4 border rounded shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">{exam.title}</h3>
            <p className="text-gray-300">{exam.description}</p>
            <Link
              to={`/exam/${exam.id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-900 text-white rounded hover:bg-gray-900 cursor-pointer"
            >
              Take Test
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
