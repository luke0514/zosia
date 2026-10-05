'use client';

import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import MathBlock, { M } from '@/components/MathBlock';
import { CHAPTERS } from '@/chapters/registry';
import { RSA } from '@/data/chapter03';
import { asset } from '@/lib/paths';

const meta = CHAPTERS[2];

/** Break a very long integer into readable groups without letting it widen the page. */
function Digits({ value }: { value: string }) {
  const groups = value.match(/.{1,10}/g) ?? [value];
  return (
    <span className="tnum break-all font-mono text-[12px] leading-[1.9] text-parchment/85">
      {groups.map((g, i) => (
        <span key={`${g}-${i}`} className="mr-2 inline-block">
          {g}
        </span>
      ))}
    </span>
  );
}

export default function Chapter03() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        The mathematics of RSA is sound.
        <br />
        The mathematics is not usually what fails.
      </Epigraph>

      <p>
        What follows is a real key and a real ciphertext. Textbook RSA, no padding: the plaintext
        was read as a big-endian ASCII integer <M>{'m'}</M> and enciphered as
      </p>

      <MathBlock display>{'c \\equiv m^{e} \\pmod n , \\qquad e = 65537 .'}</MathBlock>

      <p>
        The modulus is <M>{'1024'}</M> bits, the product of two <M>{'512'}</M>-bit primes. The
        exponent is the standard one. There is no trick in the protocol, no reused nonce, no
        oracle, nothing to interact with. Everything you need is printed on this page and the
        weakness is arithmetic.
      </p>

      <Panel title="Public key" note="e = 65537 · 1024-bit modulus">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest2 text-ink-500">n</div>
        <Digits value={RSA.n} />
      </Panel>

      <Panel title="Ciphertext" note="single block">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest2 text-ink-500">c</div>
        <Digits value={RSA.c} />
      </Panel>

      <div className="my-10 flex flex-wrap gap-x-8 gap-y-3">
        <a
          href={asset("/puzzles/key-03.pub")}
          download
          className="font-mono text-[11px] uppercase tracking-widest2 text-steel underline underline-offset-[6px] hover:text-signal"
        >
          ↓ key-03.pub
        </a>
        <a
          href={asset("/puzzles/message-03.enc")}
          download
          className="font-mono text-[11px] uppercase tracking-widest2 text-steel underline underline-offset-[6px] hover:text-signal"
        >
          ↓ message-03.enc
        </a>
      </div>

      <div className="rule my-12" />

      <p>
        Recovering the plaintext needs <M>{'d \\equiv e^{-1} \\pmod{\\varphi(n)}'}</M>, and{' '}
        <M>{'\\varphi(n) = (p-1)(q-1)'}</M>, and therefore <M>{'p'}</M> and <M>{'q'}</M>. So the
        whole chapter is one question: where did these two primes come from?
      </p>

      <p>
        A prime generator is a procedure, and procedures leave fingerprints. The usual advice is
        to draw <M>{'p'}</M> and <M>{'q'}</M> independently from a cryptographic source. The usual
        advice exists because people keep not following it — because a constant is easier to
        remember than an entropy pool, and because a key that <em>looks</em> random is
        indistinguishable from one that is, right up until somebody guesses the procedure.
      </p>

      <Aside>
        Two independent facts are true of this modulus, and either one is enough on its own. One
        of them costs you a few seconds of arithmetic and no insight at all. The other costs you
        no arithmetic and one idea, and the idea is somewhere in the first chapter of this puzzle.
      </Aside>

      <p>
        Once you have the factors the rest is mechanical:{' '}
        <M>{'\\varphi(n) = (p-1)(q-1)'}</M>, then <M>{'d = e^{-1} \\bmod \\varphi(n)'}</M>, then{' '}
        <M>{'m = c^{d} \\bmod n'}</M>, then read <M>{'m'}</M> back as bytes. Five words fall out.
      </p>

      <p className="!mb-0">
        They are a sentence about this key, and about a great many keys that are still in service.
      </p>
    </ChapterLayout>
  );
}
