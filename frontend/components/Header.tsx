"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  // Mode clair par défaut
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLanguageChange = (newLang: string) => {
    // Conserver la route courante lors du changement de langue (ex: /fr/youtube-to-mp3 -> /en/youtube-to-mp3)
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 1) {
      segments[0] = newLang;
      router.push(`/${segments.join("/")}`);
    } else {
      router.push(`/${newLang}`);
    }
  };

  return (
    <header className="border-b border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="bg-red-600 text-white font-black text-xl px-2.5 py-1 rounded-lg tracking-wider shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform">
            YT
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Save<span className="text-red-600">X</span>
          </span>
        </Link>

        {/* Actions : Thème + Langue */}
        <div className="flex items-center gap-3">
          {/* Bouton Thème Light / Dark */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
          >
            {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
          </button>

          {/* Sélecteur de Langue */}
          <select
            aria-label="Select Language"
            value={lang}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer transition"
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="es">🇪🇸 Español</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>

          <span className="hidden sm:inline-block bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50 px-3 py-1 rounded-full text-xs font-bold">
            v1.1
          </span>
        </div>
      </div>
    </header>
  );
}
