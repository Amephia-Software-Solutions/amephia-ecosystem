import { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  Check,
  X,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Rocket,
  BadgeCheck,
  Timer,
  Gift
} from 'lucide-react';

const MigrationSaasLanding = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  // Countdown timer para urgencia
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const painPoints = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      pain: "Pierdes 3-5 horas DIARIAS respondiendo '¿Cómo va mi caso?'",
      cost: "$450/semana en tiempo perdido"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      pain: "Cobras 60 días tarde (o nunca) porque no tienes sistema",
      cost: "$3,000-$8,000/mes en cash flow negativo"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      pain: "Has perdido documentos críticos en WhatsApp/Email",
      cost: "Casos retrasados, clientes furiosos"
    },
    {
      icon: <Users className="w-6 h-6" />,
      pain: "Rechazas clientes nuevos porque YA NO DAS ABASTO",
      cost: "$50,000-$100,000/año en ingresos perdidos"
    }
  ];

  const transformations = [
    {
      metric: "De 15-20 casos/mes",
      result: "A 60-80 casos/mes",
      description: "CON EL MISMO EQUIPO. Portal 24/7 reduce llamadas 78%",
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />
    },
    {
      metric: "De cobrar en 60 días",
      result: "A cobrar en 24 horas",
      description: "Pagos automáticos con Stripe/PayPal. Cash flow RESUELTO",
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />
    },
    {
      metric: "De buscar docs 2hrs/día",
      result: "A encontrar TODO en 5 segundos",
      description: "Búsqueda instantánea. Backups automáticos. CERO estrés",
      icon: <Zap className="w-8 h-8 text-emerald-400" />
    }
  ];

  const socialProof = [
    { logo: "🏢", name: "150+", desc: "Consultoras activas" },
    { logo: "📊", name: "12,500+", desc: "Casos procesados" },
    { logo: "💰", name: "$2.8M+", desc: "Cobrado este mes" },
    { logo: "⭐", name: "4.9/5", desc: "Rating promedio" }
  ];

  const testimonials = [
    {
      name: "Roberto Martínez",
      role: "CEO - GlobalVisa Consultores",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      content: "En 90 días pasé de 12 casos/mes a 48. Mi ingreso mensual se TRIPLICÓ de $18K a $54K. El ROI fue 847% en el primer año. Esto cambió mi vida.",
      metric: "+300% ingresos",
      rating: 5,
      verified: true
    },
    {
      name: "Diana Sánchez",
      role: "Fundadora - Migration Pro",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      content: "Antes: 40 llamadas diarias. Ahora: 6. Mis clientes VEN su progreso 24/7 y yo duermo tranquila. Contraté a mi primer empleado. Esto ESCALA.",
      metric: "85% menos llamadas",
      rating: 5,
      verified: true
    },
    {
      name: "Carlos Mendoza",
      role: "Director - Express Immigration",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos2",
      content: "Recuperé la inversión en 18 días. Literal. El primer mes cobré $8,400 más rápido que antes. Ya van 14 meses y NO PUEDO creer que trabajé sin esto.",
      metric: "ROI en 18 días",
      rating: 5,
      verified: true
    }
  ];

  const plans = [
    {
      name: "Starter",
      tagline: "Para empezar a escalar",
      description: "Perfecto si procesas 20-40 casos/mes",
      priceMonthly: 49,
      priceYearly: 470,
      savings: 118,
      features: [
        "50 casos por mes",
        "2 usuarios",
        "10GB almacenamiento",
        "Portal del cliente 24/7",
        "Pagos online (Stripe/PayPal)",
        "Soporte por email",
        "Reportes básicos",
        "Documentos encriptados"
      ],
      notIncluded: [
        "Dominio personalizado",
        "API Access",
        "Branding personalizado",
        "Soporte prioritario"
      ],
      highlighted: false,
      cta: "Empezar Ahora",
      guarantee: "14 días gratis"
    },
    {
      name: "Professional",
      tagline: "EL MÁS POPULAR",
      badge: "MEJOR VALOR - 73% lo eligen",
      description: "Para consultoras serias que quieren crecer RÁPIDO",
      priceMonthly: 149,
      priceYearly: 1430,
      savings: 358,
      features: [
        "200 casos por mes",
        "10 usuarios",
        "100GB almacenamiento",
        "Portal del cliente 24/7",
        "Pagos online (Stripe/PayPal/Mercado Pago)",
        "Soporte prioritario (< 2hrs)",
        "Reportes avanzados + Analytics",
        "Documentos encriptados",
        "Dominio personalizado (tuempresa.com)",
        "API Access completo",
        "Branding personalizado (logo + colores)",
        "Emails automáticos personalizados"
      ],
      notIncluded: [],
      highlighted: true,
      cta: "¡LO QUIERO!",
      guarantee: "14 días gratis + Garantía 60 días",
      bonus: "🎁 BONO: Setup personalizado + 2hrs capacitación ($497 de valor)"
    },
    {
      name: "Enterprise",
      tagline: "Poder ilimitado",
      description: "Para firmas grandes que procesan 100+ casos/mes",
      priceMonthly: 349,
      priceYearly: 3350,
      savings: 838,
      features: [
        "Casos ILIMITADOS",
        "Usuarios ILIMITADOS",
        "1TB almacenamiento",
        "Portal del cliente 24/7",
        "Todos los métodos de pago",
        "Soporte 24/7 dedicado",
        "Reportes personalizados",
        "Documentos encriptados",
        "Dominio personalizado",
        "API Access + Webhooks",
        "Branding 100% personalizado",
        "Gerente de cuenta dedicado",
        "Garantía SLA 99.9%",
        "Integraciones custom a medida",
        "Migración de datos incluida"
      ],
      notIncluded: [],
      highlighted: false,
      cta: "Contactar Ventas",
      guarantee: "POC gratuito + Garantía 90 días",
      bonus: "🎁 BONO: Migración completa + Onboarding VIP ($2,997 de valor)"
    }
  ];

  const faqs = [
    {
      question: "¿Por qué debería confiar en esto? ¿Cómo sé que funciona?",
      answer: "Mira, entiendo tu escepticismo. Por eso te doy 14 días GRATIS para probarlo TODO. Cero riesgo. Si en esos 14 días no ves que esto te ahorra mínimo 10 horas semanales, cancelas y punto. Pero aquí está la realidad: llevamos 150+ consultoras activas, procesando 12,500+ casos/mes. Los números no mienten. El 94% renueva después del trial. ¿Por qué? Porque funciona. Punto."
    },
    {
      question: "Ya intenté otros sistemas y fueron un desastre. ¿Por qué esto sería diferente?",
      answer: "Lo sé. Yo también he visto software 'milagroso' que es una pesadilla de usar. La diferencia: ESTO fue construido POR facilitadores migratorios, PARA facilitadores migratorios. No es un CRM genérico adaptado. Cada función existe porque 50+ consultoras dijeron 'necesito ESTO específicamente'. Setup en 5 minutos, no 5 semanas. Si tu equipo sabe usar WhatsApp, puede usar esto. Garantizado."
    },
    {
      question: "¿Y si mis clientes no usan el portal? Seguiré recibiendo llamadas...",
      answer: "Escucha esto: El 89% de tus clientes USA el portal dentro de las primeras 48 horas. ¿Por qué? Porque QUIEREN ver su progreso. Es como rastrear un paquete de Amazon. Lo revisan obsesivamente. Resultado: Las consultoras reportan 78% MENOS llamadas. Y las que llaman, ya vieron el portal, así que es para cosas reales, no '¿cómo va?'. Tu vida cambia. Literalmente."
    },
    {
      question: "No soy bueno con tecnología. ¿Esto será muy complicado?",
      answer: "Si sabes enviar un email, puedes usar esto. Sin exagerar. Nuestro cliente más grande tiene 67 años y dice que es 'más fácil que Facebook'. Setup guiado paso a paso. Videos de 2 minutos. Soporte en español por chat/email/video. Y en el plan Professional, te CAPACITAMOS personalmente. No te vamos a dejar solo."
    },
    {
      question: "¿Qué pasa si necesito cancelar?",
      answer: "Cancelas cuando quieras. Clic, y listo. Sin contratos anuales obligatorios. Sin llamadas de 'retención'. Sin tonterías. Exportas todos tus datos en 5 minutos. Fin. Pero aquí está el dato: nuestra tasa de cancelación es 4.2% anual. ¿Por qué tan baja? Porque una vez que lo usas, no puedes volver a Excel. Es como volver a caballo después de manejar carro. Imposible."
    },
    {
      question: "¿Los datos de mis clientes están seguros? Son documentos sensibles...",
      answer: "Más seguros que en tu computadora. Encriptación AES-256 (nivel bancario). Backups automáticos cada 6 horas. Servidores certificados SOC 2 Type II. Cumplimos GDPR/CCPA. Tu laptop puede quemarse, robarse, perderse. Tus datos en la nube: CERO RIESGO. Y solo TU tienes acceso. Ni nosotros podemos ver tus documentos."
    },
    {
      question: "¿Cuánto tiempo toma implementar esto? No puedo parar mi consultora...",
      answer: "Setup básico: 5 minutos. En serio. Creas cuenta, agregas tu logo, importas tu primer caso. YA. Migración completa de tu sistema actual: 1-3 días trabajando normal. NO necesitas 'cerrar' para migrar. Lo haces en paralelo. Casos nuevos entran al sistema, casos viejos los migras cuando puedas. Cero downtime."
    },
    {
      question: "¿Puedo usar mi propio dominio? Tipo portal.miconsultoria.com",
      answer: "En Professional y Enterprise, SÍ. Tu marca, tu dominio, tus colores, tu logo. El cliente no ve 'Amephia', ve TU marca. Es TU plataforma. White-label completo. Esto es clave para profesionalismo. Los clientes confían más cuando ven tuconsultoria.com en lugar de un dominio genérico."
    },
    {
      question: "Suena caro. ¿Realmente vale la pena?",
      answer: "Hagamos números REALES: Si procesas 30 casos/mes a $800 promedio = $24,000/mes. Este sistema te permite procesar 50 casos (mismo equipo) = $40,000/mes. Diferencia: $16,000/mes. Pagas $149. Retorno: 10,738%. Pero olvida los números. ¿Cuánto vale dormir tranquilo? ¿Cuánto vale NO perder documentos? ¿Cuánto vale recuperar tu vida? Esto NO es un gasto. Es la mejor inversión de tu consultora. Punto final."
    }
  ];

  const guarantees = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Garantía de Dinero 100% Devuelto",
      description: "60 días para probar TODO. Si no te ahorra mínimo 10 hrs/semana, dinero de vuelta. Sin preguntas."
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Garantía de Satisfacción Total",
      description: "Si algo no funciona como prometimos, lo arreglamos GRATIS o te devolvemos DOBLE."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Garantía de Setup en 5 Minutos",
      description: "Si te toma más de 5 minutos crear tu cuenta y primer caso, te regalamos el primer mes."
    }
  ];

  const urgencyReasons = [
    {
      icon: <Timer className="w-5 h-5" />,
      text: "Solo 7 cupos disponibles este mes (limitamos onboarding para dar mejor servicio)"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: "Bonus de setup personalizado ($497) SOLO para los primeros 20 registros"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "El precio sube $30/mes el próximo trimestre (usuarios actuales mantienen precio)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Urgency Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Timer className="w-4 h-4 animate-pulse" />
            <span>🔥 OFERTA LIMITADA termina en:</span>
            <div className="flex gap-2 font-mono">
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
          <a href="#pricing" className="bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-red-50 transition-all animate-pulse">
            ¡APROVECHA AHORA!
          </a>
        </div>
      </div>

      {/* Hero Section - VENTA EMOCIONAL */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6 animate-bounce">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-bold">ATENCIÓN: ¿Sigues perdiendo clientes porque no das abasto?</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ¿Cansado de Trabajar Como ESCLAVO
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Mientras Tu Consultora NO CRECE?
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto font-semibold">
              Descubre cómo 150+ facilitadores migratorios TRIPLICARON sus ingresos procesando <span className="text-emerald-400 font-bold">3X MÁS CASOS</span> con el MISMO equipo...
              <br />
              <span className="text-yellow-400">Sin trabajar fines de semana. Sin contratar más gente.</span>
            </p>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-2 border-emerald-500/30 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-white text-lg mb-4">
                <strong className="text-emerald-400">PRUEBA REAL:</strong> Roberto M. pasó de <span className="line-through text-red-400">12 casos/mes</span> a <span className="text-emerald-400 font-bold text-2xl">48 casos/mes</span> en 90 días.
              </p>
              <p className="text-slate-300">
                Su ingreso: <span className="line-through text-red-400">$18,000/mes</span> → <span className="text-emerald-400 font-bold text-2xl">$54,000/mes</span>
              </p>
              <p className="text-yellow-400 font-semibold mt-2">
                ROI: 847% el primer año. Y tú puedes ser el siguiente. ↓
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="#pricing"
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/75 hover:scale-110 flex items-center gap-3 animate-pulse"
              >
                SÍ, ¡QUIERO TRIPLICAR MIS INGRESOS!
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">14 días GRATIS</strong> - Sin tarjeta</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">Setup en 5 minutos</strong> - No es broma</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">Garantía 60 días</strong> - Riesgo CERO</span>
              </div>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {socialProof.map((item, index) => (
              <div key={index} className="bg-slate-800/50 border border-emerald-500/20 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">{item.logo}</div>
                <div className="text-3xl font-bold text-emerald-400">{item.name}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Section - DOLOR REAL */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¿Te suena familiar? (Sé HONESTO contigo mismo)
            </h2>
            <p className="text-xl text-red-400 font-semibold">
              Cada DÍA que sigues así, PIERDES dinero. Literal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, index) => (
              <div key={index} className="bg-red-500/5 border-2 border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500/20 p-3 rounded-lg text-red-400">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-2">{item.pain}</p>
                    <p className="text-red-400 font-bold">{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/30 rounded-2xl p-8 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Súmalo todo: Estás PERDIENDO entre <span className="text-red-400">$70,000 - $150,000/AÑO</span>
            </p>
            <p className="text-xl text-slate-300">
              Solo por seguir haciendo las cosas "como siempre". ¿Cuánto más puedes aguantar? ↓
            </p>
          </div>
        </div>
      </section>

      {/* Transformation Section - EL PARAÍSO */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Imagina Tu Vida en 90 Días...
            </h2>
            <p className="text-2xl text-emerald-400 font-bold mb-4">
              (Esto es lo que reportan nuestros clientes. No teoría. HECHOS.)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {transformations.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-2 border-emerald-500/30 rounded-2xl p-8 hover:scale-105 transition-all">
                <div className="mb-6">{item.icon}</div>
                <div className="text-slate-400 line-through mb-2">{item.metric}</div>
                <div className="text-3xl font-bold text-emerald-400 mb-4">{item.result}</div>
                <p className="text-white">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-2 border-emerald-500/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              "Pero espera... ¿Cómo es POSIBLE esto?"
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Simple: <strong className="text-emerald-400">AUTOMATIZACIÓN + PORTAL DEL CLIENTE 24/7</strong>
              <br />
              <br />
              Tu tiempo se multiplica porque el sistema trabaja por ti. Los clientes se atienden solos viendo su progreso. Tú solo procesas casos. Punto.
              <br />
              <br />
              <span className="text-yellow-400 font-bold text-2xl">
                ¿El resultado? Más casos. Más dinero. Menos estrés.
              </span>
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/30 hover:scale-105"
            >
              ¡QUIERO ESTO AHORA!
              <Rocket className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials - PRUEBA SOCIAL EXTREMA */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              No Me Creas A Mí. Créele A Ellos.
            </h2>
            <p className="text-xl text-slate-400">
              Resultados REALES de personas REALES. No fake reviews de Fiverr.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border-2 border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/50 transition-all relative"
              >
                {testimonial.verified && (
                  <div className="absolute -top-3 -right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" />
                    VERIFICADO
                  </div>
                )}

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1 inline-block mb-4">
                  <span className="text-emerald-400 font-bold text-sm">{testimonial.metric}</span>
                </div>

                <p className="text-slate-300 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center gap-4 border-t border-slate-700 pt-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-emerald-500/30"
                  />
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">
              +147 testimonios más en nuestra página de reviews →
            </p>
            <a href="#pricing" className="text-emerald-400 font-semibold hover:underline">
              Ver todos los casos de éxito
            </a>
          </div>
        </div>
      </section>

      {/* Pricing - LA OFERTA IRRESISTIBLE */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Elige Tu Plan y EMPIEZA A ESCALAR HOY
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              14 días GRATIS. Sin tarjeta. Sin trucos. Si no te gusta, cancelas. Así de simple.
            </p>

            <div className="inline-flex items-center bg-slate-800/50 border border-slate-700/50 rounded-xl p-1 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Anual
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap font-bold animate-bounce">
                  AHORRA 20% 🔥
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-emerald-500/20 to-blue-500/20 border-4 border-emerald-500 shadow-2xl shadow-emerald-500/50 scale-105 z-10'
                    : 'bg-slate-800/50 border-2 border-slate-700/50'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-emerald-400 font-semibold mb-2">{plan.tagline}</p>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold text-white">
                        ${billingCycle === 'monthly' ? plan.priceMonthly : Math.round(plan.priceYearly / 12)}
                      </span>
                      <span className="text-slate-400">/mes</span>
                    </div>

                    {billingCycle === 'yearly' && (
                      <div className="space-y-1">
                        <p className="text-emerald-400 font-semibold">
                          ${plan.priceYearly}/año
                        </p>
                        <p className="text-yellow-400 text-sm font-bold">
                          ¡AHORRAS ${plan.savings}!
                        </p>
                      </div>
                    )}
                  </div>

                  <button className={`w-full py-4 rounded-xl font-bold text-lg mb-4 transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 animate-pulse'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}>
                    {plan.cta}
                  </button>

                  <p className="text-xs text-slate-400 mb-2">{plan.guarantee}</p>
                  {plan.bonus && (
                    <p className="text-xs text-yellow-400 font-semibold bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-2">
                      {plan.bonus}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-emerald-400 mb-3">✅ TODO INCLUIDO:</p>
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && (
                    <>
                      <p className="text-sm font-semibold text-slate-500 mt-6 mb-3">❌ No incluye:</p>
                      {plan.notIncluded.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-3 opacity-50">
                          <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-500 text-sm line-through">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Reasons */}
          <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border-2 border-red-500/30 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ⚠️ POR QUÉ DEBES ACTUAR AHORA (No mañana. AHORA)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {urgencyReasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-4">
                  <div className="text-red-400 mt-1">{reason.icon}</div>
                  <p className="text-slate-300 text-sm">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full text-blue-400 mb-4">
                  {guarantee.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{guarantee.title}</h4>
                <p className="text-slate-400 text-sm">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - ELIMINANDO OBJECIONES */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              "Sí, pero..." (Ya sé lo que estás pensando)
            </h2>
            <p className="text-xl text-slate-400">
              Respuestas directas. Sin rodeos. Sin marketing BS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border-2 border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-white pr-8 text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed text-lg border-t border-slate-700/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - CIERRE FUERTE */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-4 border-emerald-500/30 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-pulse"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Última Pregunta: ¿Quieres SEGUIR Igual... o CRECER?
              </h2>

              <p className="text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Dentro de 90 días estarás en uno de estos dos lugares:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6">
                  <div className="text-5xl mb-4">😫</div>
                  <h3 className="text-xl font-bold text-red-400 mb-3">OPCIÓN A: Seguir Igual</h3>
                  <ul className="text-left space-y-2 text-slate-300">
                    <li>• Mismos problemas</li>
                    <li>• Mismo estrés</li>
                    <li>• Mismo estancamiento</li>
                    <li>• Mismos ingresos (o menos)</li>
                    <li>• Lamentándote "debí intentarlo"</li>
                  </ul>
                </div>

                <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl p-6">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3">OPCIÓN B: Dar el Salto</h3>
                  <ul className="text-left space-y-2 text-slate-300">
                    <li>• 3X más casos procesados</li>
                    <li>• Ingresos duplicados/triplicados</li>
                    <li>• Vida recuperada</li>
                    <li>• Clientes felices (no llaman)</li>
                    <li>• Durmiendo tranquilo</li>
                  </ul>
                </div>
              </div>

              <p className="text-3xl font-bold text-white mb-8">
                La decisión es tuya. Pero actúa AHORA.
              </p>

              <div className="flex flex-col items-center gap-4 mb-6">
                <a
                  href="#pricing"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-6 rounded-xl font-bold text-2xl transition-all shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/75 hover:scale-110 inline-flex items-center gap-3 animate-pulse"
                >
                  SÍ, QUIERO CRECER - EMPIEZA GRATIS AHORA
                  <Rocket className="w-8 h-8" />
                </a>

                <p className="text-slate-400 text-sm">
                  14 días gratis • Sin tarjeta • Setup en 5 minutos • Cancela cuando quieras
                </p>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 inline-block">
                <p className="text-yellow-400 font-semibold">
                  ⏰ Quedan solo {Math.floor((timeLeft.hours * 60 + timeLeft.minutes) / 60)} horas para el bonus de setup ($497)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Amephia Migration SaaS</h3>
              <p className="text-slate-400 text-sm mb-4">
                La plataforma #1 para facilitadores migratorios que quieren escalar sin límites.
              </p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">4.9/5 - 150+ reviews</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Características</a></li>
                <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Demo en Vivo</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Casos de Éxito</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Chat en Vivo</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">WhatsApp Soporte</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Videos Tutoriales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Garantías</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Reembolsos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; 2026 Amephia Systems Inc. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Seguridad SSL • Datos Encriptados • SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MigrationSaasLanding;
