import React, { useState } from "react";
import { MCQForm } from "../components/MCQForm";
import ye from "../assets/ye.jpeg";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState({
    title: "",
    description: "",
    questions: [],
    createdBy: user.id,
  });

  const [isExamDefined, setIsExamDefined] = useState(false);

  const defineExam = (title, description) => {
    setCurrentExam({ title, description, questions: [], createdBy: user.id });
    setIsExamDefined(true);
  };

  const addQuestion = (question) => {
    setCurrentExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, question],
    }));
  };

  const saveExam = async () => {
    const updatedExams = [...exams, currentExam];

    setExams(updatedExams);
    setCurrentExam({ title: "", description: "", questions: [] });
    setIsExamDefined(false);

    await createExam(updatedExams);
  };

  const createExam = async (updatedExams) => {
    try {
      const res = await axios.post(
        "http://localhost:5003/api/exam/create-exam",
        updatedExams[0]
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-6 py-12"
      style={{
        backgroundImage: `url(${ye})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-5xl w-full bg-black/60 backdrop-blur-md text-white rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-extrabold text-yellow-700 text-center mb-8">
          Admin Dashboard
        </h2>

        {!isExamDefined ? (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Define New Exam</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                defineExam(e.target.title.value, e.target.description.value);
              }}
            >
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium mb-2"
                >
                  Exam Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-3 bg-black/60 backdrop-blur-md text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter exam title"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block text-lg font-medium mb-2"
                >
                  Exam Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-3 bg-black/60 backdrop-blur-md text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="4"
                  placeholder="Enter exam description"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-yellow-700 text-lg font-semibold rounded-lg cursor-pointer hover:bg-yellow-800  focus:ring-2 focus:ring-blue-500 transition"
              >
                Next: Add Questions
              </button>
            </form>
          </div>
        ) : (
          <MCQForm
            currentExam={currentExam}
            onAddQuestion={addQuestion}
            onSaveExam={saveExam}
          />
        )}

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Existing Exams</h3>
          {exams.length > 0 ? (
            <ul className="space-y-6">
              {exams.map((exam, index) => (
                <li
                  key={index}
                  className="p-6 bg-black/60 backdrop-blur-md rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-bold">Title: {exam.title}</h4>
                  <p className="text-gray-400 mb-4">
                    Descriptions: {exam.description}
                  </p>
                  <ul>
                    {exam.questions.map((question, index) => (
                      <li key={index} className="mb-2">
                        {question.question}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No exams available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
