'use client';

import ChapterLayout, { Aside, Epigraph } from '@/components/ChapterLayout';
import ArchiveViewer, { ConcordanceCard } from '@/components/ArchiveViewer';
import { CHAPTERS } from '@/chapters/registry';
import { ARCHIVE, CONCORDANCE } from '@/data/archive';

const meta = CHAPTERS[8];

const wordCount = ARCHIVE.reduce(
  (n, f) => n + f.lines.reduce((m, l) => m + l.split(/\s+/).filter(Boolean).length, 0),
  0,
);
const lineCount = ARCHIVE.reduce((n, f) => n + f.lines.length, 0);

export default function Chapter09() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        The archive is not the puzzle.
        <br />
        The card is the puzzle.
      </Epigraph>

      <p>
        Fourteen folios: {wordCount.toLocaleString('en-US')} words over {lineCount} numbered
        lines. Working notes, a research diary, two tables kept for reference, and a certain
        amount of argument with myself. None of it is decoration — every folio is about something
        you have already had to do — but none of it is the answer either.
      </p>

      <p>
        A book cipher does not encrypt. It <em>points</em>. The text is public, the pointing is
        unambiguous, and the only secret is which coordinates somebody chose to write down.
      </p>

      <ArchiveViewer />

      <p>
        Loose in the same folder was this. Twenty-six entries, three numbers each, no key, no
        heading, no explanation of what the numbers count.
      </p>

      <ConcordanceCard />

      <Aside>
        A single character in a body of text needs four coordinates: which folio, which line,
        which word, which letter. You have been given three. The fourth is the same in every one
        of the {CONCORDANCE.length} entries — which is why it was not worth writing down.
      </Aside>

      <p>
        The counting convention is stated openly in the archive, in the folio that is about
        nothing else. Everything is numbered from one. Lines are numbered as printed. A word is a
        run of characters with no space in it, counted left to right, and punctuation travels
        with the word it is attached to. Hovering a word in the reader will show you its number,
        so that you can check the convention rather than assume it.
      </p>

      <p>
        Brute force is not available to you in any useful sense. Twenty-six coordinates chosen
        freely across two thousand words is a space of roughly{' '}
        <span className="tnum">10⁸⁶</span> orderings, and the archive is not large enough to
        contain a second sentence that reads as English.
      </p>

      <p className="!mb-0">
        What comes out is five words. It is a sentence, and it is also an instruction, and the
        thing it instructs you to do is the last thing this puzzle asks of you.
      </p>
    </ChapterLayout>
  );
}
