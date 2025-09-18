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
  _userAnswers: Record<string, string | number | boolean>
): CodeGenerationResult {
  // Заглушка для генератора кода
  // TODO: Реализовать генерацию кода на основе текущей структуры данных
  
  const header = `// ==========================================
// Модуль API для работы с категориями и товарами
// Создан с помощью интерактивного мастер-класса CHVT
// Дата создания: ${new Date().toLocaleDateString("ru-RU")}
// ==========================================

// Код будет сгенерирован на основе ваших ответов
`;

  return {
    fullCode: header,
    functions: [],
    summary: {
      totalLines: header.split("\n").length,
      functionCount: 0,
      completedSteps: 0,
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
      } catch {
        document.body.removeChild(textArea);
        resolve(false);
      }
    }
  });
}
