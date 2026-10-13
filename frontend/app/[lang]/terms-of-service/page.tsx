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
  const t = staticTranslations[currentLang].terms;
  const baseUrl = "https://ytsavex.com";

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${currentLang}/terms-of-service`,
      languages: {
        en: `${baseUrl}/en/terms-of-service`,
        fr: `${baseUrl}/fr/terms-of-service`,
        es: `${baseUrl}/es/terms-of-service`,
        ar: `${baseUrl}/ar/terms-of-service`,
        "x-default": `${baseUrl}/en/terms-of-service`,
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const currentLang = staticTranslations[lang] ? lang : "en";
  const t = staticTranslations[currentLang].terms;

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
          {t.intro}
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          {t.sec1Title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
          {t.sec1Text}
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
          {t.sec2Title}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
          {t.sec2Text}
        </p>
      </main>
      <Footer lang={currentLang} />
    </div>
  );
}
