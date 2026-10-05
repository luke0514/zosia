'use client';

import ChapterLayout, { Aside, Epigraph } from '@/components/ChapterLayout';
import ComplexPlane, { PlaneTable } from '@/components/ComplexPlane';
import MathBlock, { M } from '@/components/MathBlock';
import { CHAPTERS } from '@/chapters/registry';

const meta = CHAPTERS[3];

export default function Chapter04() {
  return (
    <ChapterLayout meta={meta}>
      <Epigraph>
        The eye is not an instrument.
        <br />
        It never was.
      </Epigraph>

      <p>
        The zeta function begins as a sum that only converges to the right of one,
      </p>

      <MathBlock display>
        {'\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^{s}} = \\prod_{p \\text{ prime}} \\left(1 - p^{-s}\\right)^{-1}, \\qquad \\Re(s) > 1 ,'}
      </MathBlock>

      <p>
        and then continues, by an argument Riemann gave in eight pages in 1859, to the whole
        plane apart from a simple pole at <M>{'s = 1'}</M>. The product on the right is why
        anyone cares: it is the primes, written as an analytic object.
      </p>

      <p>
        There are trivial zeros at the negative even integers. The rest — the nontrivial ones —
        lie somewhere in the strip <M>{'0 < \\Re(s) < 1'}</M>. Every one that anyone has ever
        computed has had real part exactly <M>{'\\tfrac12'}</M>. Whether that is true of all of
        them is the Riemann Hypothesis, and it is not your problem today.
      </p>

      <Aside>
        To be explicit, because this matters: nothing in this chapter requires the hypothesis to
        be true, or false, or decided. It requires only that you can tell whether a particular
        given number is a zero, which is a finite computation with a definite answer.
      </Aside>

      <p>
        Below are fifty-three points in the critical strip. Some of them are nontrivial zeros of{' '}
        <M>{'\\zeta'}</M>. Most of them are not, and they are not marked, and there are two
        different ways of being a fraud here.
      </p>

      <ComplexPlane />

      <p>
        At low magnification every point lies on the critical line, because at low magnification
        everything lies on everything. Turn it up. Some of the points move away from{' '}
        <M>{'\\Re(s) = \\tfrac12'}</M> — by a few hundredths, no more, but a zero is not
        approximately on the line, it is on it.
      </p>

      <p>
        The ones that survive that test are still not all zeros. An ordinate can be plausible,
        can sit in the right range, can look exactly like the numbers in the tables, and still be
        a place where <M>{'\\zeta'}</M> simply does not vanish. Distinguishing those requires
        evaluating the function — <span className="italic">mpmath</span>,{' '}
        <span className="italic">PARI/GP</span>, a published table of zeros, whatever you like.
        There is no way to see it.
      </p>

      <PlaneTable />

      <p>
        When you have the survivors, put them in order. There is only one natural order for a set
        of ordinates and you already know what it is.
      </p>

      <p className="!mb-0">
        Then read them. Each one contributes exactly one letter, and it comes from the part of the
        number that survives when you throw away everything after the decimal point.
      </p>
    </ChapterLayout>
  );
}
