import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloaderForm from "@/components/DownloaderForm";
import RelatedTools from "@/components/RelatedTools";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import {
  SupportedLang,
  ToolSlug,
  SUPPORTED_TOOLS,
  translations,
} from "@/locales/dictionary";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

type Props = {
  params: Promise<{ lang: SupportedLang; tool: ToolSlug }>;
};

export async function generateStaticParams() {
  const locales: SupportedLang[] = ["en", "fr", "es", "ar"];
  const params: { lang: SupportedLang; tool: ToolSlug }[] = [];

  for (const lang of locales) {
    for (const tool of SUPPORTED_TOOLS) {
      params.push({ lang, tool });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, tool } = await params;
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];
  const toolData = t.tools[tool];

  if (!toolData) return {};

  const baseUrl = "https://ytsavex.com";

  return {
    title: `${toolData.metaTitle} | YTSaveX`,
    description: toolData.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${currentLang}/${tool}`,
      languages: {
        en: `${baseUrl}/en/${tool}`,
        fr: `${baseUrl}/fr/${tool}`,
        es: `${baseUrl}/es/${tool}`,
        ar: `${baseUrl}/ar/${tool}`,
        "x-default": `${baseUrl}/en/${tool}`,
      },
    },
    openGraph: {
      title: toolData.metaTitle,
      description: toolData.metaDescription,
      url: `${baseUrl}/${currentLang}/${tool}`,
      siteName: "YTSaveX",
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { lang, tool } = await params;
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];
  const toolData = t.tools[tool];

  if (!toolData) {
    notFound();
  }

  const steps = [
    { title: t.step1Title, desc: t.step1Desc },
    { title: t.step2Title, desc: t.step2Desc },
    { title: t.step3Title, desc: t.step3Desc },
  ];

  const breadcrumbs = [
    { name: "Home", item: `https://ytsavex.com/${currentLang}` },
    {
      name: toolData.heroTitle,
      item: `https://ytsavex.com/${currentLang}/${tool}`,
    },
  ];

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200"
    >
      {/* Schema JSON-LD dynamique */}
      <JsonLd
        name={`${toolData.heroTitle} ${toolData.heroHighlight}`}
        description={toolData.metaDescription}
        url={`https://ytsavex.com/${currentLang}/${tool}`}
        faqs={toolData.faqs}
        steps={steps}
        breadcrumbs={breadcrumbs}
      />

      <Header lang={currentLang} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        {/* En-tête H1 ciblé SEO */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-block bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-red-700 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {toolData.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {toolData.heroTitle}{" "}
            <span className="text-red-600 dark:text-red-500">
              {toolData.heroHighlight}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            {toolData.heroSub}
          </p>
        </div>

        {/* Formulaire de téléchargement */}
        <DownloaderForm t={t} />
        {/* Emplacement publicitaire stratégique n°1 */}
        <AdBanner slotId="top" format="horizontal" />

        {/* 1. Grille des fonctionnalités clés */}
        <div className="w-full max-w-3xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {toolData.features.map((feat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl text-center shadow-sm"
            >
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                {feat.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Tableau des spécifications techniques (Favorise les Featured Snippets Google) */}
        {toolData.specs && toolData.specs.length > 0 && (
          <section className="w-full max-w-3xl mt-14">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              {t.specsTitle}
            </h2>
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {toolData.specs.map((spec, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-100 dark:border-zinc-800/80 last:border-none"
                    >
                      <td className="py-3 px-5 font-semibold text-slate-700 dark:text-zinc-300 bg-slate-50/50 dark:bg-zinc-900/40 w-1/2">
                        {spec.label}
                      </td>
                      <td className="py-3 px-5 text-slate-600 dark:text-zinc-400 font-mono">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 3. Guide approfondi (Contenu riche anti-thin content) */}
        {toolData.deepGuide && (
          <section className="w-full max-w-3xl mt-14 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {toolData.deepGuide.title}
            </h2>
            {toolData.deepGuide.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </section>
        )}

        <AdBanner slotId="mid" format="horizontal" />

        {/* 4. Section FAQ interactive (<details> & <summary>) */}
        <FaqAccordion title={t.faqTitle} faqs={toolData.faqs} />

        {/* Maillage interne vers les outils annexes */}
        <RelatedTools currentLang={currentLang} currentTool={tool} />
      </main>

      <Footer lang={currentLang} />
    </div>
  );
}
