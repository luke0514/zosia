'use client';

import { useMemo, useState } from 'react';
import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import MathBlock, { M } from '@/components/MathBlock';
import { CHAPTERS } from '@/chapters/registry';
import { CHARACTERISTIC, INDICATORS } from '@/data/chapter07';

const meta = CHAPTERS[6];

/**
 * A self-check for the cycle characteristic.  It confirms an answer the solver has
 * already computed; it never produces one.  Getting it right is the real gate of this
 * chapter even though it is not what the answer field asks for.
 */
function CharacteristicCheck() {
  const [value, setValue] = useState('');
  const expected = useMemo(
    () =>
      (['AD', 'BE', 'CF'] as const)
        .map((k) => (CHARACTERISTIC as Record<string, number[]>)[k].join('.'))
        .join(' '),
    [],
  );
  const norm = (s: string) => s.replace(/[^0-9]/g, ' ').trim().split(/\s+/).join(' ');
  const ok = value.trim() !== '' && norm(value) === norm(expected);

  return (
    <div className="my-10 border border-ink-600 bg-ink-850/40 p-5">
      <label
        htmlFor="char-check"
        className="block font-mono text-[10px] uppercase tracking-widest2 text-steel-dim"
      >
        Cycle characteristic — self check
      </label>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-500">
        Nine numbers, as three groups: the half-lengths for AD, then BE, then CF. Any separators.
        This is not the chapter&rsquo;s answer — it is a mirror, so you can tell whether your
        permutations are right before you build anything on them.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="char-check"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g.  4 4.9  1.5.7"
          autoComplete="off"
          spellCheck={false}
          className="w-full flex-1 border border-ink-600 bg-ink-900/70 px-3 py-2.5 font-mono text-[13px] text-parchment placeholder:text-ink-500 focus:border-steel-dim focus:outline-none"
        />
        <span
          aria-live="polite"
          className={`flex shrink-0 items-center px-2 font-mono text-[11px] uppercase tracking-widest2 ${
            ok ? 'text-signal' : 'text-ink-500'
          }`}
        >
          {value.trim() === '' ? '—' : ok ? 'matches' : 'no'}
        </span>
      </div>
    </div>
  );
}

export default function Chapter07() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        The part everyone assumed was hopeless
        <br />
        turned out to be the part that did not matter.
      </Epigraph>

      <p>
        What follows is one day&rsquo;s traffic — {INDICATORS.length} six-letter groups, all sent
        from the same starting position. Each group is a three-letter key that the operator typed{' '}
        <em>twice</em>, because the procedure demanded it, because radio was unreliable and a
        garbled key wasted a whole message.
      </p>

      <p>
        So position 1 and position 4 are the same plaintext letter, enciphered three steps apart.
        So are 2 and 5, and 3 and 6. That is all. That is the entire opening.
      </p>

      <Panel title="Intercepts" note={`${INDICATORS.length} groups, one ground setting`}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-[5px] font-mono text-[13px] tracking-[0.18em] text-parchment/85 sm:grid-cols-3 md:grid-cols-4">
          {INDICATORS.map((g, i) => (
            <div key={`${g}-${i}`} className="flex items-baseline gap-3">
              <span className="tnum w-6 shrink-0 text-right text-[10px] tracking-normal text-ink-500">
                {i + 1}
              </span>
              <span>{g}</span>
            </div>
          ))}
        </div>
      </Panel>

      <p>
        Compose the pairings and you get three permutations of the alphabet, which the literature
        calls <M>{'AD'}</M>, <M>{'BE'}</M> and <M>{'CF'}</M>. Every one of them is a product of
        two of the machine&rsquo;s own reciprocal permutations, and that structural fact has a
        consequence that is not obvious and is not hard:
      </p>

      <MathBlock display>
        {'\\text{the cycles of } AD, BE, CF \\text{ occur in pairs of equal length.}'}
      </MathBlock>

      <p>
        Better than that. Conjugating by the plugboard permutes the letters inside the cycles but
        cannot change how long they are. The multiset of cycle lengths is therefore{' '}
        <em>invariant</em> under the plugboard entirely — and the plugboard was the part that
        contributed almost all of the machine&rsquo;s key space, the part the French and the
        British had both looked at and set aside as intractable.
      </p>

      <Aside>
        Roughly <M>{'10^{14}'}</M> plugboard settings, and none of them touch the quantity you
        are about to compute. The wheels have nowhere left to hide.
      </Aside>

      <CharacteristicCheck />

      <div className="rule my-12" />

      <p>
        The man who noticed this was twenty-seven. He had studied mathematics at Poznań, had been
        recruited out of a secret cryptology course run for students who spoke German, and was
        given the problem in the autumn of 1932 — a problem that the cryptanalytic bureaux of
        three countries had already declared unbreakable. He solved it in about ten weeks, with
        permutation theory and a stolen key sheet, and then his colleagues built machines to do it
        faster.
      </p>

      <p>
        Their work went to Paris and to London in July 1939, five weeks before the invasion, and
        everything that happened afterwards at Bletchley Park started from it.
      </p>

      <p className="!mb-0">
        You are not being asked for his name. You are being asked for the name of the thing he
        broke — the six letters that were on the front of the machine.
      </p>
    </ChapterLayout>
  );
}
