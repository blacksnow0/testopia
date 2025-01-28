import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const ExamCard = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/exam/get-exam/${id}`
        );
        setQuestion(response.data.questions);
      } catch (error) {
        console.error(`Error fetching exam: ${error}`);
      }
    };

    fetchExam();
  }, [id]);

  const handleChoiceSelect = (questionIndex, choiceIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: choiceIndex,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5003/api/result/submit-exam/",
        {
          examId: id,
          answers,
          userId: user.id,
        }
      );

      alert(res.data.score);
      navigate("/student");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Exam {id}</h2>
      <div className="space-y-6">
        {question.map((q, questionIndex) => (
          <div key={questionIndex} className="p-4 ">
            <h3 className="font-bold">
              {questionIndex + 1}. {q.question}
            </h3>
            <ul className="mt-2">
              {q.choices.map((choice, choiceIndex) => (
                <li
                  key={choiceIndex}
                  className={`py-1 px-2 mb-2 border border-gray-600 rounded cursor-pointer tracking-wider ${
                    answers[questionIndex] === choiceIndex
                      ? "bg-gray-900 text-white"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => handleChoiceSelect(questionIndex, choiceIndex)}
                >
                  {choiceIndex + 1}. {choice}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-gray-900 cursor-pointer hover:bg-blue-900 text-white px-4 py-2 rounded"
      >
        Submit Exam
      </button>
    </div>
  );
};
