import React, { useState } from "react";

export const MCQForm = ({ currentExam, onAddQuestion, onSaveExam }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState(null);

  const handleAddChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice]);
      setNewChoice("");
    }
  };

  const handleAddQuestion = () => {
    if (
      !currentQuestion.trim() ||
      choices.length < 2 ||
      correctChoiceIndex === null
    ) {
      alert(
        "Please ensure you have added a question, at least two choices, and selected a correct choice."
      );
      return;
    }
    onAddQuestion({
      question: currentQuestion,
      choices,
      correctChoice: correctChoiceIndex,
    });
    setCurrentQuestion("");
    setChoices([]);
    setNewChoice("");
    setCorrectChoiceIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddChoice();
    }
  };

  return (
    <div className="shadow-md p-6 rounded-lg mt-6 ">
      <h3 className="text-xl font-bold mb-4 ">
        Add Questions for "{currentExam.title}"
      </h3>

      {/* Question Input */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Question</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Enter your question"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
        />
      </div>

      {/* Choices Section */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Choices</label>
        {choices.length > 0 && (
          <ul className="mb-2">
            {choices.map((choice, index) => (
              <li
                key={index}
                className={`p-2 border rounded mb-2 flex justify-between items-center ${
                  index === correctChoiceIndex ? "bg-green-800" : "bg-gray-800"
                }`}
              >
                <span>{choice}</span>
                <button
                  type="button"
                  onClick={() => setCorrectChoiceIndex(index)}
                  className={`px-2 py-1 text-sm rounded ${
                    index === correctChoiceIndex
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index === correctChoiceIndex ? "Correct" : "Set as Correct"}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center">
          <input
            type="text"
            value={newChoice}
            onChange={(e) => setNewChoice(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a choice"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-700"
          />
          <button
            type="button"
            onClick={handleAddChoice}
            className="ml-2 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
          >
            Add Choice
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
        >
          Add Question
        </button>
        <button
          type="button"
          onClick={onSaveExam}
          className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};
