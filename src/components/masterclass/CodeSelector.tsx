import React, { useState, useEffect, useRef } from "react";
import { BlankOption } from "@/types/masterclass-new";
import { ChevronDown } from "lucide-react";

interface CodeSelectorProps {
  blank: BlankOption;
  value: string;
  onChange: (blankId: string, value: string) => void;
  disabled?: boolean;
  isCorrect?: boolean;
}

export const CodeSelector: React.FC<CodeSelectorProps> = ({
  blank,
  value,
  onChange,
  disabled = false,
  isCorrect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number>(120);
  const [maxWidth, setMaxWidth] = useState<number>(300);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (typeof window !== "undefined") {
        setMaxWidth(window.innerWidth - 40);
      }
    };

    updateMaxWidth();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateMaxWidth);
      return () => window.removeEventListener("resize", updateMaxWidth);
    }
  }, []);

  useEffect(() => {
    if (blank.options && blank.options.length > 0) {
      const maxLength = Math.max(
        ...blank.options.map((option) => option.length),
        value?.length || 0,
        blank.id.length + 2
      );

      const calculatedWidth = Math.max(120, maxLength * 8 + 60);
      setDropdownWidth(calculatedWidth);
    }
  }, [blank.options, value, blank.id]);

  const getButtonStyle = () => {
    if (disabled) {
      return "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300 text-gray-600";
    }

    if (isCorrect === true) {
      return "bg-green-50 border-2 border-green-500 text-green-800 shadow-sm";
    } else if (isCorrect === false) {
      return "bg-red-50 border-2 border-red-500 text-red-800 shadow-sm";
    } else if (value) {
      return "bg-gray-50 border-2 border-gray-400 text-gray-800 hover:border-gray-500";
    }

    return "bg-white border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50";
  };

  const getDropdownStyle = () => {
    return {
      minWidth: `${dropdownWidth}px`,
      width: "max-content",
    };
  };

  return (
    <div className="inline-block relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          minWidth: `${Math.min(dropdownWidth, maxWidth)}px`,
        }}
        className={`
          inline-flex items-center justify-between px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm font-mono
          rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
          ${getButtonStyle()}
        `}
      >
        <span className="truncate mr-1 lg:mr-2">
          {value || `[${blank.id}]`}
        </span>
        <ChevronDown
          className={`w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 bg-white border-2 border-gray-300 rounded-md shadow-lg max-w-xs"
            style={{
              ...getDropdownStyle(),
              maxWidth: `${maxWidth}px`,
            }}
          >
            <div className="py-1 max-h-48 lg:max-h-60 overflow-y-auto">
              {blank.options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(blank.id, option);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-mono transition-colors
                    border-b border-gray-100 last:border-b-0 block
                    ${
                      value === option
                        ? "bg-orange-100 text-orange-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <div className="break-words whitespace-pre-wrap">
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
