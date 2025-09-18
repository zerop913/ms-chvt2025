"use client";

import { useState } from "react";
import { MasterClassStep, Task } from "@/types/masterclass-new";
import { TaskComponent } from "../common/TaskComponent";
import {
  Target,
  Star,
  Lightbulb,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

interface StepProps {
  step: MasterClassStep;
  onComplete: (score: number) => void;
}

export function Step({ step, onComplete }: StepProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [taskScores, setTaskScores] = useState<Map<string, number>>(new Map());
  const [showHints, setShowHints] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleTaskComplete = (
    taskId: string,
    isCorrect: boolean,
    points: number
  ) => {
    const newCompletedTasks = new Set(completedTasks);
    newCompletedTasks.add(taskId);
    setCompletedTasks(newCompletedTasks);

    const newTaskScores = new Map(taskScores);
    newTaskScores.set(taskId, isCorrect ? points : 0);
    setTaskScores(newTaskScores);

    const totalScore = Array.from(newTaskScores.values()).reduce(
      (sum, score) => sum + score,
      0
    );
    onComplete(totalScore);
  };

  const totalPossibleScore =
    step.tasks.reduce((sum: number, task: Task) => sum + task.points, 0) +
    (step.bonusTask ? step.bonusTask.points : 0);
  const currentTotalScore = Array.from(taskScores.values()).reduce(
    (sum, score) => sum + score,
    0
  );
  const progressPercentage =
    totalPossibleScore > 0 ? (currentTotalScore / totalPossibleScore) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Шаг {step.id}: {step.title}
          </h2>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            {currentTotalScore}/{totalPossibleScore} баллов
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-4">{step.description}</p>

        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📚 Теоретическая часть
        </h3>
        <ul className="bg-blue-50 p-4 rounded-lg space-y-2">
          {step.theory.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {step.codeExample && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💻 Пример кода
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{step.codeExample.code}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Практические задания
        </h3>
        <div className="space-y-6">
          {step.tasks.map((task: Task, index: number) => (
            <TaskComponent
              key={task.id}
              task={task}
              taskIndex={index + 1}
              onComplete={(isCorrect) =>
                handleTaskComplete(task.id, isCorrect, task.points)
              }
              isCompleted={completedTasks.has(task.id)}
            />
          ))}
        </div>
      </div>

      {step.bonusTask && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
            <Star className="w-6 h-6 mr-2" />
            Бонусное задание
          </h3>
          <TaskComponent
            task={step.bonusTask}
            taskIndex={0}
            onComplete={(isCorrect) =>
              handleTaskComplete(
                step.bonusTask!.id,
                isCorrect,
                step.bonusTask!.points
              )
            }
            isCompleted={completedTasks.has(step.bonusTask.id)}
            isBonus={true}
          />
        </div>
      )}

      <div className="border-t pt-8">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
          >
            {showHints ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Скрыть подсказки
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 mr-2" />
                Показать подсказки
              </>
            )}
          </button>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
          >
            {showAnswers ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Скрыть ответы
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Показать ответы
              </>
            )}
          </button>
        </div>

        {showHints && (
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-yellow-800 mb-2">
              💡 Подсказки:
            </h4>
            <ul className="space-y-1">
              {step.hints.map((hint, index) => (
                <li key={index} className="text-yellow-700">
                  <span className="font-medium">Подсказка {index + 1}:</span>{" "}
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showAnswers && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">✅ Ответы:</h4>
            <ol className="space-y-1">
              {step.answers.map((answer, index) => (
                <li key={index} className="text-red-700">
                  <span className="font-medium">{index + 1}.</span> {answer}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step;
