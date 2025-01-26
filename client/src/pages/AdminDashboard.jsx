// pages/AdminDashboard.jsx
import React, { useState } from "react";
import { MCQForm } from "../components/MCQForm";

export const AdminDashboard = () => {
  const [exams, setExams] = useState([]);

  const addExam = (exam) => setExams([...exams, exam]);

  return (
    <div className="p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <MCQForm onAddExam={addExam} />
      <div className="mt-6">
        <h3 className="text-xl font-bold">Existing Exams</h3>
        <ul className="mt-4">
          {exams.map((exam, index) => (
            <li key={index} className="p-2 border-b">
              {exam.title} - {exam.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
