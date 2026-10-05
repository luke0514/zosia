'use client';

import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import EllipticCurveVisualizer from '@/components/EllipticCurveVisualizer';
import MathBlock, { M } from '@/components/MathBlock';
import { CHAPTERS } from '@/chapters/registry';
import { CURVE } from '@/data/chapter05';

const meta = CHAPTERS[4];

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-ink-700/40 py-2 last:border-b-0 sm:flex-row sm:gap-6">
      <span className="w-16 shrink-0 font-mono text-[11px] uppercase tracking-widest2 text-ink-500">
        {k}
      </span>
      <span className="tnum break-all font-mono text-[13px] text-parchment/85">{v}</span>
    </div>
  );
}

export default function Chapter05() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        The plane is a lie we draw on paper,
        <br />
        because paper is flat.
      </Epigraph>

      <p>
        Take the short Weierstrass form over a prime field:
      </p>

      <MathBlock display>
        {'E: y^{2} \\equiv x^{3} + ax + b \\pmod p, \\qquad 4a^{3} + 27b^{2} \\not\\equiv 0 .'}
      </MathBlock>

      <p>
        The points of <M>{'E(\\F_p)'}</M>, together with a point at infinity, form an abelian
        group. Nobody would guess this from the equation. It comes from the chord-and-tangent
        construction: a line meets a cubic three times, you declare the three points to sum to
        zero, and associativity — the part that has no right to be true — follows.
      </p>

      <p>
        Hasse bounds the size of the group,
      </p>

      <MathBlock display>
        {'\\bigl| \\#E(\\F_p) - (p+1) \\bigr| \\le 2\\sqrt{p} ,'}
      </MathBlock>

      <p>
        which is the fact that makes the order of a point findable in{' '}
        <M>{'O(p^{1/4})'}</M> operations rather than <M>{'O(p)'}</M>.
      </p>

      <div className="rule my-12" />

      <Panel title="Domain parameters" note="49-bit prime field">
        <Row k="p" v={CURVE.p} />
        <Row k="a" v={CURVE.a} />
        <Row k="b" v={CURVE.b} />
        <Row k="G" v={`(${CURVE.G.x}, ${CURVE.G.y})`} />
        <Row k="Q" v={`(${CURVE.Q.x}, ${CURVE.Q.y})`} />
      </Panel>

      <p>
        There exists exactly one <M>{'k'}</M> with <M>{'Q = kG'}</M>, and finding it is the
        elliptic curve discrete logarithm problem. On a well-chosen curve this is the hardest
        thing in practical cryptography. This curve was not well chosen.
      </p>

      <Aside>
        Before you attack the logarithm, measure the group you are working in. Everything about
        the difficulty of this chapter is contained in a single integer, and it is not{' '}
        <M>{'k'}</M>.
      </Aside>

      <EllipticCurveVisualizer />

      <p>
        When you have <M>{'k'}</M>, it is not the answer — it is a key. Nineteen letters were
        enciphered with it, and the cipher is the oldest polyalphabetic one there is:
      </p>

      <Panel title="Ciphertext" note="19 letters, A = 0">
        <p className="font-mono text-[19px] tracking-[0.3em] text-signal">{CURVE.ciphertext}</p>
      </Panel>

      <p className="!mb-0">
        A large integer becomes a word in the obvious way, if you remember how many letters there
        are in the alphabet.
      </p>
    </ChapterLayout>
  );
}
