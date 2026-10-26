import { trackContactClick, trackLeadGenerated } from '../lib/analytics';
import type { Language } from '../i18n';

/* ─── CONFIG & CONTACT ─────────────────────────────────── */
export const WA_NUMBER = '13347324056';

export const waURL = (lang: Language, ctx = 'hero', extraText = '') => {
  const msgsES: Record<string, string> = {
    hero: 'Hola AmePhia, les escribo desde su sitio web. Me gustaría conversar sobre un proyecto tecnológico para mi empresa. ¿Podemos agendar una llamada?',
    services: 'Hola AmePhia, vi sus servicios de ingeniería y desarrollo. Quisiera consultar por una solución a medida. ¿Tienen disponibilidad?',
    products: 'Hola AmePhia, me interesa conocer más sobre su suite de software y solicitar una demo en vivo. ¿Cuándo podemos coordinar?',
    diagnostic: extraText || 'Hola AmePhia, realicé el diagnóstico tecnológico en su web y me gustaría recibir una cotización formal.',
    cta: 'Hola AmePhia, queremos modernizar el software de nuestra empresa. ¿Cuándo podemos coordinar una reunión técnica?',
    floating: 'Hola AmePhia, quisiera información sobre sus servicios de software y arquitectura cloud.',
    footer: 'Hola AmePhia, me gustaría recibir más información sobre sus productos y desarrollos.',
  };

  const msgsEN: Record<string, string> = {
    hero: 'Hello AmePhia, I am contacting you from your website. I would like to discuss a software engineering project for my company. Can we schedule a call?',
    services: 'Hello AmePhia, I saw your engineering and development services and would like to inquire about a custom solution. Do you have availability?',
    products: 'Hello AmePhia, I am interested in your software suite and would like to request a live demo. When can we coordinate?',
    diagnostic: extraText || 'Hello AmePhia, I completed the technical diagnostic on your website and would like to receive a formal quotation.',
    cta: 'Hello AmePhia, we want to upgrade our company software architecture. When can we schedule a technical meeting?',
    floating: 'Hello AmePhia, I would like information regarding your software and cloud architecture services.',
    footer: 'Hello AmePhia, I would like to receive more information about your products and services.',
  };

  const msgs = lang === 'en' ? msgsEN : msgsES;
  const body = extraText || msgs[ctx] || msgs.hero;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
};

export const openWA = (lang: Language, ctx = 'hero', extraText = '') => {
  trackContactClick('whatsapp', `company_${ctx}`);
  trackLeadGenerated('whatsapp', `company_${ctx}`);
  window.open(waURL(lang, ctx, extraText), '_blank');
};
