import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';
import type { ProjectId } from '../projects';

const OfferCard = ({
  icon,
  title,
  description,
  delay,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
    className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
    <p className="text-sm text-mutedText leading-relaxed">{description}</p>
  </motion.div>
);

const EcommerceIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 5h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const GymErpIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16M7 4v16m10-16v16" />
  </svg>
);

const AdvisoryIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h3m6 4H6a2 2 0 01-2-2V6a2 2 0 012-2h8.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V18a2 2 0 01-2 2z" />
  </svg>
);

const ShieldDataIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

interface ProductsSectionProps {
  onOpenProject?: (projectId: ProjectId) => void;
}

export const ProductsSection = ({ onOpenProject }: ProductsSectionProps) => {
  const { t } = useLanguage();
  const packageUrl = 'https://packagist.org/packages/amephia/sri-ec';

  const offers = [
    { projectId: 'shielddata' as const, titleKey: 'shielddataCardTitle' as const, descKey: 'shielddataCardDesc' as const, icon: <ShieldDataIcon /> },
    { projectId: 'gym' as const, titleKey: 'gymProductTitle' as const, descKey: 'gymProductDesc' as const, icon: <GymErpIcon /> },
    { projectId: 'ecommerce' as const, titleKey: 'ecommerceTitle' as const, descKey: 'ecommerceDesc' as const, icon: <EcommerceIcon /> },
    { projectId: 'advisory' as const, titleKey: 'advisoryTitle' as const, descKey: 'advisoryDesc' as const, icon: <AdvisoryIcon /> },
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary uppercase tracking-wider mb-4">
            {t('productsBadge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-4 tracking-tighter">
            {t('productsTitle')}
          </h2>
          <p className="text-lg text-mutedText max-w-3xl mx-auto">
            {t('productsSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* SHIELDDATA — Featured Product (NUEVO, máxima prioridad) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => onOpenProject?.('shielddata')}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenProject?.('shielddata');
          }
        }}
        role="button"
        tabIndex={0}
        className="group relative mb-6 bg-gradient-to-r from-blue-600/15 via-sky-500/5 to-amber-500/10 border border-blue-500/25 rounded-2xl p-6 md:p-8 hover:border-blue-400/50 transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400/40"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[10px] font-mono text-sky-300 uppercase tracking-wider">
                {t('shielddataBadge')}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-mutedText uppercase tracking-wider">
                <svg viewBox="0 0 18 12" className="h-2.5 w-[14px]" aria-hidden>
                  <rect width="18" height="6" fill="#FDD835" />
                  <rect y="6" width="18" height="3" fill="#1E40AF" />
                  <rect y="9" width="18" height="3" fill="#991B1B" />
                </svg>
                Hecho en Ecuador
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
              {t('shielddataFeaturedTitle')}
            </h3>
            <p className="text-mutedText max-w-2xl leading-relaxed">
              {t('shielddataFeaturedDesc')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-400/30 text-sky-300 font-medium rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-all whitespace-nowrap">
              {t('shielddataFeaturedCta')}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Migration SaaS — Featured Product */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => onOpenProject?.('migration')}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenProject?.('migration');
          }
        }}
        role="button"
        tabIndex={0}
        className="group relative mb-8 bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-3">
              {t('migrationSaasBadge')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {t('migrationSaasTitle')}
            </h3>
            <p className="text-mutedText max-w-2xl leading-relaxed">
              {t('migrationSaasDesc')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all whitespace-nowrap">
              {t('migrationSaasCta')}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <OfferCard
            key={offer.titleKey}
            icon={offer.icon}
            title={t(offer.titleKey)}
            description={t(offer.descKey)}
            delay={index * 0.1}
            onClick={() => onOpenProject?.(offer.projectId)}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10 bg-gradient-to-r from-primary/10 via-white/5 to-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-wider text-primary mb-3">
              {t('packageBadge')}
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">{t('packageTitle')}</h3>
            <p className="text-mutedText max-w-2xl">{t('packageDesc')}</p>
          </div>
          <a
            href={packageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            {t('packageCta')}
          </a>
        </div>
      </motion.div>
    </section>
  );
};
