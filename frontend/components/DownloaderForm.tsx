"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";
import { Translation } from "@/locales/dictionary";

interface DownloaderFormProps {
  t: Translation;
}

export default function DownloaderForm({ t }: DownloaderFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {}
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(
        `${apiUrl}/api/info?url=${encodeURIComponent(url)}`,
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Analysis error");
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartDownload = async (
    videoUrl: string,
    formatId: string,
    ext: string,
  ): Promise<string | null> => {
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const startUrl = `${apiUrl}/api/download/start?url=${encodeURIComponent(
        videoUrl,
      )}&format_id=${encodeURIComponent(formatId)}&ext=${ext}`;

      const res = await fetch(startUrl);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Impossible de démarrer.");
      }
      const respData = await res.json();
      return respData.task_id;
    } catch (err: any) {
      setError(err.message || "Erreur serveur.");
      return null;
    }
  };

  return (
    <>
      <form
        onSubmit={handleAnalyze}
        role="search"
        aria-label="YouTube Downloader"
        className="w-full max-w-2xl flex flex-col sm:flex-row gap-2 mb-8"
      >
        <div className="relative flex-1">
          <input
            type="text"
            id="youtube_url"
            name="youtube_url"
            aria-label={t.inputPlaceholder}
            placeholder={t.inputPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-zinc-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition text-sm sm:text-base pr-20 shadow-sm"
          />
          <button
            type="button"
            onClick={handlePaste}
            aria-label={t.pasteBtn}
            className={`absolute top-1/2 -translate-y-1/2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 transition cursor-pointer ${
              t.dir === "rtl" ? "left-2" : "right-2"
            }`}
          >
            {t.pasteBtn}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? t.analyzing : t.downloadBtn}
        </button>
      </form>

      {error && (
        <div className="w-full max-w-2xl bg-red-950/60 border border-red-700 text-red-200 px-4 py-3 rounded-xl text-sm mb-8 text-center shadow-lg">
          ⚠️ {error}
        </div>
      )}

      {data && (
        <ResultCard data={data} t={t} onTriggerDownload={handleStartDownload} />
      )}
    </>
  );
}
