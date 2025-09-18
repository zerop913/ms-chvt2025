"use client";

import { useState, useEffect } from "react";
import { heroContent } from "../constants/heroContent";
import { AnimationState } from "../types/hero";

export default function Hero() {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isVisible: false,
    isLoaded: false,
    activeElement: null,
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setAnimationState((prev) => ({ ...prev, isLoaded: true }));
    const timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, isVisible: true }));
    }, 300);

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ru-RU", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden font-sans">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-chvt-orange-500/10 via-transparent to-chvt-orange-500/5" />
      </div>

      {/* Chevron Pattern Background */}
      <div className="absolute right-0 top-0 w-2/3 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex space-x-4 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-24 h-48 bg-gradient-to-b from-chvt-orange-500/40 to-chvt-orange-600/60 transform skew-x-12 rotate-12 animate-pulse"
              style={{
                clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0 100%)",
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated Geometric Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Enhanced Dynamic Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-orange-500/40 to-transparent animate-pulse" />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-black-900/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-orange-500/20 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <div
          className={`font-mono text-sm transition-all duration-1000 ${
            animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <span className="bg-chvt-black-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.label}
              </span>
              <div className="absolute -inset-1 bg-chvt-orange-500/20 rounded-lg blur-sm"></div>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-chvt-orange-500 to-chvt-black-900"></div>
            <div className="relative">
              <span className="bg-chvt-gradient text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.event}
              </span>
              <div className="absolute -inset-1 bg-chvt-orange-500/30 rounded-lg blur-sm animate-glow-orange"></div>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-chvt-black-900 to-chvt-orange-500"></div>
            <div className="relative">
              <span className="bg-chvt-black-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.year}
              </span>
              <div className="absolute -inset-1 bg-chvt-black-900/20 rounded-lg blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Display */}
      <div className="absolute top-8 right-8 z-20">
        <div
          className={`font-mono text-sm transition-all duration-1000 ${
            animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="relative">
            <span className="bg-chvt-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
              {currentTime}
            </span>
            <div className="absolute -inset-1 bg-chvt-orange-500/20 rounded-lg blur-sm animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 lg:px-16">
        {/* Title with Background Plates */}
        <div className="max-w-7xl relative">
          <div
            className={`transition-all duration-1500 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <h1 className="font-orbitron text-7xl lg:text-9xl leading-none tracking-wider mb-6 relative font-black">
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-chvt-gradient transform -skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-orange-500/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-8 py-4 font-black text-6xl lg:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.main}
                </span>
              </div>
              <br />
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-chvt-dark transform skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-black-900/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-8 py-4 font-black text-6xl lg:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.highlight}
                </span>
              </div>
              <br />
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-chvt-orange-600 to-chvt-orange-500 transform -skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-orange-600/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-8 py-4 font-black text-6xl lg:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.suffix}
                </span>
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`transition-all duration-1500 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-chvt-gradient rounded-full"></div>
              <p className="font-rajdhani text-xl lg:text-2xl text-chvt-black-800 font-bold max-w-4xl pl-8 leading-relaxed tracking-wide uppercase">
                {heroContent.subtitle}
                <span className="animate-pulse ml-2 text-chvt-orange-500 font-bold text-2xl">
                  █
                </span>
              </p>
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute -bottom-20 left-20 flex space-x-4 opacity-30">
            <div className="w-3 h-3 bg-chvt-orange-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-chvt-black-900 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-chvt-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
