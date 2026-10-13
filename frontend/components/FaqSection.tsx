"use client";

import { Translation } from "@/locales/dictionary";

interface FaqSectionProps {
  t: any;
}

export default function FaqSection({ t }: FaqSectionProps) {
  return (
    <section className="w-full max-w-3xl mt-16 pt-12 border-t border-zinc-800/60 space-y-12">
      {/* 3 étapes */}
      <div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          {t.howTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
            <div className="text-2xl mb-2">1️⃣</div>
            <h4 className="font-semibold text-white mb-1">{t.step1Title}</h4>
            <p className="text-xs text-zinc-400">{t.step1Desc}</p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
            <div className="text-2xl mb-2">2️⃣</div>
            <h4 className="font-semibold text-white mb-1">{t.step2Title}</h4>
            <p className="text-xs text-zinc-400">{t.step2Desc}</p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl">
            <div className="text-2xl mb-2">3️⃣</div>
            <h4 className="font-semibold text-white mb-1">{t.step3Title}</h4>
            <p className="text-xs text-zinc-400">{t.step3Desc}</p>
          </div>
        </div>
      </div>

      {/* Accordéons FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          {t.faqTitle}
        </h2>
        <div className="space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl">
            <h4 className="font-semibold text-white text-sm mb-1">{t.faq1Q}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.faq1A}</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl">
            <h4 className="font-semibold text-white text-sm mb-1">{t.faq2Q}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.faq2A}</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl">
            <h4 className="font-semibold text-white text-sm mb-1">{t.faq3Q}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.faq3A}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
