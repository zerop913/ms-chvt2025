"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { heroContent } from "../../constants/heroContent";
import { AnimationState } from "../../types/hero";
import QRCode from "qrcode";

export default function Hero() {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isVisible: false,
    isLoaded: false,
    activeElement: null,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [qrError, setQrError] = useState(false);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const eventDates = "17-21.09.2025";
  const qrUrl = "https://ms-chvt2025.vercel.app";
  const fallbackUrl = "https://github.com/zerop913/ms-chvt2025";

  const generateQR = useCallback(async (retryCount = 0): Promise<void> => {
    if (!isMountedRef.current || !canvasRef.current) {
      return;
    }

    try {
      setQrError(false);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Создаем стандартный черный QR код для лучшего сканирования
      await QRCode.toCanvas(canvas, qrUrl, {
        width: 140,
        margin: 2,
        color: {
          dark: "#0a0a0a", // chvt-black-900 - черные блоки
          light: "#ffffff", // Белый фон
        },
        errorCorrectionLevel: "H",
      });

      if (isMountedRef.current) {
        setQrLoaded(true);
        retryCountRef.current = 0;
      }
    } catch (error) {
      console.error(
        `Error generating QR code (attempt ${retryCount + 1}):`,
        error
      );

      if (retryCount < maxRetries && isMountedRef.current) {
        retryCountRef.current = retryCount + 1;
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        setTimeout(() => generateQR(retryCount + 1), delay);
      } else if (isMountedRef.current) {
        setQrError(true);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    setAnimationState((prev) => ({ ...prev, isLoaded: true }));
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setAnimationState((prev) => ({ ...prev, isVisible: true }));
      }
    }, 300);

    const qrTimer = setTimeout(() => {
      if (isMountedRef.current) {
        generateQR();
      }
    }, 800);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      clearTimeout(qrTimer);
    };
  }, [generateQR]);

  const forceRegenerateQR = useCallback(() => {
    setQrError(false);
    setQrLoaded(false);
    retryCountRef.current = 0;
    generateQR();
  }, [generateQR]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !qrLoaded && !qrError && canvasRef.current) {
        generateQR();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [qrLoaded, qrError, generateQR]);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden font-sans">
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

      <div className="absolute inset-0 pointer-events-none">
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

      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-20">
        <div
          className={`font-mono text-sm transition-all duration-1000 ${
            animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <span className="bg-chvt-black-900 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.label}
              </span>
              <div className="absolute -inset-1 bg-chvt-orange-500/20 rounded-lg blur-sm"></div>
            </div>
            <div className="hidden sm:block w-4 lg:w-8 h-px bg-gradient-to-r from-chvt-orange-500 to-chvt-black-900"></div>
            <div className="relative">
              <span className="bg-chvt-gradient text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.event}
              </span>
              <div className="absolute -inset-1 bg-chvt-orange-500/30 rounded-lg blur-sm animate-glow-orange"></div>
            </div>
            <div className="hidden sm:block w-4 lg:w-8 h-px bg-gradient-to-r from-chvt-black-900 to-chvt-orange-500"></div>
            <div className="relative">
              <span className="bg-chvt-black-900 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                {heroContent.competency.year}
              </span>
              <div className="absolute -inset-1 bg-chvt-black-900/20 rounded-lg blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-20">
        <div
          className={`font-mono text-sm transition-all duration-1000 ${
            animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="relative">
            <span className="bg-chvt-dark text-white px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
              {eventDates}
            </span>
            <div className="absolute -inset-1 bg-chvt-orange-500/20 rounded-lg blur-sm animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 lg:px-8 xl:px-16">
        <div className="max-w-7xl relative">
          <div
            className={`transition-all duration-1500 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl leading-none tracking-wider mb-6 relative font-black">
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-chvt-gradient transform -skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-orange-500/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.main}
                </span>
              </div>
              <br />
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-chvt-dark transform skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-black-900/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.highlight}
                </span>
              </div>
              <br />
              <div className="relative inline-block group cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-chvt-orange-600 to-chvt-orange-500 transform -skew-x-12 rounded-lg shadow-2xl group-hover:shadow-chvt-orange-600/50 transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl block transform group-hover:scale-105 transition-transform duration-300">
                  {heroContent.title.suffix}
                </span>
              </div>
            </h1>
          </div>

          <div
            className={`transition-all duration-1500 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="relative">
              <div className="absolute -left-2 lg:-left-4 top-0 w-1 h-full bg-chvt-gradient rounded-full"></div>
              <p className="font-rajdhani text-base sm:text-lg md:text-xl lg:text-2xl text-chvt-black-800 font-bold max-w-4xl pl-4 lg:pl-8 leading-relaxed tracking-wide uppercase">
                {heroContent.subtitle}
                <span className="animate-pulse ml-2 text-chvt-orange-500 font-bold text-xl lg:text-2xl">
                  █
                </span>
              </p>
            </div>
          </div>

          <div className="absolute -bottom-10 lg:-bottom-20 left-10 lg:left-20 flex space-x-4 opacity-30">
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

      <div className="hidden lg:block absolute bottom-8 right-8 z-20">
        <div
          className={`relative bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm border border-chvt-orange-500/30 rounded-2xl p-5 shadow-2xl transition-all duration-500 group ${
            qrLoaded && animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "2s" }}
        >
          <div className="absolute -inset-3 bg-gradient-to-br from-chvt-orange-500/20 via-chvt-orange-500/10 to-transparent rounded-3xl blur-xl animate-pulse" />

          <div className="relative">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-3 border-l-3 border-chvt-orange-500 rounded-tl-lg" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-3 border-r-3 border-chvt-orange-500 rounded-tr-lg" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-3 border-l-3 border-chvt-orange-500 rounded-bl-lg" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-3 border-r-3 border-chvt-orange-500 rounded-br-lg" />

            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-chvt-orange-500/20 rounded-b-lg" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-chvt-orange-500/20 rounded-t-lg" />
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-chvt-orange-500/20 rounded-r-lg" />
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-chvt-orange-500/20 rounded-l-lg" />

            <div className="bg-white p-4 rounded-xl shadow-inner border-2 border-chvt-orange-500/30 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>

              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-chvt-orange-500/60 to-transparent animate-scan" />

              <canvas
                ref={canvasRef}
                className={`transition-all duration-500 relative z-10 mx-auto block ${
                  qrLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ width: "140px", height: "140px" }}
              />

              {!qrLoaded && !qrError && (
                <div className="absolute inset-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-chvt-orange-500/20" />
                    <div
                      className="animate-spin rounded-full h-8 w-8 border-t-2 border-chvt-orange-500 absolute top-0 left-0"
                      style={{ animationDirection: "reverse" }}
                    />
                  </div>
                  <p className="text-xs text-chvt-black-600 mt-2 font-mono">
                    Генерация...
                  </p>
                </div>
              )}

              {qrError && (
                <div className="absolute inset-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-red-600 text-center font-mono">
                    Ошибка загрузки
                  </p>
                  <button
                    onClick={forceRegenerateQR}
                    className="mt-2 px-3 py-1 bg-chvt-orange-500 text-white text-xs rounded-md hover:bg-chvt-orange-600 transition-colors font-mono"
                  >
                    Повторить
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center space-y-3 relative z-10">
            <div className="bg-chvt-black-900/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-chvt-orange-500/20">
              <p className="text-xs text-chvt-black-700 font-mono font-medium">
                {qrUrl.replace("https://", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
