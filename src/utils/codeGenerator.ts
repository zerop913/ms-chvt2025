import { masterClassSteps } from "@/data/masterclass/steps";

export interface CodeGenerationResult {
  fullCode: string;
  functions: string[];
  summary: {
    totalLines: number;
    functionCount: number;
    completedSteps: number;
  };
}

export function generateFinalCode(
  userAnswers: Record<string, any>
): CodeGenerationResult {
  const functions: string[] = [];
  let completedSteps = 0;

  // Генерируем код для каждого шага
  masterClassSteps.forEach((step, stepIndex) => {
    if (step.id === "final-code") return; // Пропускаем финальный шаг

    let functionCode = step.codeTemplate;
    let stepCompleted = true;

    // Заменяем плейсхолдеры на реальные значения
    step.interactiveFields.forEach((field) => {
      const userValue = userAnswers[`${stepIndex}_${field.id}`];
      const placeholder = `[${field.id}]`;

      if (functionCode.includes(placeholder)) {
        if (userValue) {
          functionCode = functionCode.replace(
            new RegExp(`\\[${field.id}\\]`, "g"),
            userValue
          );
        } else {
          stepCompleted = false;
          functionCode = functionCode.replace(
            new RegExp(`\\[${field.id}\\]`, "g"),
            `/* ЗАПОЛНИТЕ: ${field.label || field.id} */`
          );
        }
      }
    });

    if (stepCompleted) {
      completedSteps++;
    }

    functions.push(
      `// ==========================================\n// ${step.title}\n// ==========================================\n\n${functionCode}\n`
    );
  });

  // Собираем полный код
  const header = `// ==========================================
// Модуль API для работы с категориями и товарами
// Создан с помощью интерактивного мастер-класса CHVT
// Дата создания: ${new Date().toLocaleDateString("ru-RU")}
// ==========================================

`;

  const fullCode = header + functions.join("\n");

  const totalLines = fullCode.split("\n").length;

  return {
    fullCode,
    functions,
    summary: {
      totalLines,
      functionCount: functions.length,
      completedSteps,
    },
  };
}

export function downloadCode(code: string, filename: string = "api_module") {
  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.bsl`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => resolve(true),
        () => resolve(false)
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        resolve(successful);
      } catch (err) {
        document.body.removeChild(textArea);
        resolve(false);
      }
    }
  });
}
