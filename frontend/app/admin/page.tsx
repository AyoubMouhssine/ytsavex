"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "stats" | "ads" | "youtube" | "dmca"
  >("stats");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Données
  const [stats, setStats] = useState<any>(null);
  const [settings, setSettings] = useState<Record<string, string>>({
    ads_enabled: "true",
    ad_top_banner: "",
    ad_mid_banner: "",
    ad_popunder: "",
    ga_tracking_id: "",
    blacklisted_urls: "",
  });
  const [cookiesContent, setCookiesContent] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Vérifier si la clé est déjà en mémoire locale
  useEffect(() => {
    const savedKey = localStorage.getItem("ytsavex_admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
      testAuth(savedKey);
    }
  }, []);

  const testAuth = async (key: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: { "X-Admin-Key": key },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("ytsavex_admin_key", key);
        loadAllData(key);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    testAuth(adminKey);
  };

  const loadAllData = async (key: string) => {
    try {
      // 1. Stats
      const statsRes = await fetch(`${apiUrl}/api/admin/stats`, {
        headers: { "X-Admin-Key": key },
      });
      if (statsRes.ok) setStats(await statsRes.json());

      // 2. Settings & Cookies
      const setRes = await fetch(`${apiUrl}/api/admin/settings`, {
        headers: { "X-Admin-Key": key },
      });
      if (setRes.ok) {
        const data = await setRes.json();
        setSettings((prev) => ({ ...prev, ...data.settings }));
        setCookiesContent(data.cookies_content || "");
      }
    } catch (e) {
      console.error("Erreur de chargement", e);
    }
  };

  const handleSaveSettings = async () => {
    setMessage(null);
    try {
      const res = await fetch(`${apiUrl}/api/admin/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": adminKey,
        },
        body: JSON.stringify({
          settings: settings,
          cookies_content: cookiesContent,
        }),
      });

      if (res.ok) {
        setMessage({
          text: "✅ Configuration enregistrée avec succès !",
          type: "success",
        });
        loadAllData(adminKey);
      } else {
        setMessage({ text: "❌ Erreur lors de la sauvegarde.", type: "error" });
      }
    } catch {
      setMessage({
        text: "❌ Impossible de joindre le serveur.",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ytsavex_admin_key");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  // 1. Écran de Connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="bg-red-600 text-white font-black text-xl px-2.5 py-1 rounded-lg">
              YT
            </span>
            <h1 className="text-2xl font-bold tracking-tight mt-3">
              Administration YTSaveX
            </h1>
            <p className="text-xs text-zinc-400">
              Entrez votre clé secrète d&apos;accès
            </p>
          </div>

          <input
            type="password"
            placeholder="Clé secrète (ex: admin123456)"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 font-semibold py-3 rounded-xl transition cursor-pointer text-sm"
          >
            Se Connecter
          </button>
        </form>
      </div>
    );
  }

  // 2. Dashboard Complet
  return (
    <div className="min-h-screen bg-slate-950 text-zinc-100 flex flex-col font-sans">
      {/* Barre de navigation haute */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded">
            YT
          </span>
          <span className="font-bold text-lg">SaveX Control Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/en"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white transition"
          >
            ↗ Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-lg text-red-400 transition"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-6">
        {/* Onglets */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: "stats", label: "📊 Statistiques en direct" },
            { id: "ads", label: "📢 Gestionnaire Publicités" },
            { id: "youtube", label: "🛡️ YouTube & Cookies" },
            { id: "dmca", label: "⚖️ SEO & Liste Noire DMCA" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message d'état */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-medium ${
              message.type === "success"
                ? "bg-emerald-950/60 border border-emerald-700 text-emerald-300"
                : "bg-red-950/60 border border-red-700 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ONGLET 1 : STATISTIQUES */}
        {activeTab === "stats" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 block mb-1">
                  Total Tâches
                </span>
                <span className="text-2xl font-black text-white">
                  {stats.total_tasks}
                </span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-emerald-400 block mb-1">
                  Réussies (24h)
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  {stats.completed_today}
                </span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-red-400 block mb-1">
                  Échecs (24h)
                </span>
                <span className="text-2xl font-black text-red-400">
                  {stats.failed_today}
                </span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <span className="text-xs text-amber-400 block mb-1">
                  En cours
                </span>
                <span className="text-2xl font-black text-amber-400">
                  {stats.in_progress}
                </span>
              </div>
            </div>

            {/* 10 dernières tâches */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4">
                Dernières conversions traitées
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-zinc-500 border-b border-zinc-800">
                    <tr>
                      <th className="pb-3">Statut</th>
                      <th className="pb-3">Fichier</th>
                      <th className="pb-3">Erreur</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-mono">
                    {stats.recent_tasks?.map((t: any) => (
                      <tr key={t.task_id} className="hover:bg-zinc-800/30">
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              t.status === "ready"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : t.status === "error"
                                  ? "bg-red-950 text-red-400 border border-red-800"
                                  : "bg-amber-950 text-amber-400 border border-amber-800"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-zinc-300 max-w-xs truncate">
                          {t.filename || "—"}
                        </td>
                        <td className="py-2.5 text-red-400 max-w-xs truncate">
                          {t.error || "—"}
                        </td>
                        <td className="py-2.5 text-zinc-500">
                          {new Date(t.created_at * 1000).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 2 : PUBLICITÉS */}
        {activeTab === "ads" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold">
                  Interrupteur Général des Publicités
                </h3>
                <p className="text-xs text-zinc-400">
                  Désactive ou active instantanément toutes les pubs du site.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    ads_enabled:
                      settings.ads_enabled === "true" ? "false" : "true",
                  })
                }
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  settings.ads_enabled === "true"
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-700 text-zinc-300"
                }`}
              >
                {settings.ads_enabled === "true"
                  ? "🟢 PUBLICITÉS ACTIVÉES"
                  : "🔴 DÉSACTIVÉES"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-300">
                  Bannière Haute (Top Leaderboard - sous le formulaire)
                </label>
                <textarea
                  rows={4}
                  placeholder="Collez ici le tag script ou HTML de Monetag / Adsterra"
                  value={settings.ad_top_banner}
                  onChange={(e) =>
                    setSettings({ ...settings, ad_top_banner: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-300">
                  Bannière Milieu (Mid Banner - avant la FAQ)
                </label>
                <textarea
                  rows={4}
                  placeholder="Collez ici le tag script ou HTML secondaire"
                  value={settings.ad_mid_banner}
                  onChange={(e) =>
                    setSettings({ ...settings, ad_mid_banner: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-300">
                  Script Popunder / On-Click
                </label>
                <textarea
                  rows={3}
                  placeholder="Collez le script popunder qui s'exécutera au clic de téléchargement"
                  value={settings.ad_popunder}
                  onChange={(e) =>
                    setSettings({ ...settings, ad_popunder: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Enregistrer les Publicités
            </button>
          </div>
        )}

        {/* ONGLET 3 : YOUTUBE & COOKIES */}
        {activeTab === "youtube" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold">
                Éditeur en direct de `cookies.txt`
              </h3>
              <p className="text-xs text-zinc-400">
                Collez ici le contenu de votre fichier de cookies YouTube. Le
                serveur l&apos;appliquera immédiatement sans redémarrage.
              </p>
            </div>

            <textarea
              rows={12}
              placeholder="# Netscape HTTP Cookie File&#10;.youtube.com TRUE / FALSE 1750000000 VISITOR_INFO1_LIVE ..."
              value={cookiesContent}
              onChange={(e) => setCookiesContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSaveSettings}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer"
              >
                Sauvegarder les Cookies sur le Serveur
              </button>
              <button
                onClick={() => {
                  setCookiesContent("");
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-semibold px-4 py-3 rounded-xl transition cursor-pointer"
              >
                Vider les Cookies
              </button>
            </div>
          </div>
        )}

        {/* ONGLET 4 : SEO & DMCA */}
        {activeTab === "dmca" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-300">
                Google Analytics 4 ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={settings.ga_tracking_id}
                onChange={(e) =>
                  setSettings({ ...settings, ga_tracking_id: e.target.value })
                }
                className="w-full max-w-sm bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-300">
                Liste Noire DMCA (Vidéos bloquées)
              </label>
              <p className="text-[11px] text-zinc-400 mb-2">
                Entrez une URL ou un ID de vidéo par ligne (ex: `si7ajTNCRa4`).
                Toute tentative de téléchargement sera bloquée avec une erreur
                403.
              </p>
              <textarea
                rows={6}
                placeholder="https://www.youtube.com/watch?v=xxxxxx&#10;dQw4w9WgXcQ"
                value={settings.blacklisted_urls}
                onChange={(e) =>
                  setSettings({ ...settings, blacklisted_urls: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Enregistrer les Paramètres
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
