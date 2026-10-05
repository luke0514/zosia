'use client';

import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import MathBlock, { M } from '@/components/MathBlock';
import { CHAPTERS } from '@/chapters/registry';
import { MIRROR_PRIMES } from '@/data/chapter02';

const meta = CHAPTERS[1];

export default function Chapter02() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        A prime is not one thing.
        <br />
        It is one thing in <span className="not-italic">ℤ</span>.
      </Epigraph>

      <p>
        Adjoin a square root of <M>{'-1'}</M> to the integers and you get the Gaussian integers{' '}
        <M>{'\\Z[i]'}</M>, a Euclidean domain, with a norm that is multiplicative:
      </p>

      <MathBlock display>{'N(a + bi) = (a+bi)\\overline{(a+bi)} = a^{2} + b^{2} .'}</MathBlock>

      <p>
        In this larger ring the rational primes stop being uniformly prime. Fermat, in 1640, and
        Euler, who eventually proved it:
      </p>

      <MathBlock display>
        {'p \\equiv 1 \\pmod 4 \\iff p = a^{2} + b^{2} \\text{ for integers } a, b ,'}
      </MathBlock>

      <p>
        and the representation is <em>unique</em> up to order and sign. That uniqueness is the
        entire content of this chapter. A prime congruent to one modulo four does not have a
        decomposition the way a room has furniture — arbitrarily, replaceably. It has one the way
        a face has features.
      </p>

      <p>
        Such a prime splits in <M>{'\\Z[i]'}</M> as
      </p>

      <MathBlock display>{'p = \\pi \\bar{\\pi}, \\qquad \\pi = a + bi ,'}</MathBlock>

      <p>
        into two conjugate factors: reflections of each other across the real axis. Two faces,
        fixed forever by the arithmetic, not by anybody&rsquo;s choice. And a complex number has
        a second coordinate that an integer does not have —
      </p>

      <MathBlock display>{'\\arg(a + bi) = \\arctan(b/a) .'}</MathBlock>

      <div className="rule my-12" />

      <p>
        Below are eighteen primes. Every one is congruent to one modulo four, so every one of
        them splits, and every split is the only split it has.
      </p>

      <p>
        They are printed in ascending order, which is the order a computer produces and the order
        a person expects. It tells you how large they are. It tells you nothing else, and this
        chapter is not about size.
      </p>

      <Panel title="Eighteen primes" note="p ≡ 1 (mod 4) — listed by magnitude">
        <div
          className="tnum grid grid-cols-2 gap-x-10 gap-y-[6px] font-mono text-[14px] text-parchment/85 sm:grid-cols-3"
          data-count={MIRROR_PRIMES.length}
        >
          {MIRROR_PRIMES.map((p, i) => (
            <div key={p} className="flex items-baseline gap-3">
              <span className="w-6 shrink-0 text-right text-[11px] text-ink-500">{i + 1}</span>
              <span>{p.toLocaleString('en-US')}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Aside>
        Sanity check while you work: each of these is <M>{'1 \\bmod 4'}</M>, each has exactly one
        pair <M>{'0 < a < b'}</M> with <M>{'a^2 + b^2 = p'}</M>, and if you find two you have made
        an arithmetic error rather than a discovery.
      </Aside>

      <p>
        Place them where they belong. Not on a line — a line is what you get when you insist a
        number has one coordinate. Place them in the plane, and then ask what the natural order
        of a set of points in the plane actually is.
      </p>

      <p className="!mb-0">
        Sorting is a choice. Every ordering is a claim about what matters. Make a different claim
        and the same eighteen primes will say four words to you.
      </p>
    </ChapterLayout>
  );
}
