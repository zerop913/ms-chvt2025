"use client";

import { useState } from "react";
import { Task, Choice } from "@/types/masterclass";

interface TaskComponentProps {
  task: Task;
  taskIndex: number;
  onComplete: (isCorrect: boolean) => void;
  isCompleted: boolean;
  isBonus?: boolean;
}

export function TaskComponent({
  task,
  taskIndex,
  onComplete,
  isCompleted,
  isBonus = false,
}: TaskComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    let correct = false;

    if (task.type === "choice") {
      const selectedChoice = task.choices?.find(
        (choice) => choice.id === selectedAnswer
      );
      correct = selectedChoice?.isCorrect || false;
    } else if (task.type === "input" || task.type === "code") {
      // Простая проверка по содержанию ключевых слов
      const userAnswer = userInput.toLowerCase().trim();
      const correctAnswer = task.correctAnswer?.toLowerCase().trim() || "";

      // Проверяем точное совпадение или содержание ключевых слов
      if (userAnswer === correctAnswer) {
        correct = true;
      } else {
        // Проверяем наличие ключевых слов из правильного ответа
        const keywords = correctAnswer
          .split(/[,\s]+/)
          .filter((word) => word.length > 2);
        const userWords = userAnswer.split(/[,\s]+/);
        const matchedKeywords = keywords.filter((keyword) =>
          userWords.some((userWord) => userWord.includes(keyword))
        );
        correct = matchedKeywords.length >= keywords.length * 0.7; // 70% совпадений
      }
    }

    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct);
  };

  const resetTask = () => {
    setSelectedAnswer("");
    setUserInput("");
    setShowResult(false);
    setIsCorrect(false);
  };

  const taskHeaderClass = isBonus
    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";

  return (
    <div
      className={`border rounded-lg overflow-hidden ${
        isCompleted ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
    >
      {/* Task Header */}
      <div className={`${taskHeaderClass} p-4`}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg">
            {isBonus ? "⭐ Бонус" : `Задание ${taskIndex}`}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
              {task.points} баллов
            </span>
            {isCompleted && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                ✓ Выполнено
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-4 font-medium">{task.question}</p>

        {/* Multiple Choice */}
        {task.type === "choice" && task.choices && (
          <div className="space-y-3">
            {task.choices.map((choice: Choice) => (
              <label
                key={choice.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`task-${task.id}`}
                  value={choice.id}
                  checked={selectedAnswer === choice.id}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={showResult}
                  className="text-blue-600"
                />
                <span
                  className={`flex-1 p-3 rounded border transition-colors ${
                    showResult && selectedAnswer === choice.id
                      ? choice.isCorrect
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-red-100 border-red-500 text-red-800"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {choice.text}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Input/Code */}
        {(task.type === "input" || task.type === "code") && (
          <div className="space-y-3">
            {task.type === "code" ? (
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={task.placeholder}
                disabled={showResult}
                className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm resize-vertical"
                rows={8}
              />
            ) : (
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={task.placeholder}
                disabled={showResult}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        )}

        {/* Hint */}
        {task.hint && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <span className="font-medium">💡 Подсказка:</span> {task.hint}
            </p>
          </div>
        )}

        {/* Submit Button */}
        {!showResult && (
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              disabled={
                (task.type === "choice" && !selectedAnswer) ||
                ((task.type === "input" || task.type === "code") &&
                  !userInput.trim())
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Проверить ответ
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              isCorrect
                ? "bg-green-100 border border-green-500"
                : "bg-red-100 border border-red-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-medium ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrect ? "✅ Правильно!" : "❌ Неправильно"}
                </p>
                {!isCorrect && task.correctAnswer && (
                  <p className="text-red-700 mt-2">
                    <span className="font-medium">Правильный ответ:</span>{" "}
                    {task.correctAnswer}
                  </p>
                )}
                <p
                  className={`text-sm mt-1 ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Получено баллов: {isCorrect ? task.points : 0} из{" "}
                  {task.points}
                </p>
              </div>

              {!isCompleted && (
                <button
                  onClick={resetTask}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Попробовать еще раз
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
