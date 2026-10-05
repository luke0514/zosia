import { ANSWER_HASHES } from '@/data/sealed';

/**
 * Chapter metadata and hint ladders.  Content lives in the per-chapter components;
 * this file is only the spine — order, titles, answer digests, hints.
 *
 * Adding a chapter means: append an entry here, add a Chapter11.tsx, register it in
 * components.ts, and add its digest to src/data/sealed.ts.  Nothing else.
 */

export interface Hint {
  level: 1 | 2 | 3 | 4;
  text: string;
  /** Minutes on the chapter after which the hint may be opened without a warning. */
  afterMinutes: number;
  /** ...or this many wrong answers, whichever comes first. */
  afterAttempts: number;
}

export interface ChapterMeta {
  id: string;
  order: number;
  slug: string;
  numeral: string;
  title: string;
  /** The one-line theme shown under the title. */
  theme: string;
  /** Placeholder in the answer field — never a hint about the content. */
  placeholder: string;
  answerHash: string;
  hints: Hint[];
  /** Chapters whose answers this one consumes.  Shown as a dependency note. */
  dependsOn?: number[];
  status: 'implemented' | 'partial';
}

const LADDER: Array<Pick<Hint, 'afterMinutes' | 'afterAttempts'>> = [
  { afterMinutes: 12, afterAttempts: 3 },
  { afterMinutes: 60, afterAttempts: 8 },
  { afterMinutes: 240, afterAttempts: 16 },
  { afterMinutes: 720, afterAttempts: 28 },
];

const hints = (texts: [string, string, string, string]): Hint[] =>
  texts.map((text, i) => ({ level: (i + 1) as 1 | 2 | 3 | 4, text, ...LADDER[i] }));

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'ch01',
    order: 1,
    slug: 'the-beginning',
    numeral: '01',
    title: 'THE BEGINNING',
    theme: 'The Matrix That Remembers',
    placeholder: 'four words',
    answerHash: ANSWER_HASHES.ch01,
    status: 'implemented',
    hints: hints([
      'The question printed at the top of the page is not the question you are being asked. Read the page again and separate what is argument from what is data.',
      'The search is described as having failed, and it did. A failed search still leaves a record behind it. Ask what the record contains that the conclusion does not.',
      'Fifteen rows, and the answer is fifteen letters long. Every row already carries a number far larger than twenty-six. Reduce it.',
      'Sort the rows by the run column rather than by p. For each row take α(p) mod 26 and read the result as a letter of the alphabet with A = 0.',
    ]),
  },
  {
    id: 'ch02',
    order: 2,
    slug: 'the-mirror',
    numeral: '02',
    title: 'THE MIRROR',
    theme: 'Two Faces of a Prime',
    placeholder: 'four words',
    answerHash: ANSWER_HASHES.ch02,
    status: 'implemented',
    hints: hints([
      'Every prime on this page is congruent to one modulo four. Fermat has something to say about exactly that class of prime, and he said it in 1640.',
      'Each of these primes is a sum of two squares in exactly one way. So each prime hands you two numbers. You need both of them, but not for the same purpose.',
      'The primes are printed in ascending order and that is the wrong order. Put each one in the complex plane as a + bi and look at the angle it makes.',
      'Sort by arg(a + bi) ascending. Then take the smaller of the two components, reduce it modulo 26, and read it as a letter with A = 0.',
    ]),
  },
  {
    id: 'ch03',
    order: 3,
    slug: 'the-broken-key',
    numeral: '03',
    title: 'THE BROKEN KEY',
    theme: 'A Modulus With a History',
    placeholder: 'five words',
    answerHash: ANSWER_HASHES.ch03,
    status: 'implemented',
    hints: hints([
      'The exponent is ordinary and the ciphertext is ordinary. Everything unusual about this chapter is in n itself.',
      'Two 512-bit primes do not have to be far apart, and nothing in RSA forces them to be. Compute the integer square root of n and ask how far you would have to walk from there.',
      'Fermat factorisation: look for a, b with n = a² − b², starting at a = ⌈√n⌉ and stepping up. Here it converges in a few million iterations, which is seconds of machine time.',
      'There is a second and much faster route, and the chapter title is pointing at it. Truncate φ = (1+√5)/2 to 511 binary places, take the next prime, and you have p. Then d = e⁻¹ mod (p−1)(q−1), m = c^d mod n, and read m as big-endian ASCII.',
    ]),
  },
  {
    id: 'ch04',
    order: 4,
    slug: 'the-zeroes',
    numeral: '04',
    title: 'THE ZEROES',
    theme: 'Points That Only Look Alike',
    placeholder: 'three words',
    answerHash: ANSWER_HASHES.ch04,
    status: 'implemented',
    dependsOn: [],
    hints: hints([
      'Fifty-three points are plotted. Fifty-three zeros are not.',
      'There are two different kinds of impostor here. One kind gives itself away geometrically, if you zoom in far enough. The other looks perfect and only fails a numerical test.',
      'Keep the points where ζ(s) genuinely vanishes — real part exactly one half, and an ordinate that appears in the tables. Then order the survivors by imaginary part, ascending.',
      'For each surviving zero take the floor of its imaginary part, reduce modulo 26, and read it as a letter with A = 0.',
    ]),
  },
  {
    id: 'ch05',
    order: 5,
    slug: 'the-curve',
    numeral: '05',
    title: 'THE CURVE',
    theme: 'A Logarithm That Should Have Been Hard',
    placeholder: 'four words',
    answerHash: ANSWER_HASHES.ch05,
    status: 'implemented',
    hints: hints([
      'You are given a curve, a base point G and a second point Q. Exactly one number relates them, and that number is the whole chapter.',
      'Before attacking the logarithm, compute the order of G. Then factor it. The factorisation is the point.',
      'Every prime factor of ord(G) is below 2²⁰. Pohlig–Hellman splits the logarithm into one small problem per prime power, each solvable by baby-step giant-step in milliseconds, then reassembles k by the Chinese Remainder Theorem.',
      'Once you have k, write it in base 26, map each digit to a letter with 0 = A, and use the result as a Vigenère key to decrypt the ciphertext on the page.',
    ]),
  },
  {
    id: 'ch06',
    order: 6,
    slug: 'the-image',
    numeral: '06',
    title: 'THE IMAGE',
    theme: 'A Plate That Is Also a File',
    placeholder: 'four words',
    answerHash: ANSWER_HASHES.ch06,
    status: 'implemented',
    hints: hints([
      'Nothing depicted in the photograph is the message. Stop looking at the picture and start looking at the file.',
      'Read the metadata. It will not hand you the answer, but two of its three fields are telling the truth, and one of them is a fraction.',
      'One bit out of every eight: the least significant bit of a single colour channel, read pixel by pixel in the order the rows are stored.',
      'Blue channel, least significant bit, row-major, most-significant-bit-first within each byte, terminated by a zero byte, decoded as UTF-8. Keep the Polish diacritics; they are part of the answer.',
    ]),
  },
  {
    id: 'ch07',
    order: 7,
    slug: 'the-polish-connection',
    numeral: '07',
    title: 'THE POLISH CONNECTION',
    theme: 'Cycles That Do Not Care About the Plugboard',
    placeholder: 'one word',
    answerHash: ANSWER_HASHES.ch07,
    status: 'implemented',
    hints: hints([
      'Every group is six letters and every group encrypts a three-letter key that was typed twice. That doubling is the entire mistake.',
      'Position 1 and position 4 are the same plaintext letter, enciphered six steps apart. So are 2 and 5, and 3 and 6. Each pairing defines a permutation of the alphabet; build all three.',
      'Their cycles come in pairs of equal length, always, and the multiset of lengths does not change when the plugboard changes. That invariance is a theorem, proved in Poznań in 1932 by a twenty-seven-year-old who had been given a problem three countries called impossible.',
      'The man was Marian Rejewski. The answer here is not his name — it is the name of the thing he broke. Six letters.',
    ]),
  },
  {
    id: 'ch08',
    order: 8,
    slug: 'the-machine',
    numeral: '08',
    title: 'THE MACHINE',
    theme: 'Four Questions, Three Unanswered',
    placeholder: 'six words',
    answerHash: ANSWER_HASHES.ch08,
    dependsOn: [1, 2, 3],
    status: 'implemented',
    hints: hints([
      'The reflector and the plugboard are on the key sheet. Three things are missing, and all three were written down in chapters you have already finished.',
      'Each of the first three chapters ends in a sentence. Take those sentences and look only at where the letters start.',
      'From each of chapters 01, 02 and 03, take the first three DISTINCT letters of its message. Chapter 02 gives the ring setting directly. Chapter 03 gives the ground setting directly. Chapter 01 has to become wheel numbers.',
      'Chapter 01 gives L, O, K. Counting the alphabet from one: 12, 15, 11. Reduce mod 5 and add one: 3, 1, 2 — so wheels III, I, II from the left. Rings PRI, ground THE, reflector B, plugboard as printed.',
    ]),
  },
  {
    id: 'ch09',
    order: 9,
    slug: 'the-library',
    numeral: '09',
    title: 'THE LIBRARY',
    theme: 'Coordinates Into a Body of Text',
    placeholder: 'five words',
    answerHash: ANSWER_HASHES.ch09,
    status: 'implemented',
    hints: hints([
      'The archive is not the puzzle. The card is the puzzle, and the archive is only what it points at.',
      'Four numbers would identify a single character. You have been given three. The fourth is the same for every entry on the card.',
      'Folio, line, word — all counted from one, exactly as the text is printed, with punctuation travelling with the word it is attached to. One letter comes out of each word.',
      'It is the first letter of each of the twenty-six words. The sentence you assemble is also the instruction for the chapter after this one.',
    ]),
  },
  {
    id: 'ch10',
    order: 10,
    slug: 'the-question',
    numeral: '10',
    title: 'THE QUESTION',
    theme: '—',
    placeholder: 'thirty-six letters',
    answerHash: ANSWER_HASHES.ch10,
    status: 'implemented',
    hints: hints([
      'You have nine sentences. Nothing outside them is needed, and nothing inside them is spare.',
      'The instruction you were given at the end of the archive was meant literally.',
      'Every word of every message, taken in chapter order, contributes exactly one character.',
      'The first letter of every word of all nine messages, in order, run together with no spaces. Thirty-six letters.',
    ]),
  },
];

export const CHAPTER_IDS = CHAPTERS.map((c) => c.id);

export function chapterBySlug(slug: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function chapterByOrder(order: number): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.order === order);
}
