import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ?lang=en es la URL que anunciamos en el hreflang de index.html y en el
// sitemap. Hasta ahora nadie la leía, así que esa URL servía español y le
// prometíamos a Google una versión en inglés que no existía como dirección.
const getLanguageFromUrl = (): Language | null => {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('lang');
  return param && param in translations ? (param as Language) : null;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // La URL manda sobre la preferencia guardada: un enlace compartido o
      // rastreado tiene que servir siempre el idioma que anuncia.
      const fromUrl = getLanguageFromUrl();
      if (fromUrl) return fromUrl;

      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) return saved;
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') return 'es';
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    if (typeof window === 'undefined') return;
    // Mantener la URL en sintonía para que sea compartible y coincida con lo
    // que declara el hreflang: / en español, /?lang=en en inglés.
    const url = new URL(window.location.href);
    if (lang === 'es') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
