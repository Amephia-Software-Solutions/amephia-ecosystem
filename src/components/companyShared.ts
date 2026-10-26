import type { Language } from '../i18n';

/* Texto bilingüe: cada cadena visible vive junto a su equivalente. */
export type L = { es: string; en: string };
export const pick = (l: L, lang: Language) => (lang === 'en' ? l.en : l.es);
