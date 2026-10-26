import raw from './services.json';

export type Bi = { es: string; en: string };
export interface ServiceData {
  slug: string;
  key: string;
  title: Bi;
  h1: Bi;
  metaTitle: Bi;
  metaDescription: Bi;
  intro: Bi;
  includes: { t: Bi; d: Bi }[];
  faqs: { q: Bi; a: Bi }[];
  related: string[];
  project: string | null;
  keywords: string;
}

export const SERVICES = raw as ServiceData[];
export const getServiceBySlug = (slug: string) => SERVICES.find(s => s.slug === slug);
export const getServiceByKey = (key: string) => SERVICES.find(s => s.key === key);
