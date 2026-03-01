import { useState, useEffect, useRef } from 'react';
import {
  Users,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Zap,
  ClipboardList,
  ShieldCheck,
  Building2,
  Bell,
  Moon,
  Globe,
  ChevronLeft,
  Star,
  Palette,
  UserCheck,
  FolderOpen,
  Activity,
  Download,
  BookOpen,
  Clock,
  MessageSquare,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   WHATSAPP HELPER
   ────────────────────────────────────────────── */
const WA_NUMBER = '593986059727';

const waURL = (plan?: string) => {
  const msgs: Record<string, string> = {
    starter: `Hola! Me interesa el Plan STARTER ($49/mes) de BROKER SEGURO. ¿Pueden darme más información?`,
    profesional: `Hola! Quiero el Plan PROFESIONAL ($99/mes) de BROKER SEGURO. Quiero agendar una demo.`,
    enterprise: `Hola! Necesito información sobre el Plan ENTERPRISE ($199/mes) de BROKER SEGURO para mi bróker de seguros.`,
  };
  const msg =
    msgs[plan ?? ''] ??
    `Hola! Me interesa BROKER SEGURO para mi bróker de seguros. ¿Pueden agendar una demo?`;
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
const BrokerSeguroLanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* — data — */
  const modules = [
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Gestión de Clientes',
      desc: 'Registro completo de clientes con dependientes, datos personales, historial de pólizas y reclamos. Búsqueda instantánea y perfiles detallados.',
      color: 'from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      accent: 'text-blue-400',
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Pólizas de Seguros',
      desc: 'Gestión de pólizas con estados, fechas de vigencia, vencimientos automáticos, tipos de seguro y compañías aseguradoras vinculadas.',
      color: 'from-violet-500/20 to-violet-600/10',
      border: 'border-violet-500/30',
      accent: 'text-violet-400',
    },
    {
      icon: <ClipboardList className="w-7 h-7" />,
      title: 'Reclamos Inteligentes',
      desc: 'Wizard de 4 pasos para crear reclamos. Máquina de estados (pendiente→revisión→aprobado→liquidado), checklist, documentos adjuntos y comentarios.',
      color: 'from-indigo-500/20 to-indigo-600/10',
      border: 'border-indigo-500/30',
      accent: 'text-indigo-400',
    },
    {
      icon: <Palette className="w-7 h-7" />,
      title: 'Formularios Dinámicos',
      desc: 'Builder visual con 16 tipos de campo: texto, select, checkbox, fecha, archivo, tabla y más. Crea formularios personalizados para cada tipo de reclamo.',
      color: 'from-pink-500/20 to-pink-600/10',
      border: 'border-pink-500/30',
      accent: 'text-pink-400',
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: 'Aseguradoras & Tipos',
      desc: 'Catálogo de compañías aseguradoras, tipos de seguro (vida, salud, vehículo, hogar) y tipos de eventos para clasificación de reclamos.',
      color: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: 'Portal del Cliente',
      desc: 'Acceso autónomo para asegurados: consultar pólizas vigentes, crear reclamos, subir documentos, ver estados y recibir notificaciones.',
      color: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      accent: 'text-emerald-400',
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: 'Dashboard & Analytics',
      desc: '6 KPIs en tiempo real, gráficos de tendencia de reclamos, distribución por aseguradora, pólizas por vencer y actividad reciente.',
      color: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/30',
      accent: 'text-amber-400',
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: 'Reportes',
      desc: 'Reportes de comisiones, siniestralidad por aseguradora, pólizas activas/vencidas, reclamos por estado y más. Exportables para análisis.',
      color: 'from-purple-500/20 to-purple-600/10',
      border: 'border-purple-500/30',
      accent: 'text-purple-400',
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: 'Gestión de Usuarios',
      desc: '4 roles: Superadmin, Admin, Agente y Cliente. Permisos granulares, asignación de reclamos a agentes específicos.',
      color: 'from-teal-500/20 to-teal-600/10',
      border: 'border-teal-500/30',
      accent: 'text-teal-400',
    },
    {
      icon: <Bell className="w-7 h-7" />,
      title: 'Notificaciones',
      desc: 'Sistema de notificaciones en tiempo real para cambios de estado de reclamos, pólizas por vencer y asignaciones de trabajo.',
      color: 'from-rose-500/20 to-rose-600/10',
      border: 'border-rose-500/30',
      accent: 'text-rose-400',
    },
    {
      icon: <Moon className="w-7 h-7" />,
      title: 'Dark Mode & Responsive',
      desc: 'Interfaz moderna con tema oscuro/claro, diseño responsive para desktop, tablet y móvil. Componentes shadcn/ui profesionales.',
      color: 'from-slate-500/20 to-slate-600/10',
      border: 'border-slate-500/30',
      accent: 'text-slate-400',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'API REST Completa',
      desc: '96 endpoints documentados. Autenticación Sanctum, multi-tenancy por tenant_id, validaciones robustas y respuestas estandarizadas.',
      color: 'from-red-500/20 to-red-600/10',
      border: 'border-red-500/30',
      accent: 'text-red-400',
    },
  ];

  const beforeAfter = [
    { process: 'Registro de póliza', before: '20 min (Excel)', after: '3 minutos' },
    { process: 'Crear reclamo', before: 'Llamadas + papel', after: 'Wizard 4 pasos' },
    { process: 'Seguimiento reclamos', before: 'Preguntar por teléfono', after: 'Portal cliente' },
    { process: 'Reportes', before: '1-2 días en Excel', after: '1 clic tiempo real' },
    { process: 'Formularios', before: 'Imprimir, llenar, escanear', after: 'Dinámicos en línea' },
    { process: 'Gestión clientes', before: 'Carpetas físicas', after: 'Búsqueda instantánea' },
  ];

  const plans = [
    {
      name: 'Starter',
      price: 49,
      clients: '50',
      desc: 'Para brókers independientes',
      accent: 'cyan',
      features: [
        'Gestión de Clientes (hasta 50)',
        'Pólizas de Seguros',
        'Reclamos con Wizard',
        'Dashboard básico',
        '2 usuarios incluidos',
        'Soporte por email',
      ],
      notIncluded: ['Formularios Dinámicos', 'Portal del Cliente', 'Reportes avanzados', 'API REST'],
      cta: 'Empezar Ahora',
      wa: 'starter',
    },
    {
      name: 'Profesional',
      price: 99,
      clients: '300',
      desc: 'Todo incluido para crecer',
      accent: 'indigo',
      badge: 'MÁS POPULAR',
      features: [
        'Gestión de Clientes (hasta 300)',
        'Pólizas de Seguros',
        'Reclamos Inteligentes',
        'Formularios Dinámicos',
        'Portal del Cliente',
        'Dashboard & Analytics completo',
        'Reportes de comisiones',
        'Notificaciones en tiempo real',
        'Usuarios ilimitados',
        'Soporte prioritario',
      ],
      notIncluded: [],
      cta: '¡Lo Quiero!',
      wa: 'profesional',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      clients: 'Ilimitados',
      desc: 'Para brókers grandes y franquicias',
      accent: 'amber',
      features: [
        'Todo del plan Profesional',
        'Clientes ilimitados',
        'Multi-sucursal',
        'API REST completa (96 endpoints)',
        'Soporte 24/7',
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

  const faqs = [
    {
      q: '¿Es multi-tenant? ¿Mis datos están separados de otros brókers?',
      a: 'Sí, BROKER SEGURO es 100% multi-tenant. Cada bróker tiene su espacio completamente aislado con tenant_id. Sus datos, clientes, pólizas y reclamos están completamente separados y seguros.',
    },
    {
      q: '¿Cómo funcionan los formularios dinámicos?',
      a: 'El builder visual le permite crear formularios personalizados con 16 tipos de campo (texto, número, fecha, select, checkbox, archivo, tabla, etc.). Cada tipo de reclamo puede tener su propio formulario que los clientes llenan desde el portal.',
    },
    {
      q: '¿El portal del cliente es independiente?',
      a: 'Sí. Los asegurados acceden con sus propias credenciales a un portal donde ven sus pólizas, crean reclamos, suben documentos y reciben notificaciones. Sin necesidad de llamar al bróker.',
    },
    {
      q: '¿Puedo personalizar los estados de los reclamos?',
      a: 'El sistema incluye una máquina de estados completa: pendiente, en revisión, aprobado, rechazado y liquidado. Cada cambio de estado se registra en el historial con comentarios y razones.',
    },
    {
      q: '¿Funciona en dispositivos móviles?',
      a: 'Sí. La interfaz es 100% responsive y funciona en desktop, tablet y móvil. Sus agentes pueden gestionar reclamos desde cualquier dispositivo con navegador web.',
    },
    {
      q: '¿Mis datos están seguros?',
      a: 'Absolutamente. Usamos autenticación Sanctum con tokens, encriptación de datos sensibles, validaciones robustas en cada endpoint y políticas de autorización por rol. Multi-tenancy garantiza aislamiento total.',
    },
    {
      q: '¿Hay contrato de permanencia?',
      a: 'No. Todos nuestros planes son mensuales sin compromiso. Puede cancelar en cualquier momento. Si decide salir, exportamos todos sus datos sin costo adicional.',
    },
  ];

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Director, Mendoza Seguros',
      text: 'Pasamos de Excel a BROKER SEGURO en una semana. El wizard de reclamos redujo nuestro tiempo de procesamiento en un 70%. Mis clientes ahora hacen todo desde el portal.',
      rating: 5,
    },
    {
      name: 'María Elena Vásquez',
      role: 'Gerente, Vásquez & Asociados Brókers',
      text: 'Los formularios dinámicos son increíbles. Cada tipo de seguro tiene su propio formulario y los clientes lo llenan en línea. Ya no imprimimos ni una hoja.',
      rating: 5,
    },
    {
      name: 'Roberto Andrade',
      role: 'Fundador, ProSeguro EC',
      text: 'El dashboard me da visibilidad total: pólizas por vencer, reclamos pendientes, comisiones. Antes necesitaba 2 días para armar un reporte, ahora es un clic.',
      rating: 5,
    },
  ];

  const goHome = () => {
    window.history.pushState(null, '', `/${window.location.search}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans antialiased overflow-x-hidden">
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[120px]" />
      </div>

      {/* ════════════════════════════════════════════
          NAVIGATION
         ════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={goHome} className="text-white/40 hover:text-white transition mr-2" aria-label="Volver">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <span className="font-light tracking-wider text-sm">
              AMEPHIA <span className="font-bold">BROKER</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <button onClick={() => scrollTo('modulos')} className="hover:text-white transition">
              Módulos
            </button>
            <button onClick={() => scrollTo('capturas')} className="hover:text-white transition">
              Capturas
            </button>
            <button onClick={() => scrollTo('precios')} className="hover:text-white transition">
              Precios
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition">
              FAQ
            </button>
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
            >
              Solicitar Demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white/60" onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a15]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-3">
            <button onClick={() => scrollTo('modulos')} className="block text-white/60 hover:text-white text-sm">Módulos</button>
            <button onClick={() => scrollTo('capturas')} className="block text-white/60 hover:text-white text-sm">Capturas</button>
            <button onClick={() => scrollTo('precios')} className="block text-white/60 hover:text-white text-sm">Precios</button>
            <button onClick={() => scrollTo('faq')} className="block text-white/60 hover:text-white text-sm">FAQ</button>
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              Solicitar Demo
            </a>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium tracking-wide">
            Plataforma #1 para Brókers de Seguros en Ecuador
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Software para Brókers
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              de Seguros
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Multi-tenant SaaS con gestión de clientes, pólizas, reclamos inteligentes con wizard,
            formularios dinámicos, portal del cliente y reportes — todo en una plataforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Solicitar Demo Gratis <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => scrollTo('precios')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition"
            >
              Ver Precios
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40 mb-16">
            {['Multi-tenant', 'Formularios dinámicos', 'Portal cliente', 'Dark mode'].map((b) => (
              <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">
                <Zap className="w-3 h-3 text-indigo-400" /> {b}
              </span>
            ))}
          </div>

          {/* Hero screenshot — Dashboard */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="ml-4 text-[10px] text-white/30 font-mono">brokerseguro.com/dashboard</div>
              </div>
              <img
                src="/assets/screenshots/broker/dashboard.png"
                alt="Dashboard de BrokerSeguro — KPIs, gráficos y resumen"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 12, suffix: '', label: 'Módulos Integrados' },
            { value: 96, suffix: '', label: 'API Endpoints' },
            { value: 4, suffix: '', label: 'Roles de Usuario' },
            { value: 100, suffix: '%', label: 'Multi-Tenant' },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-extrabold text-indigo-400 font-mono">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-white/40 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PROBLEM
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            El Problema
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            La mayoría de brókers de seguros en Ecuador siguen operando con herramientas obsoletas
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <FolderOpen className="w-5 h-5" />, text: 'Hojas de cálculo para gestionar pólizas' },
              { icon: <ClipboardList className="w-5 h-5" />, text: 'Reclamos sin seguimiento ni trazabilidad' },
              { icon: <Globe className="w-5 h-5" />, text: 'Sin portal para que los clientes consulten' },
              { icon: <FileText className="w-5 h-5" />, text: 'Formularios en papel que se pierden' },
              { icon: <BarChart3 className="w-5 h-5" />, text: 'Sin reportes financieros de comisiones' },
              { icon: <Shield className="w-5 h-5" />, text: 'Riesgo de errores manuales y pérdida de datos' },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-red-500/[0.04] border border-red-500/10 rounded-xl p-5"
              >
                <div className="text-red-400 mt-0.5">{p.icon}</div>
                <span className="text-white/60 text-sm">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MODULES
         ════════════════════════════════════════════ */}
      <section id="modulos" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            12 Módulos Integrados
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Todo lo que necesita un bróker de seguros moderno, en una sola plataforma
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${m.color} border ${m.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className={`${m.accent} mb-4`}>{m.icon}</div>
                <h3 className="text-lg font-bold mb-2">{m.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SCREENSHOTS (Real)
         ════════════════════════════════════════════ */}
      <section id="capturas" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Así se ve por dentro
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Capturas reales del sistema — interfaz moderna con dark mode
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: 'clients.png', icon: <Users className="w-4 h-4 text-blue-400" />, label: 'Gestión de Clientes', desc: 'Lista completa con búsqueda, dependientes y estado' },
              { src: 'claims-create.png', icon: <ClipboardList className="w-4 h-4 text-indigo-400" />, label: 'Wizard de Reclamos', desc: 'Creación guiada en 4 pasos con validaciones' },
              { src: 'form-builder.png', icon: <Palette className="w-4 h-4 text-pink-400" />, label: 'Constructor de Formularios', desc: '16 tipos de campo con builder visual drag & drop' },
              { src: 'portal-policies.png', icon: <Globe className="w-4 h-4 text-emerald-400" />, label: 'Portal del Cliente', desc: 'Los asegurados ven sus pólizas y crean reclamos' },
              { src: 'policies.png', icon: <FileText className="w-4 h-4 text-violet-400" />, label: 'Gestión de Pólizas', desc: 'Control de estados, vencimientos y aseguradoras' },
              { src: 'users.png', icon: <UserCheck className="w-4 h-4 text-cyan-400" />, label: 'Gestión de Usuarios', desc: '4 roles: Super Admin, Admin, Agent, Client' },
            ].map((item) => (
              <div key={item.src} className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs text-white/50">{item.label}</span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={`/assets/screenshots/broker/${item.src}`}
                    alt={`${item.label} — ${item.desc}`}
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-2.5 border-t border-white/5">
                  <p className="text-[11px] text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Claim Detail: History + Comments */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-white/50">Historial de Estados del Reclamo</span>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="/assets/screenshots/broker/claim-detail-history.png"
                  alt="Detalle del reclamo con timeline de transiciones de estado"
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-2.5 border-t border-white/5">
                <p className="text-[11px] text-white/40">Timeline completo de transiciones: borrador → revisión → aprobado → cerrado</p>
              </div>
            </div>
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span className="text-xs text-white/50">Comentarios del Reclamo</span>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="/assets/screenshots/broker/claim-detail-comments.png"
                  alt="Comentarios internos y públicos del reclamo"
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-2.5 border-t border-white/5">
                <p className="text-[11px] text-white/40">Comentarios internos y públicos con control de visibilidad</p>
              </div>
            </div>
          </div>

          {/* Full-width: Reportes */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-white/50">Reporte de Comisiones</span>
              </div>
              <img
                src="/assets/screenshots/broker/reports-commissions.png"
                alt="Reporte de comisiones por aseguradora y período"
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" />
                <span className="text-xs text-white/50">Reporte de Siniestralidad</span>
              </div>
              <img
                src="/assets/screenshots/broker/reports-sinistrality.png"
                alt="Reporte de siniestralidad con gráficos y tendencias"
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Login page */}
          <div className="mt-6 max-w-md mx-auto bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-white/50">Pantalla de Login</span>
            </div>
            <img
              src="/assets/screenshots/broker/login.png"
              alt="Pantalla de inicio de sesión de BrokerSeguro"
              className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BEFORE / AFTER
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-16">
            Antes vs. Después
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/60 font-medium">Proceso</th>
                  <th className="text-center py-3 text-red-400/80 font-medium">Antes</th>
                  <th className="text-center py-3 text-emerald-400/80 font-medium">Con BrokerSeguro</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 text-white/70">{row.process}</td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-red-400/60 text-xs">
                        <X className="w-3.5 h-3.5" /> {row.before}
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
                        <Check className="w-3.5 h-3.5" /> {row.after}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRICING
         ════════════════════════════════════════════ */}
      <section id="precios" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Planes & Precios
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Sin contratos. Sin sorpresas. Cancele cuando quiera.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isHighlighted = plan.highlighted;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02] ${
                    isHighlighted
                      ? 'bg-gradient-to-b from-indigo-500/10 to-violet-500/5 border-2 border-indigo-500/30 shadow-lg shadow-indigo-900/20'
                      : 'bg-white/[0.02] border border-white/5'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full tracking-wider">
                      {plan.badge}
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-white/40 text-sm mb-4">{plan.desc}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold font-mono">${plan.price}</span>
                      <span className="text-white/40">/mes</span>
                    </div>
                    <div className="text-xs text-white/30 mt-1">Hasta {plan.clients} clientes</div>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-white/60">{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <X className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                        <span className="text-white/30">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waURL(plan.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition ${
                      isHighlighted
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-16">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BROCHURE / FOLLETO
         ════════════════════════════════════════════ */}
      <section id="folleto" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left — Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5" /> Documento Ejecutivo
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                  Folleto Profesional
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Descargue nuestro folleto de 10 páginas con información completa del sistema:
                  módulos, flujo de reclamos, formularios dinámicos, portal del cliente,
                  arquitectura técnica, planes y precios.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  {['12 Módulos', '96 APIs', '47 Pantallas', '21 Modelos'].map((item) => (
                    <span key={item} className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-xs text-white/50">
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href="/assets/brochure-brokerseguro.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-600/20"
                >
                  <Download className="w-4 h-4" /> Ver Folleto Completo
                </a>
              </div>
              {/* Right — Preview mockup */}
              <div className="w-48 md:w-56 flex-shrink-0">
                <div className="bg-[#0a0a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Page 1 preview */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span className="text-[8px] text-white/40 tracking-widest">AMEPHIA BROKER</span>
                    </div>
                    <div className="h-1.5 w-3/4 bg-gradient-to-r from-indigo-500/40 to-violet-500/40 rounded" />
                    <div className="h-1 w-1/2 bg-white/10 rounded" />
                    <div className="h-1 w-2/3 bg-white/5 rounded" />
                    <div className="grid grid-cols-4 gap-1.5 mt-3">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="bg-white/[0.04] rounded p-1.5 text-center">
                          <div className="text-[8px] font-bold text-indigo-400">{[21, 96, 47, 12][i-1]}</div>
                          <div className="h-0.5 w-full bg-white/5 rounded mt-1" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1 mt-2">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className="h-0.5 bg-white/[0.04] rounded" style={{ width: `${100 - i * 10}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border-t border-white/5 py-2 px-4">
                    <div className="text-[7px] text-white/20 text-center">10 páginas · Propuesta comercial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════ */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-16">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-60 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            ¿Listo para transformar
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              su bróker de seguros?
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10">
            Agende una demostración gratuita y vea BROKER SEGURO en acción
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Solicitar Demo por WhatsApp <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@amephia.com?subject=Demo%20BrokerSeguro"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition"
            >
              Escribir por Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>AMEPHIA <strong>BROKER SEGURO</strong></span>
          </div>
          <span>© 2026 AmePhia Systems Inc. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default BrokerSeguroLanding;
