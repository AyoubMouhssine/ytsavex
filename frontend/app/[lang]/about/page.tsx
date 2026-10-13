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
  const t = staticTranslations[currentLang].about;
  const baseUrl = "https://ytsavex.com";

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${currentLang}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        fr: `${baseUrl}/fr/about`,
        es: `${baseUrl}/es/about`,
        ar: `${baseUrl}/ar/about`,
        "x-default": `${baseUrl}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = staticTranslations[lang] ? lang : "en";
  const t = staticTranslations[currentLang].about;

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
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          {t.p1}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
          {t.philosophyTitle}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-400">
          {t.p2}
        </p>
      </main>
      <Footer lang={currentLang} />
    </div>
  );
}
