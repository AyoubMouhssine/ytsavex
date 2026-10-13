import Link from "next/link";
import {
  SupportedLang,
  SUPPORTED_TOOLS,
  translations,
} from "@/locales/dictionary";

interface RelatedToolsProps {
  currentLang: SupportedLang;
  currentTool?: string;
}

export default function RelatedTools({
  currentLang,
  currentTool,
}: RelatedToolsProps) {
  const t = translations[currentLang] || translations.en;
  const otherTools = SUPPORTED_TOOLS.filter((tool) => tool !== currentTool);

  return (
    <section className="w-full max-w-4xl mt-16 pt-12 border-t border-slate-200 dark:border-zinc-800/80">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
        {t.relatedToolsTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {otherTools.map((toolSlug) => {
          const toolData = t.tools[toolSlug];
          return (
            <Link
              key={toolSlug}
              href={`/${currentLang}/${toolSlug}`}
              className="bg-white dark:bg-zinc-900/60 hover:bg-slate-50 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 p-5 rounded-2xl shadow-sm transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-red-700 dark:text-red-400 font-semibold uppercase tracking-wider block mb-2">
                  {toolData.badge}
                </span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition mb-2">
                  {toolData.heroTitle} {toolData.heroHighlight}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2">
                  {toolData.heroSub}
                </p>
              </div>
              <span className="text-xs text-red-600 dark:text-red-400 font-semibold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Tool →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
