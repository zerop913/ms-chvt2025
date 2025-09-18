"use client";

import { useState, useEffect } from "react";
import { Expert } from "../types/masterclass";

interface ExpertCardProps {
  expert: Expert;
  isActive: boolean;
  onHover: (expertId: string | null) => void;
  delay: number;
}

export default function ExpertCard({
  expert,
  isActive,
  onHover,
  delay,
}: ExpertCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => onHover(expert.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* ЧВТ Style Expert Card */}
      <div
        className={`h-64 bg-gradient-to-br from-chvt-black-900 to-chvt-black-800 rounded-lg transition-all duration-300 hover:shadow-xl overflow-hidden ${
          isActive
            ? "shadow-xl shadow-chvt-orange-500/30 ring-2 ring-chvt-orange-500/50"
            : "hover:shadow-chvt-orange-500/20"
        }`}
      >
        {/* Orange Accent Line - Inside the card */}
        <div
          className={`h-1 bg-chvt-gradient transition-all duration-500 ${
            isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          }`}
        ></div>

        {/* Chevron Pattern Background */}
        <div className="absolute inset-0 top-1 opacity-10">
          <div
            className="w-full h-full bg-gradient-to-r from-chvt-orange-500 to-chvt-orange-600"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
            }}
          ></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 h-full p-6 pt-5 flex flex-col">
          {/* Role Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2">
              <div className="w-2 h-2 bg-chvt-orange-500 rounded-full"></div>
              <span className="text-chvt-orange-400 text-sm font-mono font-bold uppercase tracking-wider">
                {expert.role}
              </span>
            </div>
          </div>
          {/* Expert Name */}
          <div className="mb-4">
            <h3
              className={`font-orbitron text-xl font-bold leading-tight transition-colors duration-300 ${
                isActive ? "text-white" : "text-gray-200 group-hover:text-white"
              }`}
            >
              {expert.name}
            </h3>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>
          {/* Bottom Tech Element */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-6 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-chvt-orange-500"
                      : "bg-gray-600 group-hover:bg-chvt-orange-500"
                  }`}
                ></div>
              ))}
            </div>

            {isActive && (
              <span className="text-chvt-orange-400 text-xs font-mono uppercase tracking-wider">
                АКТИВЕН
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
