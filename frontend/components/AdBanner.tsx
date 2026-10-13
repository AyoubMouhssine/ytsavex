"use client";

import { useEffect, useState, useRef } from "react";

interface AdBannerProps {
  slotId: "top" | "mid";
  format?: "horizontal" | "rectangle";
  className?: string;
}

export default function AdBanner({
  slotId,
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const [adHtml, setAdHtml] = useState<string | null>(null);
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch(`${apiUrl}/api/config/public`);
        if (!res.ok) return;
        const config = await res.json();

        setAdsEnabled(config.ads_enabled);
        if (slotId === "top") {
          setAdHtml(config.ad_top_banner || null);
        } else if (slotId === "mid") {
          setAdHtml(config.ad_mid_banner || null);
        }
      } catch {
        // En cas d'erreur réseau, on ne bloque rien
      }
    }
    loadConfig();
  }, [slotId, apiUrl]);

  // Si désactivé dans l'admin, on ne prend aucune place
  if (!adsEnabled) return null;

  const formatClasses =
    format === "horizontal"
      ? "w-full max-w-3xl min-h-[90px] sm:h-[90px]"
      : "w-[300px] sm:w-[336px] min-h-[250px] sm:h-[280px]";

  return (
    <div
      className={`my-8 flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-[10px] tracking-widest uppercase text-slate-400 dark:text-zinc-500 mb-1 select-none font-mono">
        Advertisement
      </span>

      <div
        ref={containerRef}
        className={`${formatClasses} bg-slate-100/80 dark:bg-zinc-900/40 border border-dashed border-slate-300 dark:border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden transition-colors`}
      >
        {adHtml ? (
          // Injection directe du code défini dans l'admin
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: adHtml }}
          />
        ) : (
          // Espace réservé élégant en attendant que tu colles une pub
          <div className="text-center p-3 text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
            Espace Publicitaire (
            {slotId === "top" ? "Bannière Haute" : "Bannière Milieu"})
          </div>
        )}
      </div>
    </div>
  );
}
