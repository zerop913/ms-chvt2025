import React, { useState, useEffect } from "react";
import { MasterclassCodeStep } from "@/types/masterclass-new";
import { CodeSelector } from "./CodeSelector";
import { Copy, Code, Wand2 } from "lucide-react";

interface InteractiveCodeDisplayProps {
  step: MasterclassCodeStep;
  answers: Record<string, string>;
  onAnswerChange: (blankId: string, value: string) => void;
  readonly?: boolean;
  onShowSolution?: () => void;
  onHideSolution?: () => void;
  showingSolution?: boolean;
  onAutoFill?: () => void;
}

export const InteractiveCodeDisplay: React.FC<InteractiveCodeDisplayProps> = ({
  step,
  answers,
  onAnswerChange,
  readonly = false,
  onShowSolution,
  onHideSolution,
  showingSolution = false,
  onAutoFill,
}) => {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const formatBSLCode = (code: string): string[] => {
    const lines = code.split("\n");
    const formatted: string[] = [];
    let indentLevel = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        formatted.push("");
        continue;
      }

      if (
        trimmedLine.match(
          /^(КонецЕсли|КонецЦикла|КонецФункции|КонецПроцедуры|КонецПопытки|Исключение)$/i
        )
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentedLine = "    ".repeat(indentLevel) + trimmedLine;
      formatted.push(indentedLine);

      if (
        trimmedLine.match(
          /^(Функция|Процедура|Если|Иначе|ИначеЕсли|Пока|Для|Попытка)\s/i
        ) ||
        trimmedLine.match(/\s(Тогда|Цикл|Попытка)$/i)
      ) {
        indentLevel++;
      }

      if (trimmedLine.match(/^Исключение$/i)) {
        indentLevel++;
      }
    }

    return formatted;
  };

  const getCompleteFormattedCode = () => {
    return formatBSLCode(step.completeCode).join("\n");
  };

  const getCurrentFormattedCode = () => {
    let code = step.codeWithGaps;
    step.blanks.forEach((blank) => {
      const userAnswer = answers[blank.id] || `[${blank.id}]`;
      code = code.replace(new RegExp(`___${blank.id}___`, "g"), userAnswer);
    });
    return formatBSLCode(code).join("\n");
  };

  const renderInteractiveCode = () => {
    if (showingSolution) {
      const formattedLines = formatBSLCode(step.completeCode);
      return (
        <div className="space-y-1">
          {formattedLines.map((line, index) => (
            <div
              key={index}
              className="font-mono text-xs lg:text-sm leading-relaxed text-gray-800"
              style={{ whiteSpace: "pre" }}
            >
              {line || "\u00A0"}
            </div>
          ))}
        </div>
      );
    }

    const codeLines = step.codeWithGaps.split("\n");

    return (
      <div className="space-y-1">
        {codeLines.map((line, lineIndex) => {
          const indentMatch = line.match(/^(\s*)/);
          const leadingSpaces = indentMatch ? indentMatch[1] : "";
          let processedLine: string | React.ReactElement = line;

          let hasBlank = false;
          const lineElements: (string | React.ReactElement)[] = [];
          let currentText = line;

          step.blanks.forEach((blank) => {
            const blankPattern = `___${blank.id}___`;
            if (currentText.includes(blankPattern)) {
              hasBlank = true;
              const beforeBlank = currentText.substring(
                0,
                currentText.indexOf(blankPattern)
              );
              const afterBlank = currentText.substring(
                currentText.indexOf(blankPattern) + blankPattern.length
              );

              const userAnswer = answers[blank.id];
              const isCorrect = userAnswer
                ? userAnswer === blank.correctAnswer
                : undefined;

              lineElements.push(beforeBlank);
              lineElements.push(
                <CodeSelector
                  key={blank.id}
                  blank={blank}
                  value={userAnswer || ""}
                  onChange={onAnswerChange}
                  disabled={readonly}
                  isCorrect={isCorrect}
                />
              );
              currentText = afterBlank;
            }
          });

          if (hasBlank) {
            lineElements.push(currentText);
            processedLine = <span key={lineIndex}>{lineElements}</span>;
          }

          return (
            <div
              key={lineIndex}
              className="font-mono text-xs lg:text-sm leading-relaxed text-gray-800"
              style={{ whiteSpace: "pre" }}
            >
              {typeof processedLine === "string"
                ? leadingSpaces + processedLine.trim() || "\u00A0"
                : processedLine}
            </div>
          );
        })}
      </div>
    );
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess("Скопировано!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error("Ошибка копирования:", err);
      setCopySuccess("Ошибка копирования");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const allAnswersCorrect = step.blanks.every((blank) => {
    const userAnswer = answers[blank.id];
    return userAnswer === blank.correctAnswer;
  });

  const allAnswered = step.blanks.every((blank) => answers[blank.id]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h3 className="text-base lg:text-lg font-semibold text-black flex items-center">
          <Code className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
          Код 1С
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {showingSolution && onHideSolution ? (
            <button
              onClick={onHideSolution}
              className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
            >
              <span className="hidden sm:inline">Вернуться в редактор</span>
              <span className="sm:hidden">Редактор</span>
            </button>
          ) : (
            <>
              {onAutoFill && !allAnswersCorrect && (
                <button
                  onClick={onAutoFill}
                  className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-700 transition-colors text-sm"
                >
                  <Wand2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Автозаполнение</span>
                  <span className="sm:hidden">Авто</span>
                </button>
              )}

              {onShowSolution && (
                <button
                  onClick={onShowSolution}
                  className="px-2 lg:px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  <span className="hidden sm:inline">Показать решение</span>
                  <span className="sm:hidden">Решение</span>
                </button>
              )}
            </>
          )}

          <button
            onClick={() => copyToClipboard(getCompleteFormattedCode())}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
          >
            <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Копировать готовый код</span>
            <span className="sm:hidden">Копировать</span>
          </button>
        </div>
      </div>

      <div
        className="bg-white border-2 border-black rounded-lg p-3 lg:p-6 font-mono text-xs lg:text-sm overflow-x-auto"
        style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
      >
        {renderInteractiveCode()}
      </div>

      {!showingSolution && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <span className="text-gray-600 text-xs lg:text-sm">
              Заполнено: {Object.keys(answers).length} из {step.blanks.length}
            </span>
            {allAnswered && (
              <span
                className={`px-2 py-1 rounded text-xs font-medium inline-block ${
                  allAnswersCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {allAnswersCorrect ? "Все правильно!" : "Есть ошибки"}
              </span>
            )}
          </div>

          {allAnswersCorrect && (
            <button
              onClick={() => copyToClipboard(getCompleteFormattedCode())}
              className="flex items-center space-x-1 lg:space-x-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Скопировать функцию</span>
              <span className="sm:hidden">Копировать</span>
            </button>
          )}
        </div>
      )}

      {copySuccess && (
        <div className="fixed top-4 right-4 bg-black text-white px-3 lg:px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
          {copySuccess}
        </div>
      )}
    </div>
  );
};
