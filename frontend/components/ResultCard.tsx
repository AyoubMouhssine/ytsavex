"use client";

import { useState, useEffect } from "react";
import { Translation } from "@/locales/dictionary";

interface ResultCardProps {
  data: any;
  t: Translation;
  onTriggerDownload: (
    url: string,
    formatId: string,
    ext: string,
  ) => Promise<string | null>;
}

export default function ResultCard({
  data,
  t,
  onTriggerDownload,
}: ResultCardProps) {
  const [selectedFormat, setSelectedFormat] = useState(
    data.formats && data.formats.length > 0 ? data.formats[0] : null,
  );

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const [speed, setSpeed] = useState<string>("");
  const [eta, setEta] = useState<string>("");
  const [statusText, setStatusText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Polling cadencé à 1000ms (optimisé pour la charge serveur)
  useEffect(() => {
    if (!activeTaskId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/download/progress/${activeTaskId}`,
        );
        if (!res.ok) return;

        const pData = await res.json();
        if (pData.percent !== undefined) setPercent(pData.percent);
        if (pData.speed) setSpeed(pData.speed);
        if (pData.eta) setEta(pData.eta);

        if (pData.status === "starting") {
          setStatusText(t.progressStep1);
        } else if (pData.status === "downloading") {
          setStatusText(t.progressStep2);
        } else if (pData.status === "converting") {
          setStatusText(t.progressStep3);
        } else if (pData.status === "ready") {
          setStatusText(t.progressDone);
          clearInterval(interval);
          // Redirection vers le stream du fichier
          setTimeout(() => {
            window.location.href = `${apiUrl}/api/download/file/${activeTaskId}`;
            setIsProcessing(false);
            setActiveTaskId(null);
          }, 800);
        } else if (pData.status === "error") {
          setStatusText(`Erreur : ${pData.error || "Échec du traitement"}`);
          clearInterval(interval);
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 1000); // <-- 1000 ms au lieu de 400 ms

    return () => clearInterval(interval);
  }, [activeTaskId, t, apiUrl]);

  // // Quand le fichier est prêt et commence à se télécharger
  // setTimeout(() => {
  //   window.location.href = `${apiUrl}/api/download/file/${activeTaskId}`;

  //   // OPTIONNEL EN PRODUCTION :
  //   // Déclencher le popunder Monetag / OnClick ici si activé
  //   // if (typeof window !== 'undefined' && (window as any).triggerAd) {
  //   //    (window as any).triggerAd();
  //   // }

  //   setIsProcessing(false);
  //   setActiveTaskId(null);
  // }, 800);

  const handleStart = async (
    videoUrl: string,
    formatId: string,
    ext: string,
  ) => {
    setIsProcessing(true);
    setPercent(5);
    setStatusText(t.progressStep1);

    const taskId = await onTriggerDownload(videoUrl, formatId, ext);
    if (taskId) {
      setActiveTaskId(taskId);
    } else {
      setIsProcessing(false);
    }
  };

  // 1. Cas Vidéo Unique
  if (data.type === "video") {
    return (
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          {data.thumbnail && (
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full sm:w-48 h-28 object-cover rounded-xl border border-zinc-800 shadow"
            />
          )}
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg line-clamp-2">
              {data.title}
            </h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 dark:text-zinc-400">
              <span>👤 {data.channel}</span>
              <span>⏱️ {data.duration}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row gap-3 items-center">
          <select
            aria-label="Format selection"
            disabled={isProcessing}
            className="w-full sm:w-auto flex-1 bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 cursor-pointer disabled:opacity-50"
            value={selectedFormat ? selectedFormat.id : ""}
            onChange={(e) => {
              const f = data.formats.find(
                (item: any) => item.id === e.target.value,
              );
              setSelectedFormat(f);
            }}
          >
            {data.formats.map((f: any) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() =>
              handleStart(
                `https://www.youtube.com/watch?v=${data.id}`,
                selectedFormat?.id || "best",
                selectedFormat?.ext || "mp4",
              )
            }
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer disabled:cursor-not-allowed"
          >
            {isProcessing ? "Traitement..." : t.saveBtn}
          </button>
        </div>

        {/* Barre de progression avec transition CSS fluide */}
        {isProcessing && (
          <div className="w-full mt-5 pt-5 border-t border-slate-200 dark:border-zinc-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                <span className="inline-block animate-spin text-red-500">
                  ⚡
                </span>
                {statusText}
              </span>
              <span className="font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/50 px-2 py-0.5 rounded">
                {percent}%
              </span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-zinc-700/50 p-0.5">
              <div
                className="bg-gradient-to-r from-red-600 via-amber-500 to-red-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>

            {speed && (
              <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-zinc-500 font-mono">
                <span>Vitesse : {speed}</span>
                <span>Restant : {eta}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 2. Cas Playlist
  if (data.type === "playlist") {
    return (
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl mb-12">
        <div className="border-b border-slate-200 dark:border-zinc-800 pb-4 mb-4">
          <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
            {t.playlistDetected}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-xl">
            {data.title}
          </h3>
          <p className="text-slate-600 dark:text-zinc-400 text-sm">
            {data.item_count} {t.videosFound}
          </p>
        </div>

        {isProcessing && (
          <div className="mb-4 p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 dark:text-zinc-300">
                {statusText}
              </span>
              <span className="font-bold text-red-600 dark:text-red-400">
                {percent}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-red-600 h-full transition-all duration-700 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {data.videos.map((vid: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-zinc-950 p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-slate-500 dark:text-zinc-400 text-xs font-mono">
                  {idx + 1}
                </span>
                <span className="text-sm text-slate-800 dark:text-zinc-200 truncate">
                  {vid.title}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleStart(vid.url, "best", "mp4")}
                  className="bg-slate-200 dark:bg-zinc-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 text-xs text-slate-800 dark:text-white px-2.5 py-1.5 rounded-lg transition"
                >
                  MP4
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleStart(vid.url, "bestaudio/best", "mp3")}
                  className="bg-slate-200 dark:bg-zinc-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 text-xs text-slate-800 dark:text-white px-2.5 py-1.5 rounded-lg transition"
                >
                  MP3
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
