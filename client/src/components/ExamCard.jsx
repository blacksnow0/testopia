import React from "react";
import { useParams } from "react-router-dom";

export const ExamCard = () => {
  const { id } = useParams(); // Get the exam ID from the URL

  // Mock static MCQs
  const mockQuestions = [
    {
      question:
        "What is the output of `console.log(typeof null)` in JavaScript?",
      choices: ["object", "null", "undefined", "number"],
      correct: "object",
    },
    {
      question:
        "Which keyword is used to define a constant variable in JavaScript?",
      choices: ["var", "let", "const", "constant"],
      correct: "const",
    },
    {
      question: "What is the Temporal Dead Zone (TDZ)?",
      choices: [
        " A situation where this is undefined in a function.",
        "A phase where variables are declared but cannot be accessed before initialization.",
        "A state where variables are hoisted to the top of the function.",
        "A scenario where variables are not hoisted.",
      ],
      correct:
        "A phase where variables are declared but cannot be accessed before initialization.",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Exam {id}</h2>
      <div className="space-y-6">
        {mockQuestions.map((q, index) => (
          <div key={index} className="p-4 ">
            <h3 className="font-bold">
              {index + 1}. {q.question}
            </h3>
            <ul className="mt-2">
              {q.choices.map((choice, i) => (
                <li
                  key={i}
                  className="py-1 px-2 border rounded hover:bg-gray-800 cursor-pointer tracking-wider"
                >
                  {i + 1} .{choice}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
