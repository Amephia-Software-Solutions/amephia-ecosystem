type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ID real de la propiedad "amephia.com" en Google Analytics.
const FALLBACK_MEASUREMENT_ID = 'G-0WTCDH7SYM';

// Placeholders que han llegado a producción por la variable de entorno y que
// hicieron que el sitio reportara a una propiedad inexistente durante meses:
// la comprobación anterior solo descartaba 'G-XXXXXXXXXX', así que cualquier
// otro valor de relleno pasaba sin más y la medición se perdía en silencio.
const PLACEHOLDER_IDS = ['G-XXXXXXXXXX', 'G-ABC123XYZ', 'G-4WE576WZJ8'];

const envMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const GA_MEASUREMENT_ID =
  envMeasurementId && !PLACEHOLDER_IDS.includes(envMeasurementId)
    ? envMeasurementId
    : FALLBACK_MEASUREMENT_ID;

const ANALYTICS_ENABLED = Boolean(GA_MEASUREMENT_ID);

if (import.meta.env.DEV && envMeasurementId && PLACEHOLDER_IDS.includes(envMeasurementId)) {
  console.warn(
    `[analytics] VITE_GA_MEASUREMENT_ID="${envMeasurementId}" es un placeholder; ` +
      `se usa ${FALLBACK_MEASUREMENT_ID} en su lugar.`
  );
}

let analyticsInitialized = false;

const safeGtag = (...args: unknown[]) => {
  if (!ANALYTICS_ENABLED || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
};

export const initializeAnalytics = () => {
  if (!ANALYTICS_ENABLED || typeof window === 'undefined' || analyticsInitialized) return;
  analyticsInitialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID as string)}`;
  document.head.appendChild(script);

  safeGtag('js', new Date());
  safeGtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
};

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
  safeGtag('event', eventName, params);
};

export const trackPageView = (path: string, pageTitle?: string) => {
  if (typeof window === 'undefined') return;

  trackEvent('page_view', {
    page_title: pageTitle ?? document.title,
    page_path: path,
    page_location: `${window.location.origin}${path}`,
  });
};

export const trackContactClick = (channel: 'whatsapp' | 'email', context: string) => {
  trackEvent('contact_click', { channel, context });
};

export const trackLeadGenerated = (method: 'form' | 'whatsapp' | 'email', context: string) => {
  trackEvent('generate_lead', { method, context });
};

export const isAnalyticsEnabled = () => ANALYTICS_ENABLED;
