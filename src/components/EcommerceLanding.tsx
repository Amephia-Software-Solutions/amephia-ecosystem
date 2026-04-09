import { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart,
  CreditCard,
  Package,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  Users,
  Globe,
  FileText,
  Bell,
  Tag,
  Star,
  Truck,
  RotateCcw,
  Mail,
  Headphones,
  Settings,
  Layers,
  Zap,
  TrendingUp,
  Search,
  Palette,
  Megaphone,
  Gift,
  Warehouse,
  ClipboardList,
  Heart,
  MapPin,
  Eye,
  Smartphone,
  LogIn,
  UserCircle,
  ShoppingBag,
  Play,
  Send,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   VIDEO DEMO CONFIG
   ────────────────────────────────────────────── */
const YOUTUBE_VIDEO_ID: string | null = null;

/* ──────────────────────────────────────────────
   WHATSAPP HELPER
   ────────────────────────────────────────────── */
const WA_NUMBER = '13347324056';

const waURL = (ctx?: string) => {
  const msgs: Record<string, string> = {
    demo: 'Hola! Quiero agendar una demo de AMEPHIA ECOMMERCE para mi negocio. ¿Cuándo podemos coordinar?',
    diagnostico: 'Hola! Quiero un diagnóstico gratuito para mi tienda online. ¿Cómo funciona?',
    basico: 'Hola! Me interesa el Plan BÁSICO ($50/mes) de AMEPHIA ECOMMERCE. ¿Pueden darme más información?',
    profesional: 'Hola! Quiero el Plan PROFESIONAL ($100/mes) de AMEPHIA ECOMMERCE. Quiero agendar una demo.',
    enterprise: 'Hola! Necesito información sobre el Plan ENTERPRISE ($150/mes) de AMEPHIA ECOMMERCE para mi empresa.',
    mitad: 'Hola! Estuve revisando AMEPHIA ECOMMERCE y me interesa saber más. ¿Pueden contactarme?',
  };
  const msg =
    msgs[ctx ?? ''] ??
    'Hola! Me interesa AMEPHIA ECOMMERCE para mi negocio. ¿Pueden agendar una demo?';
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
const EcommerceLanding = () => {
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
    { icon: <Globe className="w-5 h-5" />, title: 'Sin presencia online', desc: 'Tu negocio no tiene tienda en línea. Los clientes buscan, pero no te encuentran. Cada día pierdes ventas.' },
    { icon: <CreditCard className="w-5 h-5" />, title: 'Cobros manuales', desc: 'Transferencias, capturas de pantalla, confirmaciones por WhatsApp. Un proceso de pago que frustra a tus clientes.' },
    { icon: <Package className="w-5 h-5" />, title: 'Inventario descontrolado', desc: 'Vendes productos que no tienes en stock. El conteo manual genera errores y pérdidas constantes.' },
    { icon: <ClipboardList className="w-5 h-5" />, title: 'Pedidos en papel', desc: 'Sin trazabilidad real. No sabes si el pedido fue empacado, enviado o entregado. El cliente pregunta y no tienes respuesta.' },
    { icon: <FileText className="w-5 h-5" />, title: 'Facturación separada', desc: 'Emites facturas electrónicas en otro sistema. Doble trabajo, doble error, sin conexión con tus ventas.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Sin datos de negocio', desc: 'No sabes qué producto vende más, cuál es tu ticket promedio o cuántos carritos abandonados pierdes al mes.' },
  ];

  /* — Benefits — */
  const benefits = [
    { icon: <TrendingUp className="w-7 h-7" />, title: 'Vende 24/7 sin límites', desc: 'Tu tienda abierta siempre. Los clientes compran desde cualquier dispositivo, a cualquier hora, de cualquier lugar.', accent: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: <CreditCard className="w-7 h-7" />, title: 'Cobros automatizados', desc: 'Pasarelas de pago integradas: Nuvei, PayPhone, Kushki, transferencia bancaria. El dinero llega directo a tu cuenta.', accent: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { icon: <Package className="w-7 h-7" />, title: 'Control total de inventario', desc: 'Stock en tiempo real con costo promedio ponderado (WAC), alertas de bajo stock y trazabilidad de cada movimiento.', accent: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: <Shield className="w-7 h-7" />, title: 'Facturación electrónica SRI', desc: 'Genera facturas electrónicas automáticamente con cada venta. Firma digital, envío al SRI y RIDE en un clic.', accent: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  ];

  /* — Modules — */
  const modules = [
    { icon: <ShoppingCart className="w-6 h-6" />, title: 'Catálogo y productos', desc: 'Productos con variantes, múltiples imágenes, SKU automático, traducciones, especificaciones y SEO optimizado.', accent: 'text-blue-400', border: 'border-blue-500/20' },
    { icon: <Layers className="w-6 h-6" />, title: 'Categorías y marcas', desc: 'Categorías jerárquicas con imagen, marcas con logo, y atributos dinámicos personalizables por producto.', accent: 'text-violet-400', border: 'border-violet-500/20' },
    { icon: <CreditCard className="w-6 h-6" />, title: 'Checkout y pagos', desc: 'Checkout optimizado con Nuvei, PayPhone, Kushki, transferencia bancaria. Cálculo automático de impuestos y envío.', accent: 'text-emerald-400', border: 'border-emerald-500/20' },
    { icon: <Package className="w-6 h-6" />, title: 'Gestión de pedidos', desc: 'Flujo completo: pendiente, confirmado, procesando, enviado, entregado. Historial de estados y notificaciones automáticas.', accent: 'text-amber-400', border: 'border-amber-500/20' },
    { icon: <Warehouse className="w-6 h-6" />, title: 'Inventario y almacenes', desc: 'Kardex completo con WAC, transferencias entre bodegas, alertas de stock bajo y movimientos auditados.', accent: 'text-cyan-400', border: 'border-cyan-500/20' },
    { icon: <FileText className="w-6 h-6" />, title: 'Facturación electrónica SRI', desc: 'Firma XAdES, transmisión al SRI, autorización automática, generación de RIDE y descarga de XML.', accent: 'text-rose-400', border: 'border-rose-500/20' },
    { icon: <Tag className="w-6 h-6" />, title: 'Cupones y descuentos', desc: 'Cupones porcentuales, monto fijo o envío gratis. Límites de uso, monto mínimo, productos específicos y primera compra.', accent: 'text-pink-400', border: 'border-pink-500/20' },
    { icon: <Star className="w-6 h-6" />, title: 'Reseñas y valoraciones', desc: 'Sistema de estrellas con moderación, respuesta del admin, reseñas destacadas y compra verificada.', accent: 'text-yellow-400', border: 'border-yellow-500/20' },
    { icon: <RotateCcw className="w-6 h-6" />, title: 'Devoluciones (RMA)', desc: 'Flujo completo de devoluciones: solicitud, aprobación, recepción, reembolso. Razones categorizadas y auditoría.', accent: 'text-orange-400', border: 'border-orange-500/20' },
    { icon: <Truck className="w-6 h-6" />, title: 'Envíos configurables', desc: 'Tarifas por zona, peso y método. Cálculo en tiempo real durante el checkout. Número de seguimiento por pedido.', accent: 'text-teal-400', border: 'border-teal-500/20' },
    { icon: <ClipboardList className="w-6 h-6" />, title: 'Cotizaciones (B2B)', desc: 'Solicitud de cotización, aprobación y conversión a pedido. Ideal para ventas corporativas y proyectos.', accent: 'text-indigo-400', border: 'border-indigo-500/20' },
    { icon: <Gift className="w-6 h-6" />, title: 'Programa de lealtad', desc: 'Puntos por compra, canje por descuento, umbral mínimo configurable. Fideliza a tus mejores clientes.', accent: 'text-purple-400', border: 'border-purple-500/20' },
    { icon: <Megaphone className="w-6 h-6" />, title: 'Email marketing', desc: 'Campañas con métricas: enviados, abiertos, clics. Templates reutilizables, newsletter y carritos abandonados.', accent: 'text-red-400', border: 'border-red-500/20' },
    { icon: <Headphones className="w-6 h-6" />, title: 'Tickets de soporte', desc: 'Sistema de tickets con prioridad, asignación, estados y mensajería interna. Tu cliente siempre atendido.', accent: 'text-sky-400', border: 'border-sky-500/20' },
    { icon: <Palette className="w-6 h-6" />, title: 'Constructor de homepage', desc: '10 tipos de secciones arrastrables: hero, categorías, productos, marcas, testimonios, newsletter y más.', accent: 'text-fuchsia-400', border: 'border-fuchsia-500/20' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Dashboard CEO y reportes', desc: 'KPIs, ingresos, comparativas semanales, productos estrella, carritos abandonados y analítica de wishlist.', accent: 'text-lime-400', border: 'border-lime-500/20' },
    { icon: <Globe className="w-6 h-6" />, title: 'REST API documentada', desc: 'API completa con Swagger/OpenAPI: catálogo, carrito, búsqueda, recomendaciones y notificaciones.', accent: 'text-slate-400', border: 'border-slate-500/20' },
    { icon: <Bell className="w-6 h-6" />, title: 'Webhooks y eventos', desc: 'Notifica a sistemas externos en cada evento: pedido creado, pago procesado, envío actualizado.', accent: 'text-zinc-400', border: 'border-zinc-500/20' },
  ];

  /* — Pricing Plans — */
  const plans = [
    {
      name: 'Básico',
      price: 50,
      desc: 'Para emprendedores que inician su tienda online.',
      features: [
        'Hasta 500 productos',
        '1 usuario administrador',
        'Catálogo, categorías y marcas',
        'Carrito y checkout',
        'Gestión de pedidos',
        'Storefront responsive',
        'Pasarela de pago básica',
        'Soporte por email',
      ],
      excluded: [
        'Inventario avanzado (Kardex)',
        'Cupones y descuentos',
        'Reseñas de clientes',
        'Reportes avanzados',
        'Facturación electrónica SRI',
        'API REST',
        'Programa de lealtad',
        'Email marketing',
      ],
      cta: 'basico',
      popular: false,
      accent: 'border-white/10',
      badge: '',
    },
    {
      name: 'Profesional',
      price: 100,
      desc: 'Para negocios en crecimiento que necesitan más herramientas.',
      features: [
        'Productos ilimitados',
        'Hasta 3 usuarios',
        'Todo del plan Básico',
        'Inventario con Kardex y WAC',
        'Cupones y promociones',
        'Reseñas con moderación',
        'Banners promocionales',
        'Reportes y dashboard CEO',
        'Carritos abandonados',
        'Constructor de homepage',
        'Soporte prioritario',
      ],
      excluded: [
        'Facturación electrónica SRI',
        'API REST y webhooks',
        'Programa de lealtad',
        'Email marketing',
        'Devoluciones (RMA)',
      ],
      cta: 'profesional',
      popular: true,
      accent: 'border-blue-500/50',
      badge: 'Más Popular',
    },
    {
      name: 'Enterprise',
      price: 150,
      desc: 'Para empresas que necesitan el ecosistema completo.',
      features: [
        'Productos ilimitados',
        'Usuarios ilimitados',
        'Todo del plan Profesional',
        'Facturación electrónica SRI',
        'Pasarelas avanzadas (Nuvei, PayPhone, Kushki)',
        'API REST documentada (Swagger)',
        'Webhooks y eventos',
        'Programa de lealtad',
        'Email marketing y campañas',
        'Devoluciones (RMA)',
        'Tickets de soporte',
        'Cotizaciones B2B',
        'Bundles de productos',
        'Envíos configurables',
        'Atributos dinámicos',
        'Multi-idioma',
        'Soporte dedicado 24/7',
      ],
      excluded: [],
      cta: 'enterprise',
      popular: false,
      accent: 'border-violet-500/40',
      badge: 'Todo Incluido',
    },
  ];

  /* — FAQ — */
  const faqs = [
    {
      q: '¿Puedo usar mi propio dominio?',
      a: 'Sí. Cada tienda tiene su propio dominio personalizado, logo, favicon y colores de marca. Tu tienda se ve 100% tuya.',
    },
    {
      q: '¿Qué pasarelas de pago soporta?',
      a: 'Nuvei (SafeCharge), PayPhone, Kushki y transferencia bancaria con comprobante. Todas configurables desde el panel de administración.',
    },
    {
      q: '¿La facturación electrónica cumple con el SRI?',
      a: 'Sí. Firma XAdES con certificado .p12, transmisión en ambientes de prueba y producción, autorización automática y generación de RIDE (PDF). 100% compatible con la normativa SRI de Ecuador.',
    },
    {
      q: '¿Cómo funciona el inventario?',
      a: 'Sistema Kardex completo con costo promedio ponderado (WAC). Cada movimiento de stock queda registrado: compras, ventas, ajustes, devoluciones y transferencias entre bodegas.',
    },
    {
      q: '¿Puedo migrar mis productos desde otro sistema?',
      a: 'Sí. Nuestro equipo te ayuda con la migración de productos, categorías, clientes e historial. El proceso es guiado y sin pérdida de datos.',
    },
    {
      q: '¿Hay API para conectar con otros sistemas?',
      a: 'Sí. API REST completa documentada con Swagger/OpenAPI: catálogo, carrito, búsqueda, recomendaciones, notificaciones y más. Autenticación con Laravel Sanctum.',
    },
    {
      q: '¿Puedo probar antes de pagar?',
      a: 'Sí. Ofrecemos una demo personalizada donde puedes ver todas las funcionalidades en acción. Contáctanos por WhatsApp para agendar.',
    },
    {
      q: '¿Soporta múltiples idiomas?',
      a: 'Sí. Los productos soportan campos traducibles: nombre, descripción, especificaciones y SEO. El sistema por defecto funciona en español con soporte para otros idiomas.',
    },
  ];

  /* — Stats — */
  const stats = [
    { value: 22, suffix: '+', label: 'Módulos integrados' },
    { value: 3, suffix: '', label: 'Pasarelas de pago' },
    { value: 10, suffix: '', label: 'Secciones de homepage' },
    { value: 99, suffix: '.9%', label: 'Uptime garantizado' },
  ];

  /* — Nav links — */
  const navLinks = [
    { label: 'Características', href: '#features' },
    { label: 'Módulos', href: '#modules' },
    { label: 'Comprador', href: '#buyer' },
    { label: 'Planes', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contact' },
  ];

  const goHome = () => {
    window.history.pushState(null, '', `/${window.location.search}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased">
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">AmePhia</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-bold tracking-tight">
              <span className="text-blue-400">AMEPHIA</span> ECOMMERCE
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-wider">
                {l.label}
              </a>
            ))}
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Solicitar Demo
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X className="w-5 h-5" /> : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenu(false)}
                className="block text-sm text-white/60 hover:text-white py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="block text-center px-4 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-lg"
            >
              Solicitar Demo
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-6">
              <ShoppingCart className="w-3.5 h-3.5" />
              Plataforma SaaS Multi-Tenant
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Tu tienda online{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                profesional
              </span>
              <br />
              en semanas, no meses
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-8 leading-relaxed">
              Plataforma ecommerce completa con catálogo, checkout, pagos, inventario Kardex,
              facturación electrónica SRI, devoluciones, programa de lealtad, email marketing
              y 22+ módulos listos para vender.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waURL('demo')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-[0_8px_32px_rgba(59,130,246,0.3)]"
              >
                Agendar Demo Gratis
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
              >
                Ver Características
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/30 font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> SSL + PCI</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> SRI Ecuador</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Laravel 12</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Multi-idioma</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO / SCREENSHOT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
          {YOUTUBE_VIDEO_ID && videoPlaying ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="Demo AMEPHIA ECOMMERCE"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-500/5 via-[#0a0a0a] to-violet-500/5 flex flex-col items-center justify-center gap-6 p-8">
              {/* Animated store mockup */}
              <div className="w-full max-w-2xl">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <div className="flex-1 bg-white/5 rounded-full h-6 mx-4 flex items-center px-3">
                      <Search className="w-3 h-3 text-white/20 mr-2" />
                      <span className="text-[10px] text-white/20 font-mono">tutienda.com</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-md mb-2" />
                        <div className="h-2 bg-white/10 rounded w-3/4 mb-1" />
                        <div className="h-2 bg-blue-400/20 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => YOUTUBE_VIDEO_ID ? setVideoPlaying(true) : window.open(waURL('demo'), '_blank')}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  {YOUTUBE_VIDEO_ID ? 'Ver demo en video' : 'Solicitar demo en vivo'}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[11px] font-mono text-red-400 uppercase tracking-wider mb-4">
            Problemas comunes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            ¿Tu negocio tiene estos{' '}
            <span className="text-red-400">problemas</span>?
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Si te identificas con alguno, AMEPHIA ECOMMERCE los resuelve todos desde el día uno.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pains.map((p, i) => (
            <div
              key={i}
              className="group bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-red-500/20 hover:bg-red-500/[0.03] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{p.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] font-mono text-blue-400 uppercase tracking-wider mb-4">
            La solución
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Todo lo que necesitas para{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              vender online
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Una plataforma que integra todo: desde el catálogo hasta la facturación electrónica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`${b.bg} border rounded-2xl p-6 md:p-8 hover:scale-[1.01] transition-transform`}
            >
              <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center ${b.accent} mb-5`}>
                {b.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
              <p className="text-white/50 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-violet-500/10 border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Listo para lanzar tu tienda online?
          </h3>
          <p className="text-white/50 mb-6 max-w-xl mx-auto">
            Agenda una demo gratuita y te mostramos cómo AMEPHIA ECOMMERCE puede transformar tu negocio.
          </p>
          <a
            href={waURL('mitad')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Hablar con un asesor
          </a>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-[11px] font-mono text-violet-400 uppercase tracking-wider mb-4">
            22+ Módulos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Un ecosistema completo para tu{' '}
            <span className="text-violet-400">ecommerce</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Cada módulo está diseñado para resolver una necesidad real de tu operación de ventas online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <div
              key={i}
              className={`group bg-white/[0.02] border ${m.border} rounded-xl p-5 hover:bg-white/[0.04] transition-all`}
            >
              <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${m.accent} mb-3`}>
                {m.icon}
              </div>
              <h3 className="font-semibold text-white mb-1.5 text-sm">{m.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Extra features row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Users className="w-4 h-4" />, label: 'Login social (Google, Facebook, Apple)' },
            { icon: <Search className="w-4 h-4" />, label: 'Búsqueda con Meilisearch' },
            { icon: <Settings className="w-4 h-4" />, label: 'Tema y diseño configurable' },
            { icon: <RefreshCw className="w-4 h-4" />, label: 'Bundles de productos' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white/50">
              <span className="text-blue-400">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── BUYER / CUSTOMER EXPERIENCE ── */}
      <section id="buyer" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-4">
            Experiencia del comprador
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Tu cliente merece una experiencia de compra{' '}
            <span className="text-teal-400">excepcional</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Cada detalle del storefront está pensado para convertir visitantes en clientes fieles.
          </p>
        </div>

        {/* Customer journey flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Storefront experience */}
          <div className="bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/15 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-500/15 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Storefront Responsive</h3>
                <p className="text-xs text-white/40">Tienda optimizada para cualquier dispositivo</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Palette className="w-4 h-4" />, text: 'Homepage personalizable con 10 tipos de secciones: hero, categorías, productos, marcas, testimonios, newsletter' },
                { icon: <Search className="w-4 h-4" />, text: 'Búsqueda inteligente con Meilisearch: autocompletado, sugerencias y búsqueda facetada por categoría, marca y precio' },
                { icon: <Layers className="w-4 h-4" />, text: 'Catálogo con filtros avanzados: categoría, marca, rango de precio, stock disponible y ordenamiento' },
                { icon: <Eye className="w-4 h-4" />, text: 'Página de producto con galería de imágenes, zoom, especificaciones, reseñas, productos relacionados y variantes' },
                { icon: <Smartphone className="w-4 h-4" />, text: 'Diseño responsive con tema, colores, tipografía y CSS personalizable por tienda' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-teal-400 mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm text-white/60 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Purchase flow */}
          <div className="bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/15 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/15 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Flujo de Compra</h3>
                <p className="text-xs text-white/40">Del carrito al pago en minutos</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: <ShoppingCart className="w-4 h-4" />, text: 'Carrito persistente con detección de abandono, recordatorio automático por email y cupones aplicables' },
                { icon: <MapPin className="w-4 h-4" />, text: 'Checkout con direcciones de envío y facturación, selección de método de envío y cálculo de tarifas en tiempo real' },
                { icon: <CreditCard className="w-4 h-4" />, text: 'Pago seguro con Nuvei, PayPhone, Kushki o transferencia bancaria con comprobante' },
                { icon: <Package className="w-4 h-4" />, text: 'Confirmación instantánea con número de pedido, resumen y factura electrónica SRI automática' },
                { icon: <Truck className="w-4 h-4" />, text: 'Tracking del pedido: estados en tiempo real, número de seguimiento y notificaciones por email' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-blue-400 mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm text-white/60 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer account features */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-500/15 rounded-xl flex items-center justify-center">
              <UserCircle className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Cuenta del Cliente</h3>
              <p className="text-xs text-white/40">Portal completo de autoservicio para el comprador</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <UserCircle className="w-5 h-5" />, title: 'Perfil y datos', desc: 'Edición de nombre, email, teléfono, identificación, fecha de nacimiento, foto de perfil y preferencias de privacidad.', accent: 'text-violet-400', border: 'border-violet-500/15' },
              { icon: <ShoppingBag className="w-5 h-5" />, title: 'Historial de pedidos', desc: 'Lista completa de pedidos con estado, detalle, descarga de factura, etiqueta de envío e inicio de devolución.', accent: 'text-blue-400', border: 'border-blue-500/15' },
              { icon: <MapPin className="w-5 h-5" />, title: 'Direcciones guardadas', desc: 'Gestión de múltiples direcciones de envío y facturación. Selección rápida durante el checkout.', accent: 'text-emerald-400', border: 'border-emerald-500/15' },
              { icon: <Heart className="w-5 h-5" />, title: 'Lista de deseos', desc: 'Productos guardados para comprar después. Notificaciones de cambio de precio y agregar al carrito con un clic.', accent: 'text-rose-400', border: 'border-rose-500/15' },
              { icon: <Star className="w-5 h-5" />, title: 'Reseñas y valoraciones', desc: 'El cliente deja reseñas con estrellas, pros y contras. Badge de compra verificada para mayor credibilidad.', accent: 'text-yellow-400', border: 'border-yellow-500/15' },
              { icon: <Gift className="w-5 h-5" />, title: 'Puntos de lealtad', desc: 'Dashboard de puntos acumulados, historial de transacciones y canje por descuento en la siguiente compra.', accent: 'text-purple-400', border: 'border-purple-500/15' },
              { icon: <RotateCcw className="w-5 h-5" />, title: 'Devoluciones', desc: 'Solicitud de devolución desde el pedido: selección de artículos, razón categorizada y seguimiento del reembolso.', accent: 'text-orange-400', border: 'border-orange-500/15' },
              { icon: <Bell className="w-5 h-5" />, title: 'Notificaciones', desc: 'Centro de notificaciones: confirmaciones, envíos, entregas, aprobaciones de cuenta y recordatorios de carrito.', accent: 'text-cyan-400', border: 'border-cyan-500/15' },
            ].map((item, i) => (
              <div key={i} className={`bg-white/[0.02] border ${item.border} rounded-xl p-4`}>
                <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${item.accent} mb-2.5`}>
                  {item.icon}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Auth & engagement row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 shrink-0">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Login social</h4>
              <p className="text-xs text-white/40 leading-relaxed">Registro con Google, Facebook o Apple. Un clic y el cliente ya tiene cuenta. Sin formularios largos.</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Emails transaccionales</h4>
              <p className="text-xs text-white/40 leading-relaxed">Confirmación de pedido, envío, entrega, carrito abandonado, bienvenida y aprobación de cuenta.</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <div className="w-9 h-9 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-400 shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Newsletter y campañas</h4>
              <p className="text-xs text-white/40 leading-relaxed">Suscripción a newsletter, campañas de email marketing con métricas de apertura, clics y desuscripción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-4">
            Planes y precios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Elige el plan que se adapte a tu{' '}
            <span className="text-emerald-400">negocio</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Todos los planes incluyen hosting, actualizaciones y soporte. Sin costos ocultos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white/[0.02] border ${plan.accent} rounded-2xl p-6 flex flex-col ${
                plan.popular ? 'ring-1 ring-blue-500/30 scale-[1.02]' : ''
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    plan.popular
                      ? 'bg-blue-500 text-white'
                      : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="mb-6 pt-2">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-white/40 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-sm text-white/40">/mes</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
                {plan.excluded.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-white/15 shrink-0 mt-0.5" />
                    <span className="text-white/25">{f}</span>
                  </div>
                ))}
              </div>

              <a
                href={waURL(plan.cta)}
                target="_blank"
                rel="noreferrer"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                Empezar con {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE / TECH ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-4">
            Arquitectura
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Construido con tecnología{' '}
            <span className="text-cyan-400">de primer nivel</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Laravel 12', desc: 'Backend robusto' },
            { name: 'Filament v3', desc: 'Panel admin' },
            { name: 'Livewire 3', desc: 'UI reactiva' },
            { name: 'Tailwind v4', desc: 'Diseño responsive' },
            { name: 'MySQL 8+', desc: 'Base de datos' },
            { name: 'Sanctum', desc: 'API Auth' },
          ].map((tech) => (
            <div key={tech.name} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center hover:border-cyan-500/20 transition-colors">
              <div className="text-sm font-semibold text-white mb-0.5">{tech.name}</div>
              <div className="text-[10px] text-white/30 font-mono uppercase">{tech.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-blue-400 font-bold text-lg mb-1">Multi-Tenant SaaS</div>
              <p className="text-xs text-white/40">Cada tienda está completamente aislada. Datos, configuración, dominio y branding 100% independientes.</p>
            </div>
            <div>
              <div className="text-violet-400 font-bold text-lg mb-1">API REST + Swagger</div>
              <p className="text-xs text-white/40">Documentación OpenAPI auto-generada. Integra con apps móviles, ERPs y cualquier sistema externo.</p>
            </div>
            <div>
              <div className="text-emerald-400 font-bold text-lg mb-1">Modular por Plan</div>
              <p className="text-xs text-white/40">22 módulos activables por suscripción. Escala funcionalidades conforme crece tu negocio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-sm text-white/90 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-4 text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / FINAL CTA ── */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-2">Solicita tu demo</h3>
            <p className="text-sm text-white/40 mb-6">
              Completa el formulario y te contactamos en menos de 24 horas.
            </p>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-3" />
                <p className="text-lg font-semibold text-white mb-1">Mensaje enviado</p>
                <p className="text-sm text-white/40">Te contactaremos pronto por WhatsApp o email.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Nombre</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Mensaje</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos sobre tu negocio..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>

          {/* WhatsApp & Info */}
          <div className="flex flex-col gap-5">
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="group bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">WhatsApp</h4>
                  <p className="text-xs text-white/40">Respuesta en minutos</p>
                </div>
              </div>
              <p className="text-sm text-white/50">
                Escríbenos directamente y te atendemos al instante. Resolvemos dudas, agendamos demos y te ayudamos con la configuración.
              </p>
            </a>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
              <h4 className="font-bold text-white mb-4">¿Por qué AMEPHIA ECOMMERCE?</h4>
              <div className="space-y-3">
                {[
                  'Plataforma todo-en-uno: no necesitas 5 herramientas separadas',
                  'Facturación electrónica SRI integrada nativamente',
                  'Inventario Kardex profesional con costo promedio ponderado',
                  'Multi-tenant: tu tienda es 100% independiente y privada',
                  'Soporte humano real, no chatbots genéricos',
                  'Actualizaciones constantes sin costo adicional',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Email</div>
                <div className="text-xs text-white/40">info@amephia.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/25 font-mono uppercase tracking-widest">
          <span>AmePhia Systems Inc.</span>
          <span>AMEPHIA ECOMMERCE — Plataforma SaaS</span>
          <span>&copy; 2026</span>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <a
          href={waURL('demo')}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-500 text-white font-semibold rounded-xl shadow-[0_8px_32px_rgba(59,130,246,0.4)]"
        >
          <ShoppingCart className="w-4 h-4" />
          Solicitar Demo Gratis
        </a>
      </div>
    </div>
  );
};

export default EcommerceLanding;
