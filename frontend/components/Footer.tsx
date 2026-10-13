import Link from "next/link";
import {
  SupportedLang,
  SUPPORTED_TOOLS,
  translations,
} from "@/locales/dictionary";

interface FooterProps {
  lang: SupportedLang;
}

export default function Footer({ lang }: FooterProps) {
  const currentLang = translations[lang] ? lang : "en";
  const t = translations[currentLang];

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 text-sm mt-24 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1 : Marque & Présentation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded tracking-wider">
              YT
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              SaveX
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
            {t.heroSub}
          </p>
        </div>

        {/* Col 2 : Outils de téléchargement */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Tools
          </h3>
          <ul className="space-y-2 text-xs">
            {SUPPORTED_TOOLS.map((tool) => (
              <li key={tool}>
                <Link
                  href={`/${currentLang}/${tool}`}
                  className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                >
                  {t.tools[tool].heroTitle} {t.tools[tool].heroHighlight}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 : Légal & Conformité (DMCA) */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Legal & Policy
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href={`/${currentLang}/dmca`}
                className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer text-red-600 dark:text-red-400 font-semibold"
              >
                DMCA Disclaimer
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLang}/terms-of-service`}
                className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLang}/privacy-policy`}
                className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 : À Propos & Support */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                href={`/${currentLang}/about`}
                className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLang}/contact`}
                className="hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
              >
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mention de responsabilité juridique en bas */}
      <div className="border-t border-slate-200 dark:border-zinc-900 py-6 text-center text-xs text-slate-600 dark:text-zinc-400 px-4">
        <p>{t.footerDisclaimer}</p>
        <p className="mt-1 text-[11px]">
          This service is not affiliated with YouTube, Google, or Alphabet Inc.
        </p>
      </div>
    </footer>
  );
}
