import React from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  title: string;
  faqs: FaqItem[];
}

export default function FaqAccordion({ title, faqs }: FaqAccordionProps) {
  return (
    <section className="w-full max-w-4xl mt-16 pt-10 border-t border-slate-200 dark:border-zinc-800/80">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-8">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl transition duration-200 overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-zinc-700"
          >
            <summary className="flex items-center justify-between p-5 text-sm sm:text-base font-semibold text-slate-900 dark:text-zinc-100 cursor-pointer list-none select-none">
              <span>{faq.q}</span>
              <span className="ml-4 shrink-0 text-slate-600 dark:text-zinc-400 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/50">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
