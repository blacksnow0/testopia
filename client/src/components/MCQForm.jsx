import React, { useState } from "react";

export const MCQForm = ({ onAddExam }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentChoices, setCurrentChoices] = useState(["", "", "", ""]);
  const [correctChoice, setCorrectChoice] = useState(0);

  const handleExamSubmit = (e) => {
    e.preventDefault();
    onAddExam({ title, description, questions });
    setTitle("");
    setDescription("");
    setQuestions([]);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        question: currentQuestion,
        choices: currentChoices,
        correct: correctChoice,
      },
    ]);
    setCurrentQuestion("");
    setCurrentChoices(["", "", "", ""]);
    setCorrectChoice(0);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...currentChoices];
    updatedChoices[index] = value;
    setCurrentChoices(updatedChoices);
  };

  return (
    <form
      onSubmit={handleExamSubmit}
      className="p-4 bg-gray-900 rounded shadow"
    >
      <h3 className="text-lg font-bold mb-4">Create an Exam</h3>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Question Form */}
      <div className="p-4 bg-gray-800 rounded mb-4">
        <h4 className="text-md font-bold mb-2">Add Question</h4>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Question</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
        </div>
        {currentChoices.map((choice, index) => (
          <div key={index} className="mb-2">
            <label className="block mb-1 font-medium">Choice {index + 1}</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="mb-2">
          <label className="block mb-1 font-medium">Correct Choice</label>
          <select
            className="w-full p-2 border rounded"
            value={correctChoice}
            onChange={(e) => setCorrectChoice(Number(e.target.value))}
          >
            {currentChoices.map((_, index) => (
              <option key={index} value={index}>
                Choice {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleQuestionSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Question
        </button>
      </div>

      {questions.length > 0 && (
        <div className="p-4 bg-gray-800 rounded mb-4">
          <h4 className="text-md font-bold mb-2">Questions Preview</h4>
          {questions.map((q, index) => (
            <div key={index} className="mb-2 p-2 border rounded bg-gray-700">
              <p className="font-medium">
                {index + 1}. {q.question}
              </p>
              <ul className="pl-4">
                {q.choices.map((choice, i) => (
                  <li
                    key={i}
                    className={i === q.correct ? "text-green-400" : ""}
                  >
                    {i + 1}. {choice}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Exam
      </button>
    </form>
  );
};
