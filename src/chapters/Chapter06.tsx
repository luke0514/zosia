'use client';

import ChapterLayout, { Aside, Epigraph, Panel } from '@/components/ChapterLayout';
import { CHAPTERS } from '@/chapters/registry';
import { asset } from '@/lib/paths';

const meta = CHAPTERS[5];

export default function Chapter06() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        People read the photograph.
        <br />
        Almost nobody reads the file.
      </Epigraph>

      <p>
        This is plate VII. It is a night sky: fifteen hundred stars, a survey grid, four
        registration marks at the corners. There is nothing wrong with it and there is nothing
        clever in it. It is a picture of nothing in particular.
      </p>

      <figure className="my-10">
        <img
          src={asset("/puzzles/plate-vii.png")}
          alt="An astrometric plate: a dark night sky scattered with stars, overlaid with a faint survey grid and four corner registration marks."
          width={1400}
          height={900}
          className="w-full border border-ink-600"
          loading="lazy"
        />
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ink-500">
          <span>plate VII — 1400 × 900, PNG, 24-bit</span>
          <a
            href={asset("/puzzles/plate-vii.png")}
            download
            className="text-steel underline underline-offset-[6px] hover:text-signal"
          >
            ↓ download the original
          </a>
        </figcaption>
      </figure>

      <p>
        Download it. Do not view it — <em>open</em> it. An image is a very large number wearing a
        picture, and the picture is the part designed to occupy your attention.
      </p>

      <Panel title="What you will need" note="nothing proprietary">
        <ul className="space-y-2 font-mono text-[12.5px] leading-relaxed text-parchment/85">
          <li>· Python with Pillow, or ImageMagick, or anything that reads pixels</li>
          <li>· a way to look at the PNG&rsquo;s ancillary chunks — exiftool, exiv2, pngcheck</li>
          <li>· patience for exactly one wrong guess about which channel</li>
        </ul>
      </Panel>

      <Aside>
        The metadata is worth reading before you write any code. It is not the answer. Two of its
        three interesting fields are telling you the truth, one of them is a fraction, and one of
        them is pointing at a chapter you have not reached yet.
      </Aside>

      <p>
        What comes out is a sentence, and it is not in English. Leave it in the language it is in
        — the diacritics are correct and they are part of the answer. Type it however your
        keyboard allows; accents and spacing are ignored when it is checked.
      </p>

      <p className="!mb-0">
        It is four words. It is a statement of fact, and it is where this puzzle stops being
        about mathematics in the abstract.
      </p>
    </ChapterLayout>
  );
}
