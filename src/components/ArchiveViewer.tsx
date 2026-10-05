'use client';

import { useState } from 'react';
import { ARCHIVE, CONCORDANCE } from '@/data/archive';

/**
 * The archive reader.
 *
 * Lines are numbered from one, exactly as they are printed — that is a promise the
 * text itself makes in folio MS-M-13, and the whole chapter depends on it being kept.
 * Words are numbered on hover so the convention can be checked rather than guessed.
 */

function FolioText({ lines }: { lines: string[] }) {
  return (
    <div className="font-serif text-[17.5px] leading-[1.95] text-parchment/90">
      {lines.map((line, li) => (
        <div key={`${li}-${line.slice(0, 12)}`} className="group flex gap-4">
          <span
            aria-hidden
            className="tnum w-7 shrink-0 select-none pt-[3px] text-right font-mono text-[10px] text-ink-500"
          >
            {li + 1}
          </span>
          <p className="min-w-0 flex-1 whitespace-pre-wrap break-words">
            {line.split(/(\s+)/).map((tok, ti) => {
              if (/^\s+$/.test(tok)) return <span key={ti}>{tok}</span>;
              const wordIndex = line.slice(0, line.indexOf(tok)).split(/\s+/).filter(Boolean).length;
              return (
                <span
                  key={ti}
                  className="relative rounded-[2px] transition-colors hover:bg-steel/10"
                  title={`word ${line.split(/\s+/).filter(Boolean).indexOf(tok) + 1 || wordIndex + 1}`}
                >
                  {tok}
                </span>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ArchiveViewer() {
  const [open, setOpen] = useState(0);
  const folio = ARCHIVE[open];

  return (
    <div className="my-10 border border-ink-600 bg-ink-850/40">
      <div className="grid gap-px bg-ink-700 lg:grid-cols-[15rem_1fr]">
        {/* ------------------------------------------------- shelf */}
        <nav aria-label="Folios" className="bg-ink-850/70">
          <p className="border-b border-ink-700 px-4 py-3 font-mono text-[10px] uppercase tracking-widest2 text-steel-dim">
            Fourteen folios
          </p>
          <ul className="max-h-[560px] overflow-y-auto">
            {ARCHIVE.map((f, i) => (
              <li key={f.code}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-current={i === open ? 'true' : undefined}
                  className={`block w-full border-b border-ink-700/50 px-4 py-3 text-left transition-colors ${
                    i === open ? 'bg-ink-800' : 'hover:bg-ink-800/50'
                  }`}
                >
                  <span
                    className={`block font-mono text-[10px] tracking-widest2 ${
                      i === open ? 'text-steel' : 'text-ink-500'
                    }`}
                  >
                    {f.code}
                  </span>
                  <span
                    className={`mt-1 block font-serif text-[15px] leading-snug ${
                      i === open ? 'text-parchment' : 'text-haze'
                    }`}
                  >
                    {f.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ------------------------------------------------- reader */}
        <article className="bg-ink-850/70">
          <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-700 px-6 py-4">
            <div>
              <p className="font-mono text-[10px] tracking-widest2 text-steel-dim">{folio.code}</p>
              <h3 className="mt-1 font-serif text-[21px] font-light text-parchment">
                {folio.title}
              </h3>
            </div>
            <span className="font-mono text-[10px] text-ink-500">{folio.date}</span>
          </header>
          <div className="max-h-[560px] overflow-y-auto px-6 py-6">
            <FolioText lines={folio.lines} />
          </div>
        </article>
      </div>
    </div>
  );
}

/** The loose card. */
export function ConcordanceCard() {
  return (
    <div className="my-10 border border-ink-600 bg-ink-850/40">
      <div className="flex items-baseline justify-between border-b border-ink-700 px-5 py-3">
        <h3 className="font-mono text-[10px] uppercase tracking-widest2 text-steel-dim">
          Concordance — loose leaf, undated
        </h3>
        <span className="font-mono text-[10px] text-ink-500">{CONCORDANCE.length} entries</span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-[6px] px-5 py-5 font-mono text-[12.5px] sm:grid-cols-3 lg:grid-cols-4">
        {CONCORDANCE.map((c, i) => (
          <div key={`${c.folio}-${c.line}-${c.word}-${i}`} className="tnum flex items-baseline gap-3">
            <span className="w-5 shrink-0 text-right text-[10px] text-ink-500">{i + 1}</span>
            <span className="text-parchment/85">
              {c.folio}
              <span className="text-ink-500"> · </span>
              {c.line}
              <span className="text-ink-500"> · </span>
              {c.word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
