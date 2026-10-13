import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloaderForm from "@/components/DownloaderForm";
import RelatedTools from "@/components/RelatedTools";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { translations, SupportedLang } from "@/locales/dictionary";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

type Props = {
  params: Promise<{ lang: SupportedLang }>;
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "es" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];
  const baseUrl = "https://ytsavex.com";

  return {
    title: `${t.heroTitle} ${t.heroHighlight} - YTSaveX`,
    description: t.heroSub,
    alternates: {
      canonical: `${baseUrl}/${currentLang}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
        es: `${baseUrl}/es`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocalizedPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  const steps = [
    { title: t.step1Title, desc: t.step1Desc },
    { title: t.step2Title, desc: t.step2Desc },
    { title: t.step3Title, desc: t.step3Desc },
  ];

  // Regroupement des FAQs globales
  const homeFaqs = [
    {
      q:
        currentLang === "fr"
          ? "YTSaveX est-il 100% gratuit ?"
          : "Is YTSaveX completely free to use?",
      a:
        currentLang === "fr"
          ? "Oui, sans frais cachés, sans abonnement et sans limite de téléchargement."
          : "Yes, with zero hidden fees, no subscriptions, and unlimited downloads.",
    },
    {
      q:
        currentLang === "fr"
          ? "Quels sont les formats supportés ?"
          : "Which formats and qualities are supported?",
      a:
        currentLang === "fr"
          ? "Nous supportons la vidéo Full HD 1080p, 720p HD en MP4, ainsi que le format audio haute fidélité MP3 320 kbps."
          : "We support 1080p Full HD and 720p HD MP4 video, as well as 320 kbps high-fidelity MP3 audio.",
    },
    {
      q:
        currentLang === "fr"
          ? "Comment télécharger sur iPhone ou iPad ?"
          : "How to save videos directly on iPhone or iPad?",
      a:
        currentLang === "fr"
          ? "Collez le lien dans Safari, lancez l'analyse et cliquez sur Sauvegarder. Le fichier sera directement enregistré dans votre application 'Fichiers'."
          : "Paste the link in Safari, analyze, and click Save. The file will download directly into your device's Files app.",
    },
    {
      q:
        currentLang === "fr"
          ? "Puis-je télécharger des playlists entières ?"
          : "Can I download full YouTube playlists?",
      a:
        currentLang === "fr"
          ? "Oui ! Collez l'URL de la playlist pour afficher la liste complète et télécharger chaque piste en MP4 ou MP3 d'un simple clic."
          : "Yes! Paste the playlist URL to view the complete tracklist and download any track in MP4 or MP3 with a single click.",
    },
  ];

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200"
    >
      <JsonLd
        name="YTSaveX - YouTube Video & Audio Downloader"
        description={t.heroSub}
        url={`https://ytsavex.com/${currentLang}`}
        faqs={homeFaqs}
        steps={steps}
      />

      <Header lang={currentLang} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-block bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-red-700 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.heroTitle}{" "}
            <span className="text-red-600 dark:text-red-500">
              {t.heroHighlight}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            {t.heroSub}
          </p>
        </div>

        <DownloaderForm t={t} />

        {/* Emplacement publicitaire stratégique n°1 */}
        <AdBanner slotId="top" format="horizontal" />
        {/* 3 étapes claires */}
        <section className="w-full max-w-3xl mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {t.howTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                {t.step1Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                {t.step1Desc}
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                {t.step2Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                {t.step2Desc}
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                {t.step3Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ interactive avec <details> et <summary> */}
        <FaqAccordion title={t.faqTitle} faqs={homeFaqs} />

        <RelatedTools currentLang={currentLang} />
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
