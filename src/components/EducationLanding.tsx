import { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  ClipboardCheck,
  FileText,
  DollarSign,
  HeartHandshake,
  BookOpen,
  Settings2,
  ShieldCheck,
  Lock,
  Database,
  Eye,
  QrCode,
  Mail,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Zap,
  Award,
  Layers,
  Star,
  ChevronDown,
  Check,
} from 'lucide-react';

/* ────────────────────────────────────────────────
   WHATSAPP HELPER
   ──────────────────────────────────────────────── */
const WA_NUMBER = '13347324056';

const waURL = (plan?: string) => {
  const msgs: Record<string, string> = {
    starter: `Hola! Me interesa el Plan STARTER de AMEPHIA EDU para mi institución. ¿Pueden darme más información?`,
    profesional: `Hola! Quiero el Plan PROFESIONAL de AMEPHIA EDU. Quiero agendar una demo.`,
    enterprise: `Hola! Necesito información sobre el Plan ENTERPRISE de AMEPHIA EDU para mi institución educativa.`,
    demo: `Hola! Me gustaría agendar una demostración de AMEPHIA EDU.`,
  };
  const msg = msgs[plan ?? ''] ?? `Hola! Me interesa AMEPHIA EDU. ¿Pueden agendar una demo?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
};

/* ────────────────────────────────────────────────
   ANIMATED COUNTER
   ──────────────────────────────────────────────── */
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
          const step = Math.max(1, Math.ceil(end / (duration / 16)));
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
      {prefix}
      {val.toLocaleString('es-EC')}
      {suffix}
    </span>
  );
};

/* ────────────────────────────────────────────────
   DATOS DE MÓDULOS
   ──────────────────────────────────────────────── */
const MODULOS = [
  {
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    titulo: 'Académico',
    desc: 'Períodos, cursos, materias, paralelos y distributivos. Toda la estructura académica administrable.',
    features: ['Períodos académicos', 'Cursos con OVP configurable', 'Distributivos docente-materia', 'Promoción anual automática'],
  },
  {
    icon: ClipboardCheck,
    color: 'from-green-500 to-emerald-600',
    titulo: 'Calificaciones',
    desc: 'Motor configurable Tabla 9 MinEduc 2025. PI + Examen, supletorio, refuerzo y mejoramiento LOEI.',
    features: ['Fórmula MinEduc 2025 (70/30)', 'Refuerzo + Mejoramiento LOEI', 'Rectificaciones con flujo', 'Importación Excel masiva'],
  },
  {
    icon: FileText,
    color: 'from-purple-500 to-pink-600',
    titulo: 'Reportes oficiales',
    desc: 'Libreta ministerial 2025, sábana, cuadros distrito/junta. PDFs con QR de verificación pública.',
    features: ['Libreta Tabla 9 MinEduc', 'Sábana por paralelo', 'Cuadro Final Distrito', 'QR verificación pública'],
  },
  {
    icon: DollarSign,
    color: 'from-amber-500 to-orange-600',
    titulo: 'Financiero',
    desc: 'Pagos, becas, convenios, bloqueos, archivo bancario. Conciliación con 7 bancos del Ecuador.',
    features: ['Conciliación Banco Pichincha/Guayaquil/Pacífico', 'Dashboard con gráficos', 'Exports Excel profesionales', 'Notif automática al padre'],
  },
  {
    icon: HeartHandshake,
    color: 'from-rose-500 to-red-600',
    titulo: 'DCE — Bienestar',
    desc: 'Ficha psicopedagógica 7 secciones + acompañamientos + citaciones al representante.',
    features: ['Ficha 7 secciones (LOPDP)', 'Acompañamientos DCE', 'Citación oficial al padre', 'Historial acumulativo'],
  },
  {
    icon: BookOpen,
    color: 'from-cyan-500 to-blue-600',
    titulo: 'Aula virtual (LMS)',
    desc: 'LMS nativo: unidades, lecciones, tareas, quizzes, foros, calendario, analytics, certificados.',
    features: ['Unidades + lecciones + recursos', 'Quizzes auto-calificables', 'Foros y mensajería', 'Certificados con QR'],
  },
  {
    icon: Settings2,
    color: 'from-slate-600 to-zinc-700',
    titulo: 'Administración',
    desc: 'Todo configurable desde panel. Sin tocar código para cambios futuros del Ministerio.',
    features: ['Esquemas calificación configurables', 'Plantillas email editables', 'Layouts bancarios admin', 'Audit log LOPDP'],
  },
  {
    icon: Smartphone,
    color: 'from-violet-500 to-purple-600',
    titulo: 'Portal del padre',
    desc: 'PWA instalable: ver notas, asistencia, pagos, libretas, calendario y mensajes en vivo.',
    features: ['PWA offline', 'Notif email + in-app', 'Multi-idioma (es/qu/shu)', 'Verificación pública con QR'],
  },
];

const DIFERENCIADORES = [
  {
    icon: Award,
    titulo: 'MinEduc Tabla 9 2025',
    desc: 'Único en Ecuador con cumplimiento Tabla 9 oficial: PI 70% + Examen 30% por trimestre, totalmente configurable.',
  },
  {
    icon: ShieldCheck,
    titulo: 'LOEI completo',
    desc: 'Refuerzo, supletorio, mejoramiento. Validaciones automáticas (no puede haber mejoramiento sin supletorio reprobado).',
  },
  {
    icon: Lock,
    titulo: 'LOPDP por diseño',
    desc: 'Audit log inmutable en 10 modelos, 2FA obligatorio admin, sanitización de PII, retención configurable.',
  },
  {
    icon: QrCode,
    titulo: 'Verificación pública con QR',
    desc: 'Cada libreta lleva código único + QR. Cualquier ciudadano valida autenticidad. Combate fraude documental.',
  },
  {
    icon: Database,
    titulo: 'Backups verificados',
    desc: 'Diario automático + verify semanal con restore en BD temporal. Nunca un backup que no se pueda restaurar.',
  },
  {
    icon: Zap,
    titulo: 'Performance extrema',
    desc: 'Cache Redis 4-capas: sábana de 8.4s → 0.5ms warm. 17,000× más rápido. Soporta 1000+ estudiantes sin lag.',
  },
];

const STACK = [
  { nombre: 'Laravel 12', categoria: 'Backend' },
  { nombre: 'PHP 8.4', categoria: 'Runtime' },
  { nombre: 'MySQL 8', categoria: 'Database' },
  { nombre: 'Redis 7', categoria: 'Cache' },
  { nombre: 'Next.js 16', categoria: 'Frontend' },
  { nombre: 'React 19', categoria: 'UI' },
  { nombre: 'Tailwind 4', categoria: 'Styling' },
  { nombre: 'Recharts', categoria: 'Charts' },
  { nombre: 'Spatie Permission', categoria: 'RBAC' },
  { nombre: 'DomPDF', categoria: 'Reports' },
  { nombre: 'Playwright', categoria: 'E2E Tests' },
  { nombre: 'Sentry-compatible', categoria: 'Monitoring' },
];

const PLANES = [
  {
    nombre: 'Starter',
    precio: '$99',
    sub: '/mes',
    target: 'Hasta 200 estudiantes',
    color: 'border-slate-300',
    cta: 'starter',
    features: [
      'Académico + Calificaciones',
      'Reportes MinEduc oficiales',
      'Portal del padre',
      'Email automático',
      'Audit log LOPDP',
      '5 GB storage',
      'Soporte email',
    ],
    extras: [],
    destacado: false,
  },
  {
    nombre: 'Profesional',
    precio: '$199',
    sub: '/mes',
    target: 'Hasta 800 estudiantes',
    color: 'border-blue-500 ring-2 ring-blue-500',
    cta: 'profesional',
    features: [
      'TODO de Starter +',
      'LMS nativo (Aula virtual)',
      'Dashboard financiero con gráficos',
      'Conciliación bancaria (7 bancos)',
      'DCE completo + Ficha psicopedagógica',
      'Refuerzo + Mejoramiento LOEI',
      'QR verificación pública libretas',
      '50 GB storage',
      'Soporte prioritario WhatsApp',
    ],
    extras: ['Más popular'],
    destacado: true,
  },
  {
    nombre: 'Enterprise',
    precio: 'A medida',
    sub: '',
    target: 'Sin límite',
    color: 'border-slate-300',
    cta: 'enterprise',
    features: [
      'TODO de Profesional +',
      'Multi-institución',
      'Integración SRI (con tu certificado)',
      'SLA 99.9% con créditos',
      'Manager dedicado',
      'Capacitación on-site',
      'Personalización de blades PDF',
      'Storage ilimitado',
      'Backups verificados con restore externo',
    ],
    extras: [],
    destacado: false,
  },
];

const FAQS = [
  {
    q: '¿Cumple con el formato oficial del Ministerio de Educación 2025?',
    a: 'Sí. AmePhia EDU implementa la Tabla 9 oficial MinEduc 2025: Formativa 70% (Proyecto Interdisciplinar) + Sumativa 30% (Examen). Todo configurable desde el panel — si el Ministerio cambia las reglas, no tienes que esperar a un programador.',
  },
  {
    q: '¿Qué pasa si el Distrito Educativo cambia el esquema de calificación?',
    a: 'Nuestro motor es completamente configurable: esquemas de calificación, pesos, escalas cualitativas, fórmulas libres, umbrales de aprobación, reglas de recuperación, fases de evaluación. El admin lo edita sin tocar código.',
  },
  {
    q: '¿Soporta refuerzo pedagógico y notas de mejoramiento (LOEI)?',
    a: 'Sí, con el flujo completo: refuerzo durante el año → supletorio al fin → mejoramiento si reprueba supletorio → repitencia si reprueba mejoramiento. Cada paso notifica automáticamente al representante.',
  },
  {
    q: '¿Cómo manejan la protección de datos de menores (LOPDP)?',
    a: 'Audit log inmutable de TODOS los cambios críticos (quién, cuándo, IP, user-agent), 2FA obligatorio para admins, sanitización automática de passwords/secretos, datos sensibles enmascarados en consultas públicas, retención configurable. Cumple LOPDP por diseño.',
  },
  {
    q: '¿Sube el archivo del banco para conciliar pagos?',
    a: 'Sí. 7 layouts preconfigurados (Pichincha, Guayaquil, Pacífico, Produbanco, etc.) + posibilidad de agregar bancos nuevos desde el panel. Sube el archivo, previsualiza, confirma, y cada padre recibe email "tu pago fue acreditado".',
  },
  {
    q: '¿Funciona offline?',
    a: 'Sí. Es una PWA (Progressive Web App) — instalable en cualquier celular, tablet o PC. Cache offline para shell + assets. Útil en zonas con conectividad intermitente.',
  },
  {
    q: '¿Cuánto tarda la implementación?',
    a: 'Plan Starter: 1 semana (migración de datos + capacitación). Profesional: 2-3 semanas. Enterprise: 4-6 semanas con personalización completa. Hacemos el setup nosotros — no necesitas equipo técnico.',
  },
  {
    q: '¿Y si tengo que migrar desde otro sistema?',
    a: 'Tenemos herramientas de importación (Excel masivo de estudiantes, pre-matrículas masivas con promoción automática de curso). También hicimos migración exitosa desde sistemas legacy en producción.',
  },
];

/* ────────────────────────────────────────────────
   COMPONENTE
   ──────────────────────────────────────────────── */
export default function EducationLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ──────────── NAV ──────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 grid place-items-center text-white font-bold text-sm">
              AE
            </div>
            <span className="font-bold text-lg">AmePhia EDU</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => scrollTo('modulos')} className="hover:text-blue-600">Módulos</button>
            <button onClick={() => scrollTo('diferenciadores')} className="hover:text-blue-600">Por qué</button>
            <button onClick={() => scrollTo('planes')} className="hover:text-blue-600">Planes</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-blue-600">FAQ</button>
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              Agendar demo
            </a>
          </div>
        </div>
      </nav>

      {/* ──────────── HERO ──────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(59,130,246,0.15),transparent_55%),radial-gradient(900px_500px_at_0%_110%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-5">
                <Award className="w-3 h-3" />
                Cumple Tabla 9 MinEduc 2025 · LOPDP · LOEI
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
                El sistema escolar que <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">crece con tu institución</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Académico, calificaciones MinEduc 2025, financiero con conciliación bancaria, DCE psicopedagógico, aula virtual LMS, portal del padre PWA — <strong>todo configurable desde el panel.</strong> Sin tocar código cuando cambien las reglas del Distrito.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waURL('demo')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:shadow-xl transition"
                >
                  Agendar demo gratuita <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => scrollTo('modulos')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 rounded-xl font-semibold hover:border-slate-400 transition"
                >
                  Ver módulos
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Sin instalación local</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Setup en 1 semana</div>
                <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-600" /> Soporte en español</div>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-2 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="p-6 grid grid-cols-3 gap-3">
                    {[
                      { lbl: 'Estudiantes', val: '1,247', color: 'bg-blue-50 text-blue-700' },
                      { lbl: 'Promedio', val: '8.45', color: 'bg-green-50 text-green-700' },
                      { lbl: 'Cobrado', val: '$45K', color: 'bg-purple-50 text-purple-700' },
                    ].map((c) => (
                      <div key={c.lbl} className={`rounded-lg p-3 ${c.color}`}>
                        <div className="text-xs opacity-70">{c.lbl}</div>
                        <div className="text-xl font-bold mt-1">{c.val}</div>
                      </div>
                    ))}
                    <div className="col-span-3 rounded-lg bg-slate-50 p-3 h-24 flex items-end gap-1.5">
                      {[40, 65, 45, 70, 90, 60, 80].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-indigo-500"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="col-span-3 space-y-1.5">
                      {['Libreta ministerial · QR ✓', 'Conciliación · Banco Pichincha', 'Email a 142 representantes ✓'].map((t) => (
                        <div key={t} className="text-xs flex items-center gap-1.5 text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-lg">
                Sistema vivo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── STATS ──────────── */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 96, label: 'Tasa de éxito QA visual (%)', icon: CheckCircle2 },
              { val: 340, label: 'Endpoints API', icon: Layers, suffix: '+' },
              { val: 200, label: 'Tests automatizados (Unit + Feature)', icon: ShieldCheck, suffix: '+' },
              { val: 17000, label: 'Veces más rápido (cache Redis)', icon: Zap, suffix: '×' },
            ].map((s) => (
              <div key={s.label}>
                <s.icon className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <div className="text-4xl font-bold">
                  <Counter end={s.val} suffix={s.suffix ?? ''} />
                </div>
                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── MÓDULOS ──────────── */}
      <section id="modulos" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-3">
              <Layers className="w-3 h-3" /> 8 módulos integrados
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Todo lo que tu institución necesita</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un solo sistema, un solo login, un solo punto de verdad. Sin parches ni hojas de Excel paralelas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODULOS.map((m) => (
              <div
                key={m.titulo}
                className="group relative p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-xl transition"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} grid place-items-center text-white mb-4 group-hover:scale-110 transition`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{m.titulo}</h3>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">{m.desc}</p>
                <ul className="space-y-1">
                  {m.features.map((f) => (
                    <li key={f} className="text-xs text-slate-500 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── DIFERENCIADORES ──────────── */}
      <section id="diferenciadores" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Por qué AmePhia EDU es diferente</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No es otro SIS hecho hace 5 años. Es el primer SIS ecuatoriano <strong>nacido en 2025</strong> con cumplimiento MinEduc + LOEI + LOPDP nativo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFERENCIADORES.map((d) => (
              <div key={d.titulo} className="p-6 bg-white rounded-2xl border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 grid place-items-center mb-4">
                  <d.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-lg mb-2">{d.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── COMPLIANCE ──────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium mb-3">
              <ShieldCheck className="w-3 h-3" /> Compliance por diseño
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seguridad de nivel empresarial</h2>
            <p className="text-lg text-slate-600 mb-6">
              No es un agregado. Cada feature pasa por un audit log inmutable, permission granular por endpoint, y 2FA obligatorio para administradores.
            </p>

            <div className="space-y-3">
              {[
                { icon: Eye, txt: 'Audit log LOPDP: quién, cuándo, qué, IP, user-agent en 10 modelos críticos' },
                { icon: Lock, txt: '2FA obligatorio para rol admin (TOTP estándar)' },
                { icon: Database, txt: 'Backup diario + verify semanal con restore en BD temporal' },
                { icon: ShieldCheck, txt: '78 rutas API con permisos granulares (Spatie)' },
                { icon: QrCode, txt: 'Verificación pública con QR + hash SHA256 anti-tampering' },
                { icon: Mail, txt: 'Cifrado in-transit (TLS) y at-rest para campos sensibles' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-50 grid place-items-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-green-700" />
                  </div>
                  <p className="text-sm text-slate-700 pt-1.5">{c.txt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white">
              <div className="text-sm text-blue-300 mb-4">— Salida real del audit log</div>
              <div className="font-mono text-xs space-y-2 bg-slate-950/50 rounded-lg p-4">
                <div><span className="text-green-400">[crear]</span> Nota#1764628 user=Administrador ip=127.0.0.1</div>
                <div><span className="text-blue-400">[actualizar]</span> Pago#5832 user=Tesorera ip=192.168.1.10</div>
                <div><span className="text-red-400">[eliminar]</span> Matricula#421 user=Admin ip=192.168.1.5</div>
                <div><span className="text-green-400">[crear]</span> Refuerzo#89 user=Profesor</div>
                <div><span className="text-blue-400">[actualizar]</span> Estudiante#101 diff=&#123;direccion: "..." → "..."&#125;</div>
              </div>
              <div className="mt-4 text-xs text-blue-200">
                + sanitización automática de passwords/tokens + retención configurable (default 5 años LOPDP)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── STACK ──────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Stack moderno · production-ready</h2>
            <p className="text-slate-600">Las mismas herramientas que usan Spotify, Shopify y Netflix.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {STACK.map((s) => (
              <div key={s.nombre} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm">
                <span className="text-slate-400 text-xs mr-1.5">{s.categoria}</span>
                <span className="font-semibold">{s.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── PLANES ──────────── */}
      <section id="planes" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Planes que escalan contigo</h2>
            <p className="text-lg text-slate-600">Sin sorpresas. Sin límite de docentes ni de padres. Sólo pagas por estudiantes activos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANES.map((p) => (
              <div
                key={p.nombre}
                className={`relative p-8 bg-white rounded-2xl border-2 ${p.color} ${p.destacado ? 'md:-translate-y-3 shadow-xl' : ''} transition`}
              >
                {p.extras.length > 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                    {p.extras[0]}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{p.nombre}</h3>
                <p className="text-xs text-slate-500 mb-4">{p.target}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{p.precio}</span>
                  <span className="text-slate-500 text-sm">{p.sub}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waURL(p.cta)}
                  target="_blank"
                  rel="noreferrer"
                  className={`block text-center w-full py-3 rounded-xl font-semibold transition ${
                    p.destacado
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {p.cta === 'enterprise' ? 'Hablar con ventas' : 'Empezar ahora'}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Todos los planes incluyen: setup gratis · capacitación · 99.9% uptime · backup diario · soporte en español
          </p>
        </div>
      </section>

      {/* ──────────── TESTIMONIO ──────────── */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
            "Antes generar una sábana de notas tomaba 45 minutos. Ahora son 2 segundos. Y ya no peleamos con archivos Excel paralelos — todo el equipo trabaja en el mismo sistema, en vivo."
          </p>
          <div className="text-sm text-blue-200">
            Hno. Director · Unidad Educativa Fiscomisional Santa María Mazzarello
          </div>
        </div>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <span className="font-semibold pr-4">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CTA FINAL ──────────── */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">Listo para modernizar tu institución</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Agenda una demo de 30 minutos. Te mostramos el sistema con datos reales de tu institución.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={waURL('demo')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Agendar demo gratis <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:hola@amephia.com"
              className="inline-flex items-center gap-2 px-7 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition"
            >
              hola@amephia.com
            </a>
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="py-10 bg-slate-950 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2026 AmePhia Systems · AmePhia EDU</div>
          <div className="flex gap-6">
            <a href="https://amephia.com" className="hover:text-white">Más productos</a>
            <a href={waURL('demo')} className="hover:text-white">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
