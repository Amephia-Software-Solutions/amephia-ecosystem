import { useState, useEffect, useRef } from 'react';
import {
  Users,
  ShoppingCart,
  FileText,
  Package,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Zap,
  DollarSign,
  Dumbbell,
  CreditCard,
  Calculator,
  ChevronLeft,
  Star,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   WHATSAPP HELPER
   ────────────────────────────────────────────── */
const WA_NUMBER = '593986059727';

const waURL = (plan?: string) => {
  const msgs: Record<string, string> = {
    basico: `Hola! Me interesa el Plan BÁSICO ($29/mes) de AMEPHIA GYM. ¿Pueden darme más información?`,
    profesional: `Hola! Quiero el Plan PROFESIONAL ($59/mes) de AMEPHIA GYM. Quiero agendar una demo.`,
    enterprise: `Hola! Necesito información sobre el Plan ENTERPRISE ($99/mes) de AMEPHIA GYM para mi cadena de gimnasios.`,
  };
  const msg =
    msgs[plan ?? ''] ??
    `Hola! Me interesa AMEPHIA GYM. ¿Pueden agendar una demo?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
};

/* ──────────────────────────────────────────────
   ANIMATED COUNTER
   ────────────────────────────────────────────── */
const Counter = ({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = Math.ceil(end / (duration / 16));
          let cur = 0;
          const tick = () => {
            cur = Math.min(cur + step, end);
            setVal(cur);
            if (cur < end) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
};

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
const GymLanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  /* — data — */
  const modules = [
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Gestión de Miembros',
      desc: 'Registro completo, fotos, cédula, contacto de emergencia. Búsqueda instantánea y perfil con días restantes, historial de pagos y check-ins.',
      color: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      accent: 'text-blue-400',
    },
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: 'Suscripciones & Planes',
      desc: 'Planes flexibles: diario, semanal, mensual, trimestral, anual. Vencimientos automáticos, renovación y congelamiento de membresías.',
      color: 'from-violet-500/20 to-violet-600/10',
      border: 'border-violet-500/30',
      accent: 'text-violet-400',
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Facturación Electrónica SRI',
      desc: 'Firma digital P12, envío automático al SRI, RIDE en PDF. Notas de crédito, retenciones. 100% cumplimiento tributario Ecuador.',
      color: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      accent: 'text-emerald-400',
    },
    {
      icon: <ShoppingCart className="w-7 h-7" />,
      title: 'Punto de Venta (POS)',
      desc: 'Interfaz táctil para ventas rápidas. Bebidas, suplementos, accesorios. Múltiples métodos de pago. Facturación automática.',
      color: 'from-pink-500/20 to-pink-600/10',
      border: 'border-pink-500/30',
      accent: 'text-pink-400',
    },
    {
      icon: <Package className="w-7 h-7" />,
      title: 'Inventario & Stock',
      desc: 'Stock en tiempo real, alertas de bajo stock, movimientos de entrada/salida, ajustes de inventario con trazabilidad completa.',
      color: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
    },
    {
      icon: <DollarSign className="w-7 h-7" />,
      title: 'Caja Registradora',
      desc: 'Apertura y cierre de caja por turnos. Arqueo automático, detección de diferencias. Historial completo de movimientos.',
      color: 'from-purple-500/20 to-purple-600/10',
      border: 'border-purple-500/30',
      accent: 'text-purple-400',
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: 'Contabilidad NIIF',
      desc: 'Plan de cuentas completo, Libro Diario, Mayor, Balance de Comprobación. Estados financieros automáticos para PYMES Ecuador.',
      color: 'from-teal-500/20 to-teal-600/10',
      border: 'border-teal-500/30',
      accent: 'text-teal-400',
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Dashboard & Reportes',
      desc: 'Dashboard en tiempo real. Ingresos, membresías activas, ventas del día, gastos. Reportes exportables a PDF.',
      color: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30',
      accent: 'text-amber-400',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Seguridad & Roles',
      desc: '4 roles: Admin, Cajero, Contador, Entrenador. Cada persona ve solo lo que necesita. Bitácora de auditoría completa.',
      color: 'from-red-500/20 to-red-600/10',
      border: 'border-red-500/30',
      accent: 'text-red-400',
    },
  ];

  const beforeAfter = [
    { process: 'Registro de miembro', before: '15 min (papel)', after: '2 minutos' },
    { process: 'Cobro + Factura', before: '10 min (manual SRI)', after: '30 segundos' },
    { process: 'Cierre de caja', before: '45 min (contar)', after: '5 minutos' },
    { process: 'Reporte mensual', before: '1-2 días (Excel)', after: '1 clic (tiempo real)' },
    { process: 'Control vencimientos', before: 'Revisión manual', after: 'Alertas automáticas' },
    { process: 'Declaración SRI', before: 'Contador externo', after: 'Datos listos al instante' },
    { process: 'Inventario', before: '"Creo que quedan..."', after: 'Stock exacto + alertas' },
  ];

  const plans = [
    {
      name: 'Básico',
      price: 29,
      members: '100',
      desc: 'Para gimnasios nuevos o pequeños',
      accent: 'cyan',
      features: [
        'Gestión de Miembros',
        'Suscripciones & Planes',
        'Facturación Electrónica SRI',
        'Punto de Venta (POS)',
        'Caja Registradora',
        'Dashboard & Reportes',
        '2 usuarios incluidos',
      ],
      notIncluded: ['Inventario & Stock', 'Contabilidad NIIF', 'Soporte prioritario'],
      cta: 'Empezar Ahora',
      wa: 'basico',
    },
    {
      name: 'Profesional',
      price: 59,
      members: '300',
      desc: 'Todo incluido para crecer',
      accent: 'blue',
      badge: 'MÁS POPULAR',
      features: [
        'Gestión de Miembros',
        'Suscripciones & Planes',
        'Facturación Electrónica SRI',
        'Punto de Venta (POS)',
        'Caja Registradora',
        'Dashboard & Reportes',
        'Inventario & Stock',
        'Contabilidad NIIF PYMES',
        '4 Roles + Usuarios ilimitados',
        'Soporte técnico incluido',
      ],
      notIncluded: [],
      cta: '¡Lo Quiero!',
      wa: 'profesional',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 99,
      members: 'Ilimitados',
      desc: 'Para cadenas y franquicias',
      accent: 'amber',
      features: [
        'Todo del plan Profesional',
        'Miembros ilimitados',
        'Multi-sucursal',
        'API de integración',
        'Soporte prioritario 24/7',
        'Reportes avanzados',
        'Backup dedicado',
        'Capacitación incluida',
        'Personalización de marca',
        'Servidor dedicado',
      ],
      notIncluded: [],
      cta: 'Contactar Ventas',
      wa: 'enterprise',
    },
  ];

  const competitors = [
    { name: 'GymMaster', price: '$89–$249', sri: false, contab: false, pos: true, inv: false, origin: 'Nueva Zelanda' },
    { name: 'Mindbody', price: '$139–$699', sri: false, contab: false, pos: true, inv: false, origin: 'EE.UU.' },
    { name: 'Glofox', price: '$110–$300', sri: false, contab: false, pos: true, inv: false, origin: 'Irlanda' },
    { name: 'Contifico', price: '$15–$50', sri: true, contab: true, pos: false, inv: false, origin: 'Ecuador' },
    { name: 'GymPro EC', price: '$30–$100', sri: false, contab: false, pos: false, inv: false, origin: 'Ecuador' },
  ];

  const faqs = [
    {
      q: '¿Necesito conocimientos técnicos para usar AMEPHIA GYM?',
      a: 'No. La plataforma fue diseñada para ser intuitiva. Si sabes usar un celular, puedes usar AMEPHIA GYM. Además, incluimos capacitación gratuita para todo tu equipo en los planes Profesional y Enterprise.',
    },
    {
      q: '¿Cómo funciona la facturación electrónica SRI?',
      a: 'Solo necesitas tu certificado de firma electrónica (.p12) y los datos de tu empresa. AMEPHIA firma digitalmente cada factura, la envía al SRI, recibe la autorización y genera el RIDE en PDF automáticamente. Todo en segundos, sin intervención manual.',
    },
    {
      q: '¿Puedo migrar los datos de mi sistema actual?',
      a: 'Sí. Nuestro equipo te ayuda con la migración de miembros, planes y datos históricos. En el plan Enterprise la migración está incluida sin costo adicional.',
    },
    {
      q: '¿Qué pasa si necesito más de 300 miembros en el plan Profesional?',
      a: 'Puedes actualizar al plan Enterprise en cualquier momento. El cambio es inmediato y se prorratea la diferencia. Sin penalidades ni contratos largos.',
    },
    {
      q: '¿Funciona en tablet y celular?',
      a: 'Sí. AMEPHIA GYM es 100% web y responsive. Funciona en cualquier dispositivo con navegador: PC, tablet o celular. El POS está optimizado especialmente para pantallas táctiles.',
    },
    {
      q: '¿Mis datos están seguros?',
      a: 'Absolutamente. Usamos encriptación AES-256 para certificados, HTTPS obligatorio, protección CSRF, roles granulares con Spatie y bitácora de auditoría de cada acción. Backups automáticos diarios.',
    },
    {
      q: '¿Hay contrato de permanencia?',
      a: 'No. Puedes cancelar en cualquier momento. Sin penalidades, sin letras pequeñas. Creemos que te quedas porque el producto es bueno, no porque estás atrapado.',
    },
  ];

  const testimonials = [
    {
      name: 'Carlos R.',
      role: 'Dueño - FitZone Gym',
      text: 'Antes cerraba caja en 45 minutos y siempre había diferencias. Con AMEPHIA lo hago en 5 minutos y cuadra perfecto. La facturación SRI automática me ahorró el contador externo.',
      metric: '-80% tiempo admin',
    },
    {
      name: 'María S.',
      role: 'Administradora - CrossFit EC',
      text: 'Mis miembros ya no preguntan cuándo se les vence el plan. Lo ven en su perfil. Las ventas del POS se facturan solas. Estoy feliz.',
      metric: '0 quejas de facturación',
    },
    {
      name: 'Diego L.',
      role: 'Gerente - Iron Academy',
      text: 'Pasamos de Excel a AMEPHIA en un día. Ahora tenemos reportes reales, inventario controlado y la contabilidad lista para el SRI sin estrés.',
      metric: 'ROI en 3 semanas',
    },
  ];

  /* — nav scroll — */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Módulos', id: 'modulos' },
    { label: 'Comparativa', id: 'comparativa' },
    { label: 'Precios', id: 'precios' },
    { label: 'FAQ', id: 'faq' },
  ];

  /* — FAQ Schema JSON-LD — */
  useEffect(() => {
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const existing = document.querySelector('script[data-seo="faq"]');
    if (existing) {
      existing.textContent = JSON.stringify(faqLd);
    } else {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'faq');
      s.textContent = JSON.stringify(faqLd);
      document.head.appendChild(s);
    }
    return () => { document.querySelector('script[data-seo="faq"]')?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans antialiased overflow-x-hidden" role="document">
      {/* ═══════════════════════════════════════════
          NAV
         ═══════════════════════════════════════════ */}
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050510]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => { window.history.pushState(null, '', '/'); window.location.reload(); }}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline">AmePhia</span>
          </button>

          <div className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg tracking-tight">
              AMEPHIA <span className="text-blue-400">GYM</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all"
            >
              Solicitar Demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenu}
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenu ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenu ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenu ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a18]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block text-white/70 hover:text-white text-base"
              >
                {l.label}
              </button>
            ))}
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 text-white text-center font-semibold px-5 py-3 rounded-lg"
            >
              Solicitar Demo
            </a>
          </div>
        )}
      </nav>

      <main>
      {/* ═══════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Plataforma #1 para Gimnasios en Ecuador
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Software para Gimnasios
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              con Facturación SRI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            ERP completo para gimnasios en Ecuador: membresías, facturación electrónica SRI,
            punto de venta, inventario, contabilidad NIIF y reportes. Desde <strong className="text-white">$29/mes</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              Solicitar Demo Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => scrollTo('precios')}
              className="border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/5"
            >
              Ver Precios
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> 100% cumplimiento SRI
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Acceso web 24/7
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Sin contrato
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" /> Soporte en español
            </span>
          </div>
        </div>

        {/* Hero screenshot - Dashboard */}
        <div className="max-w-6xl mx-auto mt-16 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            <img
              src="/assets/screenshots/dashboard.png"
              alt="AMEPHIA GYM - Dashboard ejecutivo"
              className="relative w-full rounded-xl border border-white/10 shadow-2xl shadow-black/50"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
         ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: 9, suffix: '', label: 'Módulos Integrados', color: 'text-blue-400' },
            { val: 100, suffix: '%', label: 'Cumplimiento SRI', color: 'text-emerald-400' },
            { val: 4, suffix: '', label: 'Roles de Usuario', color: 'text-violet-400' },
            { val: 10, suffix: 'x', label: 'ROI Estimado', color: 'text-amber-400' },
          ].map((s, i) => (
            <div key={i}>
              <div className={`text-4xl md:text-5xl font-extrabold font-mono ${s.color}`}>
                <Counter end={s.val} suffix={s.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROBLEM
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">El problema</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Sin un sistema integrado,
              <br />
              su negocio <span className="text-red-400">pierde dinero</span> cada día
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Estos problemas afectan a la mayoría de gimnasios que usan procesos manuales o sistemas desconectados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📋', title: 'Control Manual', desc: 'Cuadernos, Excel y WhatsApp para gestionar miembros. Información dispersa y sin respaldo.' },
              { icon: '💸', title: 'Fugas de Dinero', desc: 'Sin control de caja en tiempo real, ventas no registradas y cobros que se olvidan.' },
              { icon: '🧾', title: 'Facturación Manual', desc: 'Facturas en papel, riesgo de multas del SRI, y pérdida de tiempo generando comprobantes.' },
              { icon: '📦', title: 'Inventario Invisible', desc: 'No sabe cuántos productos tiene, cuánto ha vendido, ni cuándo debe reabastecer.' },
              { icon: '📊', title: 'Sin Reportes', desc: 'Toma decisiones a ciegas. No sabe qué plan vende más, ni el horario pico del gym.' },
              { icon: '⚖️', title: 'Riesgo Legal', desc: 'Sin contabilidad formal ni declaraciones al SRI. Multas y sanciones potenciales.' },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all"
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-red-400 mb-2">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODULES
         ═══════════════════════════════════════════ */}
      <section id="modulos" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Ecosistema completo</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              9 módulos de gestión. <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Un solo software.</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Cada aspecto de su gimnasio, integrado en una plataforma web moderna accesible desde cualquier dispositivo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${m.color} border ${m.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200`}
              >
                <div className={`${m.accent} mb-4`}>{m.icon}</div>
                <h3 className="font-bold text-white mb-2">{m.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCREENSHOTS SHOWCASE
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">El sistema real</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Así se ve <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">por dentro</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Capturas reales del sistema en producción. Sin mockups, sin renders. Lo que ve es lo que obtiene.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: '/assets/screenshots/pos.png', label: 'Punto de Venta (POS)', desc: 'Interfaz táctil para ventas rápidas' },
              { src: '/assets/screenshots/member-profile.png', label: 'Perfil de Miembro', desc: 'Suscripción, pagos y check-ins' },
              { src: '/assets/screenshots/products.png', label: 'Inventario & Productos', desc: 'Stock en tiempo real con SKU' },
              { src: '/assets/screenshots/reports.png', label: 'Reportes Financieros', desc: 'Balance, Mayor, Estado de Resultados' },
            ].map((s, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-xl border border-white/5 hover:border-white/10 transition-all">
                  <img
                    src={s.src}
                    alt={`AMEPHIA GYM - ${s.label}`}
                    className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                    <div className="font-bold text-sm">{s.label}</div>
                    <div className="text-xs text-white/50">{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width members list */}
          <div className="mt-6 group">
            <div className="relative overflow-hidden rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <img
                src="/assets/screenshots/members-list.png"
                alt="AMEPHIA GYM - Lista de miembros"
                className="w-full transition-transform duration-500 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                <div className="font-bold text-sm">Gestión de Miembros</div>
                <div className="text-xs text-white/50">Búsqueda, filtros, estado de suscripción y acciones rápidas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BEFORE / AFTER
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Transformación Digital</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Antes vs <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Después</span>
            </h2>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/5">
              <div className="px-6 py-4">Proceso</div>
              <div className="px-6 py-4 text-center text-red-400">Sin sistema</div>
              <div className="px-6 py-4 text-center text-emerald-400">Con AMEPHIA</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 text-sm ${
                  i < beforeAfter.length - 1 ? 'border-b border-white/5' : ''
                } hover:bg-white/[0.02] transition-colors`}
              >
                <div className="px-6 py-4 text-white/70 font-medium">{row.process}</div>
                <div className="px-6 py-4 text-center text-red-400/70">{row.before}</div>
                <div className="px-6 py-4 text-center text-emerald-400 font-semibold">{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROI
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Retorno de inversión</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight mb-16">
            El sistema <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">se paga solo</span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { val: 320, label: 'Ahorro mensual en\ntiempo administrativo', color: 'text-emerald-400' },
              { val: 150, label: 'Recuperación por\ncobros no olvidados', color: 'text-amber-400' },
              { val: 200, label: 'Ahorro en contador\nexterno para SRI', color: 'text-blue-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
                <div className={`text-4xl font-extrabold font-mono ${s.color}`}>
                  <Counter end={s.val} prefix="$" />
                </div>
                <div className="text-sm text-white/40 mt-3 whitespace-pre-line">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Ahorro Mensual</div>
              <div className="text-5xl font-extrabold font-mono text-emerald-400">$670+</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/10" />
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Ahorro Anual</div>
              <div className="text-5xl font-extrabold font-mono text-amber-400">$8,040+</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/10" />
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-2">ROI Estimado</div>
              <div className="text-5xl font-extrabold font-mono text-blue-400">10x</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Testimonios</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Lo que dicen <span className="text-violet-400">nuestros clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-violet-500/20 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    {t.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET COMPARISON
         ═══════════════════════════════════════════ */}
      <section id="comparativa" className="py-24 px-6 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Comparativa de mercado</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Otras herramientas <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">cuestan mucho más</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Y la mayoría no incluye facturación SRI ni contabilidad NIIF para Ecuador.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden mb-10">
            <div className="grid grid-cols-7 text-xs font-bold uppercase tracking-wider text-white/30 border-b border-white/5">
              <div className="px-5 py-4 col-span-1">Plataforma</div>
              <div className="px-5 py-4 text-center">Precio/mes</div>
              <div className="px-5 py-4 text-center">SRI</div>
              <div className="px-5 py-4 text-center">Contab.</div>
              <div className="px-5 py-4 text-center">POS</div>
              <div className="px-5 py-4 text-center">Inventario</div>
              <div className="px-5 py-4 text-center">Origen</div>
            </div>
            {competitors.map((c, i) => (
              <div key={i} className="grid grid-cols-7 text-sm border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <div className="px-5 py-4 font-semibold">{c.name}</div>
                <div className="px-5 py-4 text-center text-red-400 font-semibold">{c.price}</div>
                <div className="px-5 py-4 text-center">{c.sri ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400/50 mx-auto" />}</div>
                <div className="px-5 py-4 text-center">{c.contab ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400/50 mx-auto" />}</div>
                <div className="px-5 py-4 text-center">{c.pos ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400/50 mx-auto" />}</div>
                <div className="px-5 py-4 text-center">{c.inv ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-red-400/50 mx-auto" />}</div>
                <div className="px-5 py-4 text-center text-white/40 text-xs">{c.origin}</div>
              </div>
            ))}
            {/* AMEPHIA row */}
            <div className="grid grid-cols-7 text-sm bg-gradient-to-r from-blue-500/10 to-emerald-500/10">
              <div className="px-5 py-4 font-extrabold text-blue-400">AMEPHIA GYM</div>
              <div className="px-5 py-4 text-center text-emerald-400 font-extrabold text-lg">$59</div>
              <div className="px-5 py-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></div>
              <div className="px-5 py-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></div>
              <div className="px-5 py-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></div>
              <div className="px-5 py-4 text-center"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></div>
              <div className="px-5 py-4 text-center text-emerald-400 font-semibold text-xs">Ecuador</div>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 mb-10">
            {competitors.map((c, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-white/40">{c.origin}</div>
                </div>
                <div className="text-red-400 font-bold text-sm">{c.price}</div>
              </div>
            ))}
            <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-blue-400">AMEPHIA GYM</div>
                <div className="text-xs text-emerald-400">SRI + Contab + POS + Inventario</div>
              </div>
              <div className="text-emerald-400 font-extrabold text-xl">$59</div>
            </div>
          </div>

          {/* Savings badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Ahorro vs GymMaster', val: 'hasta 76%' },
              { label: 'Ahorro vs Mindbody', val: 'hasta 92%' },
              { label: 'Única con SRI + NIIF', val: '100%' },
            ].map((b, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-center">
                <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{b.label}</div>
                <div className="text-xl font-extrabold font-mono text-emerald-400">{b.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING
         ═══════════════════════════════════════════ */}
      <section id="precios" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Planes & precios</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
              Planes y precios{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                para su gimnasio
              </span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Sin contratos. Cancele cuando quiera. Actualice o baje de plan en cualquier momento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((p, i) => {
              const isHL = p.highlighted;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-8 transition-all ${
                    isHL
                      ? 'bg-gradient-to-b from-blue-500/10 to-blue-600/5 border-2 border-blue-500/40 shadow-2xl shadow-blue-500/10 scale-[1.03]'
                      : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                      {p.badge}
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mt-3">
                      <span className="text-5xl font-extrabold font-mono">${p.price}</span>
                      <span className="text-white/40">/mes</span>
                    </div>
                    <div className={`text-sm mt-2 ${isHL ? 'text-blue-400' : 'text-white/40'}`}>
                      Hasta {p.members} miembros
                    </div>
                    <p className="text-xs text-white/30 mt-1">{p.desc}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHL ? 'text-blue-400' : 'text-emerald-400'}`} />
                        <span className="text-white/70">{f}</span>
                      </li>
                    ))}
                    {p.notIncluded.map((f, j) => (
                      <li key={`no-${j}`} className="flex items-start gap-3 text-sm opacity-40">
                        <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/30" />
                        <span className="line-through">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waURL(p.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3.5 rounded-xl font-bold transition-all ${
                      isHL
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {p.cta}
                  </a>

                  {isHL && (
                    <div className="text-center mt-3 text-xs text-amber-400">
                      Equivale a <span className="font-bold">$1.97/día</span> — menos que un café
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SRI HIGHLIGHT
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Cumplimiento Tributario</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight mb-6">
                Facturación Electrónica{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  100% SRI
                </span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Olvídese de facturas en papel. Cada venta genera automáticamente su factura electrónica válida ante el SRI.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Firma Digital P12', desc: 'Certificado electrónico integrado con gestión de vencimiento' },
                  { title: 'Envío Automático al SRI', desc: 'Firma, envía y recibe autorización en segundos' },
                  { title: 'RIDE en PDF', desc: 'Documento oficial con código de barras para el cliente' },
                  { title: 'Notas de Crédito', desc: 'Anulación parcial o total de facturas' },
                  { title: 'Retenciones', desc: 'Comprobantes de retención para proveedores' },
                  { title: 'IVA Configurable', desc: 'Adaptable cuando el gobierno cambie la tarifa' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm">{f.title}</span>
                      <span className="text-sm text-white/40"> — {f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real invoice screenshot */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <img
                src="/assets/screenshots/invoice.png"
                alt="AMEPHIA GYM - Factura electrónica real"
                className="relative w-full rounded-xl border border-white/10 shadow-2xl shadow-black/50"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Captura real del sistema</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECH STACK
         ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Base Tecnológica</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight mb-6">
                Construido con{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  tecnología moderna
                </span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                Stack empresarial probado. Sin dependencias de terceros para facturación. Su data es 100% suya.
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Laravel 11', desc: 'Framework PHP #1 del mundo', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
                  { name: 'Tailwind CSS', desc: 'Interfaz moderna y responsiva', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
                  { name: 'Alpine.js', desc: 'Interactividad fluida sin recargas', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
                  { name: 'MySQL', desc: 'Base de datos relacional robusta', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 text-sm font-bold ${t.color}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-semibold text-sm">{t.name}</span>
                      <span className="text-sm text-white/40"> — {t.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="text-[10px] uppercase tracking-[.15em] text-cyan-400 font-bold mb-4">Infraestructura</div>
                <div className="space-y-3 text-sm">
                  {[
                    ['Hosting:', 'VPS o Cloud (AWS/DO)'],
                    ['SSL:', 'Certificado HTTPS incluido'],
                    ['Backups:', 'Automáticos diarios'],
                    ['Acceso:', 'Web (PC, Tablet, Celular)'],
                  ].map(([k, v], i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-white/40">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="text-[10px] uppercase tracking-[.15em] text-amber-400 font-bold mb-4">Seguridad</div>
                <div className="space-y-3 text-sm">
                  {[
                    ['Encriptación:', 'AES-256 (certificados)'],
                    ['Autenticación:', 'Session + CSRF protection'],
                    ['Permisos:', 'RBAC granular (Spatie)'],
                    ['Auditoría:', 'Log de cada acción'],
                  ].map(([k, v], i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-white/40">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Cash register screenshot */}
              <div className="overflow-hidden rounded-xl border border-white/5">
                <img
                  src="/assets/screenshots/cash-register.png"
                  alt="AMEPHIA GYM - Caja registradora"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
         ═══════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Preguntas frecuentes</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
              Preguntas frecuentes sobre el software
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="px-6 pb-5 text-sm text-white/50 leading-relaxed -mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA
         ═══════════════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <Dumbbell className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Empiece a gestionar su gimnasio
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              en un negocio inteligente.
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            AMEPHIA GYM no es solo un software. Es la plataforma que le permite enfocarse en lo que importa:{' '}
            <strong className="text-white">hacer crecer su negocio y sus clientes.</strong>
          </p>

          <a
            href={waURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            Solicitar Demo Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-16 flex flex-wrap justify-center gap-10 text-center">
            {[
              { val: '9', label: 'Módulos' },
              { val: '100%', label: 'SRI Compliant' },
              { val: 'NIIF', label: 'Contabilidad' },
              { val: '10x', label: 'ROI' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xl font-extrabold font-mono">{s.val}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* ═══════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-blue-400" />
              <span className="font-bold tracking-tight">
                AMEPHIA <span className="text-blue-400">GYM</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <button onClick={() => scrollTo('modulos')} className="hover:text-white transition-colors">Módulos</button>
              <button onClick={() => scrollTo('comparativa')} className="hover:text-white transition-colors">Comparativa</button>
              <button onClick={() => scrollTo('precios')} className="hover:text-white transition-colors">Precios</button>
              <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
              <a href="https://amephia.com" className="hover:text-white transition-colors">AmePhia Systems</a>
            </div>

            <div className="text-xs text-white/20 font-mono uppercase tracking-widest">
              © 2026 AmePhia Systems
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          MOBILE STICKY CTA
         ═══════════════════════════════════════════ */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-[#050510]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 z-40">
        <a
          href={waURL()}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-3.5 rounded-xl font-bold shadow-lg"
        >
          Solicitar Demo Gratis
        </a>
      </div>
    </div>
  );
};

export default GymLanding;
