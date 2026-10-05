'use client';

import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import EnigmaMachine from '@/components/EnigmaMachine';
import { CHAPTERS } from '@/chapters/registry';
import { INTERCEPT } from '@/data/chapter08';

const meta = CHAPTERS[7];

export default function Chapter08() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        Anyone can turn the wheels.
        <br />
        Knowing where to start is the whole problem.
      </Epigraph>

      <p>
        The machine below is real. Enigma I, as the German army used it: three wheels chosen from
        five, a reflector, a ring setting on each wheel, a starting position for each wheel, and a
        plugboard. The stepping is correct, including the double step — the pawl-and-notch
        accident that makes the middle wheel advance twice in consecutive keystrokes, which
        nobody designed and everybody had to live with.
      </p>

      <Panel title="Key sheet fragment" note="recovered — partial">
        <dl className="grid grid-cols-[8rem_1fr] gap-y-2 font-mono text-[13px]">
          <dt className="text-ink-500">Umkehrwalze</dt>
          <dd className="text-parchment/85">{INTERCEPT.reflector}</dd>
          <dt className="text-ink-500">Steckerbrett</dt>
          <dd className="tracking-[0.14em] text-parchment/85">{INTERCEPT.plugboard}</dd>
          <dt className="text-ink-500">Walzenlage</dt>
          <dd className="text-haze">— torn —</dd>
          <dt className="text-ink-500">Ringstellung</dt>
          <dd className="text-haze">— torn —</dd>
          <dt className="text-ink-500">Grundstellung</dt>
          <dd className="text-haze">— torn —</dd>
        </dl>
      </Panel>

      <Panel title="Intercept" note={`${INTERCEPT.length} letters`}>
        <p className="break-all font-mono text-[clamp(14px,4vw,19px)] leading-relaxed tracking-[0.24em] text-signal">
          {INTERCEPT.ciphertext}
        </p>
      </Panel>

      <p>
        Three lines of the key sheet are gone: which wheels, in what order, set to which rings,
        starting from which letters. That is <span className="tnum">60 × 26³ × 26³</span> —
        roughly <span className="tnum">1.1 × 10¹²</span> configurations, and you are not going to
        search them.
      </p>

      <p>
        You do not have to. All three were written down before you ever arrived here. Every
        chapter you have finished ended in a sentence, and the first three of those sentences are
        the key sheet.
      </p>

      <Aside>
        Take the first three <em>distinct</em> letters of each of the messages from chapters 01,
        02 and 03. Two of those triples are settings exactly as they stand. The third is not
        letters at all: there are five wheels, the alphabet begins at one, and you are counting
        round.
      </Aside>

      <EnigmaMachine />

      <p>
        The machine is reciprocal, so you do not need a decrypt mode — set the wheels, put the
        intercept in, and if the settings are right, the plaintext comes out. If they are wrong
        you get twenty-four letters of noise, and there is no partial credit and no warmth. It is
        either German-army-standard right or it is nothing.
      </p>

      <p className="!mb-0">
        Six words come out, and they are not about the machine.
      </p>
    </ChapterLayout>
  );
}
