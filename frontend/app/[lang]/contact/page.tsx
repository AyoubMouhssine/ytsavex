import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SupportedLang } from "@/locales/dictionary";
import { staticTranslations } from "@/locales/staticPages";
import type { Metadata } from "next";

type Props = { params: Promise<{ lang: SupportedLang }> };

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }, { lang: "es" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = staticTranslations[lang] ? lang : "en";
  const t = staticTranslations[currentLang].contact;
  const baseUrl = "https://ytsavex.com";

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${currentLang}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        fr: `${baseUrl}/fr/contact`,
        es: `${baseUrl}/es/contact`,
        ar: `${baseUrl}/ar/contact`,
        "x-default": `${baseUrl}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = staticTranslations[lang] ? lang : "en";
  const t = staticTranslations[currentLang].contact;

  return (
    <div
      dir={currentLang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200"
    >
      <Header lang={currentLang} />
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-16 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
          {t.intro}
        </p>
        <div className="space-y-4 pt-4">
          <div className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-600 dark:text-zinc-400 block mb-1">
              {t.supportLabel}
            </span>
            <span className="font-mono text-sm font-semibold text-slate-800 dark:text-zinc-200">
              contact@ytsavex.com
            </span>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-600 dark:text-zinc-400 block mb-1">
              {t.dmcaLabel}
            </span>
            <span className="font-mono text-sm font-semibold text-red-600 dark:text-red-400">
              abuse@ytsavex.com
            </span>
          </div>
        </div>
      </main>
      <Footer lang={currentLang} />
    </div>
  );
}
