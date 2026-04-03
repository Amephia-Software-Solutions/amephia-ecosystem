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
  ClipboardList,
  ShieldCheck,
  Building2,
  Bell,
  ChevronLeft,
  Palette,
  UserCheck,
  FolderOpen,
  Download,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  PhoneCall,
  Mail,
  Calendar,
  Settings,
  Globe,
  DollarSign,
  Target,
  RefreshCw,
  Headphones,
  CheckCircle2,
  Send,
  Play,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   VIDEO DEMO CONFIG
   ─────────────────────────────────────────────
   Cuando tengas tu video de YouTube, pega aquí
   solo el ID (la parte después de v=).
   Ejemplo: 'dQw4w9WgXcQ'
   Mientras sea null, se muestra el screenshot
   con un CTA para solicitar la demo en vivo.
   ────────────────────────────────────────────── */
const YOUTUBE_VIDEO_ID: string | null = null;

/* ──────────────────────────────────────────────
   WHATSAPP HELPER
   ────────────────────────────────────────────── */
const WA_NUMBER = '13347324056';

const waURL = (ctx?: string) => {
  const msgs: Record<string, string> = {
    demo: `Hola! Quiero agendar una demo de BROKER SEGURO para mi correduría. ¿Cuándo podemos coordinar?`,
    diagnostico: `Hola! Quiero un diagnóstico gratuito para mi bróker de seguros. ¿Cómo funciona?`,
    starter: `Hola! Me interesa el Plan STARTER ($49/mes) de BROKER SEGURO. ¿Pueden darme más información?`,
    profesional: `Hola! Quiero el Plan PROFESIONAL ($99/mes) de BROKER SEGURO. Quiero agendar una demo.`,
    enterprise: `Hola! Necesito información sobre el Plan ENTERPRISE ($199/mes) de BROKER SEGURO para mi bróker de seguros.`,
    mitad: `Hola! Estuve revisando BROKER SEGURO y me interesa saber más. ¿Pueden contactarme?`,
  };
  const msg =
    msgs[ctx ?? ''] ??
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* — Pain Points — */
  const pains = [
    { icon: <FolderOpen className="w-5 h-5" />, title: 'Pólizas en Excel', desc: 'Archivos dispersos, sin alertas de vencimiento. Cada renovación que se pierde es comisión que no cobras.' },
    { icon: <AlertTriangle className="w-5 h-5" />, title: 'Renovaciones perdidas', desc: 'Sin sistema de alertas, las pólizas vencen sin aviso. Tu cliente renueva con la competencia.' },
    { icon: <ClipboardList className="w-5 h-5" />, title: 'Seguimiento manual', desc: 'WhatsApp + llamadas + correos. No sabes quién atendió qué, ni cuándo fue el último contacto.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Sin visibilidad de comisiones', desc: 'No tienes reporte claro de cuánto te deben las aseguradoras. Cobras de memoria o por fe.' },
    { icon: <FileText className="w-5 h-5" />, title: 'Reclamos sin trazabilidad', desc: 'El cliente llama a preguntar el estado y no tienes respuesta inmediata. Pierdes credibilidad.' },
    { icon: <Users className="w-5 h-5" />, title: 'Equipo descoordinado', desc: 'Cada agente maneja su cartera a su manera. No hay proceso ni estándar. Si alguien se va, se lleva la información.' },
  ];

  /* — Benefits — */
  const benefits = [
    { icon: <TrendingUp className="w-7 h-7" />, title: 'Recupera renovaciones perdidas', desc: 'Alertas automáticas antes del vencimiento. Nunca más pierdas una renovación por descuido.', accent: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: <DollarSign className="w-7 h-7" />, title: 'Controla tus comisiones', desc: 'Reportes de comisiones por aseguradora, periodo y agente. Sabrás exactamente cuánto te deben.', accent: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { icon: <Target className="w-7 h-7" />, title: 'Seguimiento comercial real', desc: 'Cada interacción con el cliente queda registrada. Tu equipo sabe qué hacer y cuándo hacerlo.', accent: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: <Shield className="w-7 h-7" />, title: 'Toda tu cartera centralizada', desc: 'Clientes, pólizas, reclamos y documentos en un solo lugar. Acceso desde cualquier dispositivo.', accent: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  ];

  /* — Modules — */
  const modules = [
    { icon: <Users className="w-6 h-6" />, title: 'Clientes y contactos', desc: 'Ficha completa de cada cliente: datos, dependientes, historial de pólizas y reclamos. Búsqueda instantánea.', accent: 'text-blue-400', border: 'border-blue-500/20' },
    { icon: <FileText className="w-6 h-6" />, title: 'Pólizas y cartera', desc: 'Registro de pólizas con vigencia, estado, aseguradora y tipo de seguro. Vencimientos automáticos.', accent: 'text-violet-400', border: 'border-violet-500/20' },
    { icon: <Bell className="w-6 h-6" />, title: 'Alertas de vencimiento', desc: 'Notificaciones automáticas cuando una póliza está por vencer. Tu equipo actúa antes de perder la renovación.', accent: 'text-rose-400', border: 'border-rose-500/20' },
    { icon: <ClipboardList className="w-6 h-6" />, title: 'Reclamos paso a paso', desc: 'Creación guiada de reclamos con estados claros: pendiente, en revisión, aprobado, liquidado. Historial completo.', accent: 'text-indigo-400', border: 'border-indigo-500/20' },
    { icon: <Target className="w-6 h-6" />, title: 'Seguimiento comercial', desc: 'Registra cada contacto, asigna tareas a tu equipo y mantén trazabilidad de toda la gestión comercial.', accent: 'text-emerald-400', border: 'border-emerald-500/20' },
    { icon: <DollarSign className="w-6 h-6" />, title: 'Comisiones y cobranzas', desc: 'Reporte de comisiones por aseguradora y periodo. Controla lo que te deben y lo que ya cobraste.', accent: 'text-amber-400', border: 'border-amber-500/20' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Dashboard y reportes', desc: 'KPIs en tiempo real: pólizas activas, reclamos pendientes, comisiones y siniestralidad. Todo en un clic.', accent: 'text-cyan-400', border: 'border-cyan-500/20' },
    { icon: <Globe className="w-6 h-6" />, title: 'Portal del cliente', desc: 'Tus asegurados consultan pólizas, crean reclamos y suben documentos sin llamarte. Menos carga operativa.', accent: 'text-teal-400', border: 'border-teal-500/20' },
    { icon: <UserCheck className="w-6 h-6" />, title: 'Roles y permisos', desc: '4 roles: Superadmin, Admin, Agente y Cliente. Cada quien ve solo lo que le corresponde.', accent: 'text-purple-400', border: 'border-purple-500/20' },
    { icon: <Palette className="w-6 h-6" />, title: 'Formularios dinámicos', desc: 'Crea formularios personalizados para cada tipo de reclamo o trámite. Sin programar.', accent: 'text-pink-400', border: 'border-pink-500/20' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Catálogo de aseguradoras', desc: 'Gestiona tus aseguradoras, tipos de seguro y tipos de eventos. Todo clasificado y organizado.', accent: 'text-sky-400', border: 'border-sky-500/20' },
    { icon: <Settings className="w-6 h-6" />, title: 'Multi-tenant y seguridad', desc: 'Cada bróker tiene su espacio aislado. Tus datos están protegidos y separados de otros clientes.', accent: 'text-slate-400', border: 'border-slate-500/20' },
  ];

  const beforeAfter = [
    { process: 'Control de pólizas', before: 'Excel sin alertas', after: 'Vencimientos automáticos' },
    { process: 'Renovaciones', before: 'Depende de la memoria', after: 'Alertas anticipadas' },
    { process: 'Reclamos', before: 'Llamadas + papel', after: 'Proceso digital paso a paso' },
    { process: 'Comisiones', before: 'Cobrar de memoria', after: 'Reporte por aseguradora' },
    { process: 'Seguimiento comercial', before: 'WhatsApp disperso', after: 'Historial centralizado' },
    { process: 'Reportes', before: '1-2 días en Excel', after: '1 clic, tiempo real' },
  ];

  const plans = [
    {
      name: 'Starter',
      price: 49,
      clients: '50',
      desc: 'Para brókers independientes que quieren orden',
      accent: 'cyan',
      features: [
        'Gestión de Clientes (hasta 50)',
        'Pólizas con alertas de vencimiento',
        'Reclamos con seguimiento',
        'Dashboard básico',
        '2 usuarios incluidos',
        'Soporte por email',
      ],
      notIncluded: ['Formularios Dinámicos', 'Portal del Cliente', 'Reportes de comisiones', 'API REST'],
      cta: 'Empezar Ahora',
      wa: 'starter',
    },
    {
      name: 'Profesional',
      price: 99,
      clients: '300',
      desc: 'Para brókers que quieren crecer sin perder el control',
      accent: 'indigo',
      badge: 'MÁS POPULAR',
      features: [
        'Gestión de Clientes (hasta 300)',
        'Pólizas con alertas de vencimiento',
        'Reclamos inteligentes',
        'Formularios dinámicos',
        'Portal del Cliente',
        'Dashboard completo + KPIs',
        'Reportes de comisiones',
        'Notificaciones en tiempo real',
        'Usuarios ilimitados',
        'Soporte prioritario',
      ],
      notIncluded: [],
      cta: 'Solicitar Demo',
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
        'API REST completa',
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
      q: '¿Por qué cambiar si ya me funciona Excel?',
      a: 'Excel no te avisa cuando una póliza está por vencer, no te permite dar acceso a tu equipo con roles definidos, y no genera reportes de comisiones automáticos. Cada renovación que pierdes por falta de alerta es dinero que dejas de cobrar. BROKER SEGURO no reemplaza tu forma de trabajar: la ordena y la protege.',
    },
    {
      q: '¿No tengo tiempo para implementar un sistema nuevo',
      a: 'La implementación es por fases. Empezamos con lo más urgente (clientes y pólizas) y vamos sumando módulos según tu ritmo. No necesitas detener tu operación. En la primera semana ya tienes tu cartera cargada y alertas funcionando.',
    },
    {
      q: '¿Es caro para un bróker pequeño?',
      a: 'El plan Starter cuesta $49/mes. Si con las alertas de vencimiento recuperas una sola renovación al mes, el sistema se paga solo. Piénsalo así: ¿cuánto pierdes hoy por cada póliza que se vence sin que te enteres?',
    },
    {
      q: '¿Y si mi equipo no se adapta?',
      a: 'La interfaz es intuitiva y la capacitación está incluida. Además, implementamos por fases: tu equipo aprende un módulo antes de pasar al siguiente. No es un cambio de golpe. Hemos acompañado equipos que venían 100% de papel.',
    },
    {
      q: '¿Mis datos están seguros? ¿Otros brókers pueden ver mi información?',
      a: 'Cada bróker tiene su espacio completamente aislado. Tus clientes, pólizas y reclamos son solo tuyos. Usamos autenticación segura, encriptación de datos y respaldos automáticos.',
    },
    {
      q: '¿Hay contrato de permanencia?',
      a: 'No. Todos los planes son mensuales sin compromiso. Puedes cancelar en cualquier momento. Si decides salir, exportamos todos tus datos sin costo adicional.',
    },
    {
      q: '¿Funciona en celular y tablet?',
      a: 'Sí. La plataforma es 100% responsive. Tus agentes pueden consultar información, gestionar reclamos y revisar pólizas desde cualquier dispositivo con navegador web.',
    },
  ];

  const processSteps = [
    { icon: <PhoneCall className="w-6 h-6" />, step: '1', title: 'Diagnóstico gratuito', desc: 'Conversamos sobre tu operación actual, tus dolores y prioridades.' },
    { icon: <Calendar className="w-6 h-6" />, step: '2', title: 'Demo personalizada', desc: 'Te mostramos el sistema con datos reales de tu sector.' },
    { icon: <Settings className="w-6 h-6" />, step: '3', title: 'Implementación por fases', desc: 'Empezamos con lo urgente. Sin detener tu operación.' },
    { icon: <Headphones className="w-6 h-6" />, step: '4', title: 'Capacitación + soporte', desc: 'Tu equipo aprende paso a paso. Soporte continuo.' },
  ];

  const goHome = () => {
    window.history.pushState(null, '', `/${window.location.search}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    const phone = data.get('phone');
    const company = data.get('company');
    const need = data.get('need');
    const msg = `Hola! Soy ${name} de ${company}. Mi principal necesidad es: ${need}. Mi teléfono: ${phone}. Quiero saber más de BROKER SEGURO.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSubmitted(true);
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
            <button onClick={goHome} className="text-white/40 hover:text-white transition mr-2" aria-label="Volver al inicio">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <span className="font-light tracking-wider text-sm">
              BROKER <span className="font-bold">SEGURO</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <button onClick={() => scrollTo('beneficios')} className="hover:text-white transition">
              Beneficios
            </button>
            <button onClick={() => scrollTo('modulos')} className="hover:text-white transition">
              Módulos
            </button>
            <button onClick={() => scrollTo('precios')} className="hover:text-white transition">
              Precios
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition">
              FAQ
            </button>
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
            >
              Solicitar Demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white/60" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menú">
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
            <button onClick={() => scrollTo('beneficios')} className="block text-white/60 hover:text-white text-sm">Beneficios</button>
            <button onClick={() => scrollTo('modulos')} className="block text-white/60 hover:text-white text-sm">Módulos</button>
            <button onClick={() => scrollTo('precios')} className="block text-white/60 hover:text-white text-sm">Precios</button>
            <button onClick={() => scrollTo('faq')} className="block text-white/60 hover:text-white text-sm">FAQ</button>
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-center px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
            >
              Solicitar Demo
            </a>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════
          HERO — Result-oriented, above the fold
         ════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium tracking-wide">
            Software para corredores de seguros en Ecuador
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Deja de perder renovaciones.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Controla toda tu cartera.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
            Centraliza clientes, pólizas, vencimientos, reclamos y comisiones en una sola plataforma.
            Sin Excel. Sin desorden. Sin renovaciones perdidas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Solicitar Demo Gratis <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={waURL('diagnostico')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition"
            >
              <MessageSquare className="w-5 h-5" /> Diagnóstico Gratuito
            </a>
          </div>

          {/* Trust badges — Business value, not tech features */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/50 mb-16">
            {[
              'Implementación por fases',
              'Capacitación incluida',
              'Sin contrato de permanencia',
              'Soporte continuo',
            ].map((b) => (
              <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {b}
              </span>
            ))}
          </div>

          {/* Hero — Video Demo / Dashboard Screenshot */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="ml-4 text-[10px] text-white/30 font-mono">
                  {YOUTUBE_VIDEO_ID ? 'Demo en 60 segundos' : 'brokerseguro.app/dashboard'}
                </div>
              </div>

              {YOUTUBE_VIDEO_ID && videoPlaying ? (
                /* YouTube embed — loads only on click */
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                    title="Demo de Broker Seguro en 60 segundos"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                /* Thumbnail with play button */
                <div
                  className="relative cursor-pointer group"
                  onClick={() => {
                    if (YOUTUBE_VIDEO_ID) {
                      setVideoPlaying(true);
                    } else {
                      window.open(waURL('demo'), '_blank');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (YOUTUBE_VIDEO_ID) {
                        setVideoPlaying(true);
                      } else {
                        window.open(waURL('demo'), '_blank');
                      }
                    }
                  }}
                  aria-label={YOUTUBE_VIDEO_ID ? 'Reproducir video demo' : 'Solicitar demo en vivo'}
                >
                  <img
                    src="/assets/screenshots/broker/dashboard.png"
                    alt="Dashboard de Broker Seguro — KPIs de pólizas, vencimientos y comisiones en tiempo real"
                    className="w-full h-auto group-hover:brightness-75 transition-all duration-300"
                    loading="eager"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600/90 group-hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-900/40 transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                    <span className="mt-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-sm text-white/90 font-medium">
                      {YOUTUBE_VIDEO_ID ? 'Ver demo en 60 segundos' : 'Solicitar demo en vivo'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS — Business metrics, not tech vanity
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: 70, suffix: '%', label: 'Menos tiempo en reclamos' },
            { value: 100, suffix: '%', label: 'Visibilidad de cartera' },
            { value: 0, suffix: '', prefix: '$49', label: 'Desde / mes' },
            { value: 3, suffix: ' min', label: 'Registrar una póliza' },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-extrabold text-indigo-400 font-mono">
                {s.prefix ? <span>{s.prefix}</span> : <Counter end={s.value} suffix={s.suffix} />}
              </div>
              <div className="text-sm text-white/40 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PAIN POINTS — What brokers suffer today
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Si te identificas con esto, necesitas Broker Seguro
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Estos son los problemas más comunes de los corredores de seguros que aún operan sin un sistema especializado
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pains.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-red-500/[0.04] border border-red-500/10 rounded-xl p-5"
              >
                <div className="text-red-400 mt-0.5 shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-semibold text-sm text-white/80 mb-1">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BENEFITS — Business outcomes, not features
         ════════════════════════════════════════════ */}
      <section id="beneficios" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Lo que ganas con Broker Seguro
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            No vendemos software. Te damos control, orden y visibilidad sobre tu negocio
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className={`${b.bg} border rounded-2xl p-8`}>
                <div className={`${b.accent} mb-4`}>{b.icon}</div>
                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                <p className="text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MID-PAGE CTA — Strategic conversion point
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
            ¿Cuántas renovaciones perdiste este mes?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Una sola póliza que se renueva a tiempo puede pagar meses de suscripción.
            Déjanos mostrarte cómo funciona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waURL('mitad')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Quiero ver una demo <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={waURL('diagnostico')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition"
            >
              <PhoneCall className="w-5 h-5" /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MODULES — Ordered by business priority
         ════════════════════════════════════════════ */}
      <section id="modulos" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Todo lo que necesitas, en un solo lugar
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            12 módulos diseñados para la operación real de un corredor de seguros
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div
                key={i}
                className={`bg-white/[0.02] border ${m.border} rounded-2xl p-6 hover:bg-white/[0.04] transition-colors duration-300`}
              >
                <div className={`${m.accent} mb-3`}>{m.icon}</div>
                <h3 className="text-base font-bold mb-1.5">{m.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SCREENSHOTS — Reduced, focused on key screens
         ════════════════════════════════════════════ */}
      <section id="capturas" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Así se ve por dentro
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Interfaz moderna, intuitiva y diseñada para corredores de seguros
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: 'clients.png', icon: <Users className="w-4 h-4 text-blue-400" />, label: 'Gestión de Clientes', desc: 'Todos tus clientes con búsqueda instantánea, historial y datos completos' },
              { src: 'policies.png', icon: <FileText className="w-4 h-4 text-violet-400" />, label: 'Pólizas y Vencimientos', desc: 'Control de vigencia, estados y alertas automáticas de renovación' },
              { src: 'claims-create.png', icon: <ClipboardList className="w-4 h-4 text-indigo-400" />, label: 'Reclamos paso a paso', desc: 'Proceso guiado con estados claros y documentos adjuntos' },
              { src: 'reports-commissions.png', icon: <BarChart3 className="w-4 h-4 text-amber-400" />, label: 'Reportes de Comisiones', desc: 'Controla cuánto te debe cada aseguradora por periodo' },
              { src: 'portal-policies.png', icon: <Globe className="w-4 h-4 text-emerald-400" />, label: 'Portal del Cliente', desc: 'Tus asegurados consultan pólizas y crean reclamos sin llamarte' },
              { src: 'form-builder.png', icon: <Palette className="w-4 h-4 text-pink-400" />, label: 'Formularios Personalizados', desc: 'Crea formularios para cada tipo de trámite sin programar' },
            ].map((item) => (
              <div key={item.src} className="bg-[#0c0c18] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-indigo-500/20 transition-colors duration-300">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs text-white/50 font-medium">{item.label}</span>
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
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BEFORE / AFTER
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Antes vs. Con Broker Seguro
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            El cambio que notan los corredores desde la primera semana
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/60 font-medium">Proceso</th>
                  <th className="text-center py-3 text-red-400/80 font-medium">Sin sistema</th>
                  <th className="text-center py-3 text-emerald-400/80 font-medium">Con Broker Seguro</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4 text-white/70 font-medium">{row.process}</td>
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
          HOW WE WORK — Process + Trust
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            No te lanzamos un software y te dejamos solo. Te acompañamos paso a paso.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                  {s.icon}
                </div>
                <div className="text-xs text-indigo-400 font-mono font-bold mb-2">PASO {s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PRICING
         ════════════════════════════════════════════ */}
      <section id="precios" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Planes claros, sin sorpresas
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-16">
            Sin contratos de permanencia. Cancela cuando quieras. Tus datos siempre son tuyos.
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
          SOCIAL PROOF — Placeholder for real testimonials
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Diseñado por quienes entienden el negocio
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-12">
            Broker Seguro fue construido en colaboración directa con corredores de seguros reales.
            Cada módulo responde a un problema operativo concreto.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <RefreshCw className="w-6 h-6" />, stat: 'Alertas de vencimiento', desc: 'Para que nunca más pierdas una renovación por descuido' },
              { icon: <DollarSign className="w-6 h-6" />, stat: 'Reportes de comisiones', desc: 'Sabrás exactamente cuánto te debe cada aseguradora' },
              { icon: <Globe className="w-6 h-6" />, stat: 'Portal para tus clientes', desc: 'Menos llamadas, más autonomía para tus asegurados' },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.stat}</h3>
                <p className="text-white/45 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BROCHURE / FOLLETO
         ════════════════════════════════════════════ */}
      <section id="folleto" className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5" /> Documento Ejecutivo
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                  Folleto Profesional
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  Descarga nuestro folleto con información completa: módulos, flujos,
                  portal del cliente, planes y precios. Ideal para compartir con tu socio o equipo.
                </p>
                <a
                  href="/assets/brochure-brokerseguro.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-600/20"
                >
                  <Download className="w-4 h-4" /> Ver Folleto Completo
                </a>
              </div>
              <div className="w-48 md:w-56 flex-shrink-0">
                <div className="bg-[#0a0a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span className="text-[8px] text-white/40 tracking-widest">BROKER SEGURO</span>
                    </div>
                    <div className="h-1.5 w-3/4 bg-gradient-to-r from-indigo-500/40 to-violet-500/40 rounded" />
                    <div className="h-1 w-1/2 bg-white/10 rounded" />
                    <div className="h-1 w-2/3 bg-white/5 rounded" />
                    <div className="grid grid-cols-3 gap-1.5 mt-3">
                      {[1,2,3].map((i) => (
                        <div key={i} className="bg-white/[0.04] rounded p-1.5 text-center">
                          <div className="text-[8px] font-bold text-indigo-400">{['$49', '$99', '$199'][i-1]}</div>
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
                    <div className="text-[7px] text-white/20 text-center">Propuesta comercial</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ — Real sales objections
         ════════════════════════════════════════════ */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-white/40 text-center max-w-xl mx-auto mb-16">
            Las dudas que más escuchamos de corredores como tú
          </p>
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
                    openFaq === i ? 'max-h-80 pb-5' : 'max-h-0'
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
          LEAD CAPTURE FORM
         ════════════════════════════════════════════ */}
      <section id="contacto" className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-3">
              Solicita tu diagnóstico gratuito
            </h2>
            <p className="text-white/40 text-center mb-8">
              Déjanos tus datos y te contactamos para entender tu operación y mostrarte cómo Broker Seguro puede ayudarte.
            </p>

            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Mensaje enviado</h3>
                <p className="text-white/50">Te contactaremos pronto por WhatsApp. Revisa tu teléfono.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block text-xs text-white/40 mb-1.5">Nombre completo *</label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-company" className="block text-xs text-white/40 mb-1.5">Empresa / Correduría *</label>
                    <input
                      id="form-company"
                      name="company"
                      type="text"
                      required
                      placeholder="Nombre de tu bróker"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-phone" className="block text-xs text-white/40 mb-1.5">Teléfono / WhatsApp *</label>
                    <input
                      id="form-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1 (334) XXX-XXXX"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-xs text-white/40 mb-1.5">Email</label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      placeholder="tu@correo.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="form-need" className="block text-xs text-white/40 mb-1.5">¿Cuál es tu principal necesidad?</label>
                  <select
                    id="form-need"
                    name="need"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-indigo-500/50 transition appearance-none"
                  >
                    <option value="Control de pólizas y vencimientos">Control de pólizas y vencimientos</option>
                    <option value="Seguimiento de renovaciones">Seguimiento de renovaciones</option>
                    <option value="Control de comisiones">Control de comisiones</option>
                    <option value="Gestión de reclamos">Gestión de reclamos</option>
                    <option value="Orden operativo general">Orden operativo general</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-indigo-600/20"
                >
                  <Send className="w-5 h-5" /> Enviar y recibir diagnóstico
                </button>
                <p className="text-[11px] text-white/25 text-center">
                  Al enviar, serás redirigido a WhatsApp para confirmar tu solicitud. No compartimos tus datos.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
         ════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Cada día sin sistema
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              es una renovación en riesgo
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Agenda una demo gratuita de 30 minutos. Te mostramos el sistema con datos reales de tu sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-indigo-600/20"
            >
              Solicitar Demo por WhatsApp <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:info@amephia.com?subject=Demo%20Broker%20Seguro"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition"
            >
              <Mail className="w-5 h-5" /> Escribir por Email
            </a>
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky CTA ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#050510]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex gap-3">
        <a
          href={waURL('demo')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition"
        >
          Solicitar Demo
        </a>
        <a
          href={waURL('diagnostico')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-sm transition"
        >
          <MessageSquare className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span><strong>BROKER SEGURO</strong> por AmePhia Systems</span>
          </div>
          <span>&copy; 2026 AmePhia Systems Inc. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default BrokerSeguroLanding;
