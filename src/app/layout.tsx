import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Outfit,
  Orbitron,
  Space_Grotesk,
  Rajdhani,
} from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ЧВТ 2025 - Мастер-класс по HTTP-сервисам в 1С",
  description:
    "Мастер-класс по разработке HTTP-сервисов в 1С. Изучите создание RESTful API и интеграцию с внешними системами.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${rajdhani.variable} font-sans antialiased bg-gray-50 text-black`}
      >
        {children}
      </body>
    </html>
  );
}
