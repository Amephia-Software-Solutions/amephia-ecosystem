import type { ServiceData } from './services.ts';

export const SITE = 'https://amephia.com';
export const serviceUrl = (slug: string) => `${SITE}/servicios/${slug}`;

type Lang = 'es' | 'en';

export const serviceMeta = (s: ServiceData, lang: Lang = 'es') => ({
  title: s.metaTitle[lang],
  description: s.metaDescription[lang],
  keywords: s.keywords,
  canonical: serviceUrl(s.slug),
});

/** JSON-LD de una página de servicio: Service + BreadcrumbList + FAQPage (el FAQ coincide con el contenido visible). */
export const serviceJsonLd = (s: ServiceData, lang: Lang = 'es') => [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title[lang],
    serviceType: s.title[lang],
    description: s.metaDescription[lang],
    url: serviceUrl(s.slug),
    provider: { '@type': 'ProfessionalService', name: 'AmePhia Systems Inc.', url: SITE },
    areaServed: [{ '@type': 'Country', name: 'Ecuador' }, { '@type': 'Country', name: 'United States' }],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: lang === 'en' ? 'Services' : 'Servicios', item: `${SITE}/#servicios` },
      { '@type': 'ListItem', position: 3, name: s.title[lang], item: serviceUrl(s.slug) },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map(f => ({
      '@type': 'Question',
      name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
    })),
  },
];
