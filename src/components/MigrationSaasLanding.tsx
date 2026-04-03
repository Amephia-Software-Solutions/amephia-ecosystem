import { useState } from 'react';
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
} from 'lucide-react';

type LegalPage = 'terms' | 'privacy' | 'guarantees' | 'refunds' | null;

const LegalModal = ({ page, onClose }: { page: LegalPage; onClose: () => void }) => {
  if (!page) return null;

  const titles: Record<string, string> = {
    terms: 'Términos de Servicio',
    privacy: 'Política de Privacidad y Protección de Datos Personales',
    guarantees: 'Garantías del Servicio',
    refunds: 'Política de Reembolsos',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full mx-4 my-12 p-8 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">{titles[page]}</h2>
        <p className="text-slate-500 text-sm mb-8">Última actualización: 20 de febrero de 2026</p>

        <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed space-y-6 text-sm">
          {page === 'terms' && <TermsContent />}
          {page === 'privacy' && <PrivacyContent />}
          {page === 'guarantees' && <GuaranteesContent />}
          {page === 'refunds' && <RefundsContent />}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700 text-center">
          <button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

const TermsContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Aceptación de los Términos</h3>
      <p>
        Al acceder, registrarse o utilizar de cualquier forma la plataforma Amephia Migration SaaS (en adelante, &quot;el Servicio&quot;),
        operada por Amephia Systems Inc. (en adelante, &quot;Amephia&quot;, &quot;nosotros&quot;, &quot;la Plataforma&quot;), usted (en adelante, &quot;el Usuario&quot;)
        declara que ha leído, comprendido y acepta quedar vinculado íntegra e incondicionalmente por estos Términos de
        Servicio, la Política de Privacidad y cualquier política complementaria publicada en la Plataforma.
      </p>
      <p className="mt-2">
        Si usted accede al Servicio en nombre de una organización, empresa o consultora, declara que tiene la autoridad legal
        para vincular a dicha entidad a estos Términos. El uso continuado del Servicio constituye aceptación renovada de los
        Términos vigentes en cada momento.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Naturaleza del Servicio</h3>
      <p>
        Amephia Migration SaaS es una plataforma tecnológica de gestión (Software as a Service) que proporciona herramientas
        para la administración de casos migratorios. El Servicio incluye:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Gestión de casos y trámites migratorios</li>
        <li>Portal de autoservicio para clientes 24/7</li>
        <li>Procesamiento de pagos en línea</li>
        <li>Almacenamiento seguro de documentos</li>
        <li>Comunicación facilitador-cliente</li>
        <li>Reportes y analítica del negocio</li>
      </ul>
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-3">
        <p className="text-blue-400 font-semibold text-sm">
          IMPORTANTE — Amephia es exclusivamente un proveedor de tecnología. La Plataforma NO constituye una firma de abogados,
          una consultora migratoria, ni un despacho legal. Amephia NO presta servicios migratorios, asesoría legal, ni
          representación ante autoridades migratorias de ningún país. Cualquier decisión migratoria es responsabilidad
          exclusiva del facilitador y/o del profesional legal correspondiente.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Registro, Cuenta y Responsabilidad del Usuario</h3>
      <p>
        Para utilizar el Servicio, usted debe: (a) tener al menos 18 años de edad; (b) contar con capacidad legal para
        contratar; (c) proporcionar información veraz, completa y actualizada; (d) mantener la confidencialidad absoluta
        de sus credenciales; (e) notificarnos inmediatamente ante cualquier uso no autorizado de su cuenta.
      </p>
      <p className="mt-2">
        <strong className="text-white">Usted es el único y exclusivo responsable</strong> de: todas las actividades bajo su cuenta;
        la veracidad y legalidad de los datos que ingrese; la obtención del consentimiento de sus clientes para cargar sus datos
        personales y documentos; el cumplimiento de toda normativa migratoria, legal y tributaria aplicable a su actividad.
      </p>
      <p className="mt-2">
        Amephia no verifica, valida ni garantiza la veracidad de la información ingresada por los usuarios. La Plataforma
        actúa como un medio tecnológico y no como parte en la relación facilitador-cliente.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Planes, Facturación y Pagos</h3>
      <p>
        El Servicio se ofrece bajo planes de suscripción mensual y anual. Los precios están en dólares estadounidenses (USD)
        y no incluyen impuestos, tasas o contribuciones según la jurisdicción del Usuario.
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Período de prueba:</strong> 14 días gratuitos sin tarjeta de crédito. Al finalizar, el acceso se suspende hasta contratar un plan.</li>
        <li><strong className="text-white">Renovación automática:</strong> Las suscripciones se renuevan automáticamente. Es responsabilidad del Usuario cancelar antes de la renovación.</li>
        <li><strong className="text-white">Cambios de precio:</strong> Amephia se reserva el derecho de modificar precios con 30 días de notificación previa. Suscriptores activos mantienen su tarifa durante el período contratado.</li>
        <li><strong className="text-white">Impago:</strong> Amephia podrá suspender el acceso tras 7 días de notificación. Los datos se conservarán 60 días adicionales antes de su eliminación.</li>
        <li><strong className="text-white">Cancelación:</strong> El Usuario puede cancelar en cualquier momento. El acceso continuará hasta el final del período facturado.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Uso Aceptable y Conducta del Usuario</h3>
      <p>El Usuario se compromete a utilizar el Servicio de manera lícita, ética y conforme a estos Términos. Queda expresamente prohibido:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Utilizar la Plataforma para actividades ilegales, fraudulentas o engañosas</li>
        <li>Facilitar, promover o participar en inmigración ilegal, tráfico de personas o cualquier delito</li>
        <li>Almacenar contenido malicioso, ilegal, difamatorio o que viole derechos de terceros</li>
        <li>Intentar acceder a datos de otros usuarios, vulnerar la seguridad o interferir con el sistema</li>
        <li>Revender, sublicenciar, redistribuir o compartir el acceso sin autorización escrita de Amephia</li>
        <li>Realizar ingeniería inversa, descompilar o intentar obtener el código fuente de la Plataforma</li>
        <li>Utilizar bots, scrapers o mecanismos automatizados no autorizados</li>
        <li>Sobrecargar intencionalmente la infraestructura o realizar pruebas de penetración sin autorización</li>
      </ul>
      <p className="mt-2">
        La violación de cualquiera de estas disposiciones faculta a Amephia a suspender o terminar la cuenta
        de forma inmediata, sin previo aviso y sin derecho a reembolso, sin perjuicio de las acciones legales que correspondan.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Propiedad Intelectual</h3>
      <p>
        Todo el software, código fuente, algoritmos, diseño, interfaces, marcas registradas, logotipos, nombres comerciales,
        documentación y materiales del Servicio son propiedad exclusiva de Amephia Systems Inc. y están protegidos por leyes
        nacionales e internacionales de propiedad intelectual.
      </p>
      <p className="mt-2">
        Se concede al Usuario una licencia limitada, no exclusiva, intransferible y revocable para utilizar el Servicio
        exclusivamente para su propósito previsto durante la vigencia de su suscripción. Esta licencia no transfiere ningún
        derecho de propiedad sobre la Plataforma.
      </p>
      <p className="mt-2">
        El Usuario conserva la propiedad de sus datos. Sin embargo, otorga a Amephia una licencia limitada para procesar,
        almacenar y transmitir dichos datos exclusivamente con el fin de proveer el Servicio.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Contenido del Usuario y Responsabilidad sobre Datos</h3>
      <p>
        El Usuario es el único responsable de todo el contenido, datos, documentos e información que cargue, almacene o
        transmita a través de la Plataforma (&quot;Contenido del Usuario&quot;).
      </p>
      <p className="mt-2">
        El Usuario declara y garantiza que: (a) tiene derecho legal a cargar dicho contenido; (b) ha obtenido todos los
        consentimientos necesarios conforme a la LOPDP del Ecuador; (c) el contenido no infringe derechos de terceros ni
        leyes aplicables; (d) asume total responsabilidad por la exactitud y veracidad de la información.
      </p>
      <p className="mt-2">
        <strong className="text-white">Amephia no monitorea, revisa, edita ni controla el Contenido del Usuario</strong> y,
        por lo tanto, no asume responsabilidad alguna por su veracidad, legalidad, integridad o idoneidad. El Usuario
        indemnizará y mantendrá indemne a Amephia frente a cualquier reclamo derivado del Contenido del Usuario.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Disponibilidad del Servicio</h3>
      <p>
        Amephia realizará esfuerzos comercialmente razonables por mantener el Servicio disponible. No obstante, <strong className="text-white">el
          Servicio se proporciona &quot;TAL CUAL&quot; (AS IS) y &quot;SEGÚN DISPONIBILIDAD&quot; (AS AVAILABLE)</strong>. Amephia no garantiza que
        el Servicio será ininterrumpido, libre de errores, seguro o libre de virus en todo momento.
      </p>
      <p className="mt-2">
        El Servicio puede experimentar interrupciones por: mantenimiento programado; actualizaciones de seguridad críticas;
        fallas de proveedores de infraestructura (AWS, GCP, etc.); ataques cibernéticos o causas de fuerza mayor.
        Amephia no será responsable por daños derivados de dichas interrupciones.
      </p>
      <p className="mt-2">
        El compromiso de SLA (99.9% uptime) aplica exclusivamente para Usuarios del plan Enterprise con contrato SLA firmado.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">9. Exclusión de Garantías</h3>
      <p>
        EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE, AMEPHIA RENUNCIA EXPRESAMENTE A TODA GARANTÍA, EXPRESA O
        IMPLÍCITA, INCLUYENDO:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Garantías de comerciabilidad o idoneidad para un fin particular</li>
        <li>Garantías de que el Servicio cumplirá con los requisitos específicos del Usuario</li>
        <li>Garantías de que los resultados obtenidos serán exactos, completos o confiables</li>
        <li>Garantías de que el Servicio funcionará sin interrupciones o errores</li>
        <li>Garantías sobre la aprobación o resultado de cualquier trámite migratorio gestionado a través de la Plataforma</li>
      </ul>
      <p className="mt-2">
        La Plataforma es una herramienta de gestión administrativa. El éxito o fracaso de cualquier trámite migratorio
        depende exclusivamente del facilitador, del profesional legal a cargo y de las autoridades migratorias competentes.
        Amephia no tiene control ni responsabilidad alguna sobre el resultado de dichos trámites.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">10. Limitación de Responsabilidad</h3>
      <p>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE:</p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong className="text-white">Amephia no será responsable</strong> por daños indirectos, incidentales, especiales, consecuentes, punitivos o ejemplares, incluyendo: pérdida de beneficios, ingresos, datos, clientes, oportunidades de negocio o goodwill.</li>
        <li><strong className="text-white">Amephia no será responsable</strong> por acciones, omisiones, errores o negligencia del Usuario en el uso de la Plataforma, ni por decisiones tomadas basándose en información procesada a través del Servicio.</li>
        <li><strong className="text-white">Amephia no será responsable</strong> por la pérdida, denegación, retraso o cualquier resultado adverso de cualquier trámite migratorio, independientemente de que se haya utilizado la Plataforma.</li>
        <li><strong className="text-white">Amephia no será responsable</strong> por disputas entre el facilitador y sus clientes, incluyendo reclamaciones por servicios profesionales, cobros, calidad o resultados de trámites.</li>
        <li><strong className="text-white">La responsabilidad total y acumulada</strong> de Amephia no excederá en ningún caso el monto pagado por el Usuario durante los seis (6) meses anteriores al evento que originó el reclamo.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">11. Indemnización</h3>
      <p>
        El Usuario acepta indemnizar, defender y mantener indemne a Amephia Systems Inc., sus directores, empleados,
        agentes, afiliados y proveedores frente a cualquier reclamo, demanda, daño, pérdida, costo y gasto (incluyendo
        honorarios de abogados) que surjan de:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>El uso del Servicio por parte del Usuario o cualquier persona que acceda a través de su cuenta</li>
        <li>La violación de estos Términos por parte del Usuario</li>
        <li>El Contenido del Usuario cargado a la Plataforma</li>
        <li>La violación de leyes, regulaciones o derechos de terceros</li>
        <li>Reclamaciones de clientes finales del facilitador por cualquier motivo</li>
        <li>Actividades profesionales del facilitador, incluyendo asesoría migratoria</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">12. Suspensión y Terminación</h3>
      <p>
        Amephia se reserva el derecho de suspender o terminar el acceso al Servicio, de forma inmediata y sin previo aviso, si:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>El Usuario viola estos Términos o cualquier política aplicable</li>
        <li>El Usuario utiliza el Servicio para actividades ilegales o fraudulentas</li>
        <li>Existe una orden judicial o requerimiento de autoridad competente</li>
        <li>El Usuario no paga las tarifas adeudadas tras el período de gracia</li>
        <li>El uso del Usuario pone en riesgo la seguridad o disponibilidad de la Plataforma</li>
        <li>Amephia determina, a su exclusivo criterio, que la cuenta es utilizada de manera abusiva</li>
      </ul>
      <p className="mt-2">
        En caso de terminación por violación de Términos, Amephia no estará obligada a reembolsar montos pagados. Cuando
        la terminación no se deba a actividades ilegales, se permitirá la exportación de datos durante 30 días.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">13. Fuerza Mayor</h3>
      <p>
        Amephia no será responsable por retrasos o incumplimientos derivados de causas fuera de su control razonable:
        desastres naturales, pandemias, conflictos armados, actos de terrorismo, acciones gubernamentales, fallas de internet
        o telecomunicaciones, ataques cibernéticos, fallas de proveedores cloud, cortes de energía, o cualquier evento de fuerza mayor.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">14. Resolución de Disputas y Ley Aplicable</h3>
      <p>Estos Términos se rigen por las leyes de la República del Ecuador. Cualquier disputa será resuelta mediante:</p>
      <ol className="list-decimal pl-6 space-y-2 mt-2">
        <li><strong className="text-white">Negociación directa:</strong> Las partes intentarán resolver la disputa de buena fe durante 30 días calendario.</li>
        <li><strong className="text-white">Mediación:</strong> Si no prospera, se someterá a mediación en un centro autorizado de Quito, Ecuador.</li>
        <li><strong className="text-white">Arbitraje:</strong> Si la mediación no resuelve la disputa en 60 días, se someterá a arbitraje vinculante conforme a la Ley de Arbitraje y Mediación del Ecuador, con sede en Quito.</li>
      </ol>
      <p className="mt-2">
        El Usuario renuncia a iniciar o participar en demandas colectivas o acciones de clase contra Amephia.
        Se respetarán los derechos irrenunciables del consumidor conforme a la Ley Orgánica de Defensa del Consumidor del Ecuador.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">15. Modificaciones de los Términos</h3>
      <p>
        Amephia se reserva el derecho de modificar estos Términos en cualquier momento con 30 días de notificación previa
        por email y/o aviso en la Plataforma. El uso continuado del Servicio después de la entrada en vigor constituye
        aceptación plena. Si no los acepta, deberá cancelar su suscripción antes de su entrada en vigor.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">16. Disposiciones Generales</h3>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong className="text-white">Acuerdo completo:</strong> Estos Términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre el Usuario y Amephia, reemplazando cualquier acuerdo anterior.</li>
        <li><strong className="text-white">Divisibilidad:</strong> Si alguna disposición se declara inválida, las demás permanecerán en pleno vigor.</li>
        <li><strong className="text-white">No renuncia:</strong> La falta de ejercicio de un derecho por parte de Amephia no constituye renuncia al mismo.</li>
        <li><strong className="text-white">Cesión:</strong> El Usuario no podrá ceder estos Términos sin consentimiento escrito de Amephia. Amephia podrá ceder libremente sus derechos a afiliadas o en caso de fusión/adquisición.</li>
        <li><strong className="text-white">Supervivencia:</strong> Las cláusulas de propiedad intelectual, limitación de responsabilidad, indemnización, exclusión de garantías y resolución de disputas sobrevivirán a la terminación por cualquier causa.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">17. Contacto</h3>
      <p>Para consultas legales sobre estos Términos de Servicio:</p>
      <ul className="list-none space-y-1 mt-2">
        <li><strong className="text-white">Email legal:</strong> legal@amephia.com</li>
        <li><strong className="text-white">WhatsApp:</strong> +1 (334) 732-4056</li>
        <li><strong className="text-white">Empresa:</strong> Amephia Systems Inc.</li>
        <li><strong className="text-white">Jurisdicción:</strong> Quito, Ecuador</li>
      </ul>
    </section>
  </>
);

const PrivacyContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Introducción</h3>
      <p>
        La presente Política de Privacidad describe cómo Amephia Systems Inc. recopila, utiliza, almacena
        y protege los datos personales de sus usuarios, en cumplimiento de:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP)</strong> — Registro Oficial Suplemento No. 459, de 26 de mayo de 2021</li>
        <li><strong className="text-white">Reglamento General de la LOPDP</strong> — Decreto Ejecutivo No. 904, de 7 de noviembre de 2023</li>
        <li><strong className="text-white">Reglamento General de Protección de Datos (GDPR)</strong> — Unión Europea</li>
        <li><strong className="text-white">California Consumer Privacy Act (CCPA)</strong></li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Responsable del Tratamiento</h3>
      <p>
        El responsable del tratamiento de datos personales es:
      </p>
      <ul className="list-none space-y-1 mt-2">
        <li><strong className="text-white">Razón social:</strong> Amephia Systems Inc.</li>
        <li><strong className="text-white">Delegado de Protección de Datos:</strong> dpo@amephia.com</li>
        <li><strong className="text-white">Dirección:</strong> Quito, Ecuador</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Datos Personales que Recopilamos</h3>
      <p>Recopilamos las siguientes categorías de datos personales:</p>
      <h4 className="text-white font-medium mt-3 mb-2">3.1 Datos de los Facilitadores (usuarios de la plataforma):</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Nombre completo y datos de contacto (email, teléfono)</li>
        <li>Información de la empresa/consultora</li>
        <li>Datos de facturación y pago</li>
        <li>Dirección IP y datos de acceso</li>
        <li>Preferencias de uso de la plataforma</li>
      </ul>
      <h4 className="text-white font-medium mt-3 mb-2">3.2 Datos de los Clientes Finales (ingresados por los facilitadores):</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Nombre completo, nacionalidad, fecha de nacimiento</li>
        <li>Número de pasaporte, visa y documentos de identidad</li>
        <li>Información migratoria y estado del trámite</li>
        <li>Documentos personales cargados (pasaportes, certificados, etc.)</li>
        <li>Datos de contacto</li>
      </ul>
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-3">
        <p className="text-yellow-400 font-semibold text-sm">
          IMPORTANTE — Conforme al Art. 25 de la LOPDP, los datos de pasaportes, visas y estatus migratorio
          se consideran datos sensibles y reciben protección reforzada.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Base Legal del Tratamiento (Art. 7 LOPDP)</h3>
      <p>El tratamiento de datos personales se fundamenta en:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Consentimiento expreso (Art. 7.1 LOPDP):</strong> Otorgado al registrarse y aceptar esta política</li>
        <li><strong className="text-white">Ejecución contractual (Art. 7.2 LOPDP):</strong> Necesario para prestar el servicio contratado</li>
        <li><strong className="text-white">Interés legítimo (Art. 7.5 LOPDP):</strong> Mejora del servicio y comunicaciones relevantes</li>
        <li><strong className="text-white">Obligación legal (Art. 7.3 LOPDP):</strong> Cumplimiento de normativa tributaria y regulatoria</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Finalidad del Tratamiento</h3>
      <p>Los datos personales se utilizan exclusivamente para:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Proveer y mantener el funcionamiento de la plataforma</li>
        <li>Gestionar las cuentas de usuario y la facturación</li>
        <li>Procesar y dar seguimiento a los casos migratorios</li>
        <li>Enviar notificaciones del servicio y actualizaciones de casos</li>
        <li>Mejorar la seguridad y experiencia de usuario</li>
        <li>Cumplir con obligaciones legales y regulatorias</li>
        <li>Generar estadísticas anonimizadas de uso</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Derechos del Titular (Art. 17-22 LOPDP)</h3>
      <p>
        Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, usted tiene derecho a:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li><strong className="text-white">Derecho de Acceso (Art. 17):</strong> Conocer qué datos personales suyos están siendo tratados, con qué finalidad y a quién se han comunicado.</li>
        <li><strong className="text-white">Derecho de Rectificación (Art. 18):</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
        <li><strong className="text-white">Derecho de Eliminación (Art. 19):</strong> Solicitar la supresión de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recopilados.</li>
        <li><strong className="text-white">Derecho de Oposición (Art. 20):</strong> Oponerse al tratamiento de sus datos por motivos relacionados con su situación particular.</li>
        <li><strong className="text-white">Derecho a la Portabilidad (Art. 21):</strong> Recibir sus datos en un formato estructurado, de uso común y lectura mecánica (CSV, JSON).</li>
        <li><strong className="text-white">Derecho a no ser objeto de decisiones automatizadas (Art. 22):</strong> No ser objeto de decisiones basadas únicamente en tratamiento automatizado que produzcan efectos jurídicos.</li>
      </ul>
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-3">
        <p className="text-emerald-400 font-semibold text-sm">
          Para ejercer cualquiera de estos derechos, envíe su solicitud a dpo@amephia.com.
          Responderemos en un plazo máximo de 15 días conforme al Art. 24 de la LOPDP.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Medidas de Seguridad (Art. 37 LOPDP)</h3>
      <p>
        Implementamos medidas técnicas y organizativas adecuadas para garantizar la seguridad de sus datos:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Encriptación AES-256:</strong> Todos los datos almacenados están cifrados con estándar bancario</li>
        <li><strong className="text-white">SSL/TLS:</strong> Todas las comunicaciones están cifradas en tránsito</li>
        <li><strong className="text-white">Backups automáticos:</strong> Copias de seguridad cada 6 horas en servidores georedundantes</li>
        <li><strong className="text-white">Control de acceso:</strong> Autenticación multifactor y permisos basados en roles</li>
        <li><strong className="text-white">Certificación SOC 2 Type II:</strong> Auditoría independiente de controles de seguridad</li>
        <li><strong className="text-white">Monitoreo 24/7:</strong> Detección de intrusiones y alertas en tiempo real</li>
        <li><strong className="text-white">Pruebas de penetración:</strong> Evaluaciones de seguridad periódicas por terceros independientes</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Transferencia Internacional de Datos (Art. 38 LOPDP)</h3>
      <p>
        Sus datos pueden ser almacenados en servidores ubicados fuera de Ecuador (Estados Unidos, Unión Europea).
        Estas transferencias se realizan garantizando un nivel adecuado de protección conforme a:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Cláusulas contractuales tipo aprobadas</li>
        <li>Países con nivel adecuado de protección reconocido</li>
        <li>Certificaciones de seguridad del proveedor de infraestructura (AWS/GCP)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">9. Conservación de Datos (Art. 10 LOPDP)</h3>
      <p>Los datos personales se conservarán:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Datos de cuenta:</strong> Mientras la suscripción esté activa + 6 meses posteriores a la cancelación</li>
        <li><strong className="text-white">Datos de casos:</strong> Mientras el caso esté en proceso + 5 años conforme a obligaciones legales</li>
        <li><strong className="text-white">Datos de facturación:</strong> 7 años conforme a normativa tributaria ecuatoriana</li>
        <li><strong className="text-white">Logs de acceso:</strong> 12 meses para fines de seguridad</li>
      </ul>
      <p className="mt-2">
        Transcurridos estos plazos, los datos serán eliminados de forma segura o anonimizados irreversiblemente.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">10. Cookies y Tecnologías de Seguimiento</h3>
      <p>Utilizamos cookies estrictamente necesarias para:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Mantener su sesión activa</li>
        <li>Recordar sus preferencias de idioma y configuración</li>
        <li>Garantizar la seguridad de la plataforma</li>
      </ul>
      <p className="mt-2">
        No utilizamos cookies de terceros con fines publicitarios. Las cookies analíticas se activan únicamente
        con su consentimiento previo.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">11. Notificación de Vulneraciones (Art. 44 LOPDP)</h3>
      <p>
        En caso de una vulneración de seguridad que afecte datos personales, Amephia:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Notificará a la Autoridad de Protección de Datos Personales del Ecuador en un plazo máximo de 72 horas</li>
        <li>Informará a los titulares afectados sin dilación indebida</li>
        <li>Documentará las medidas adoptadas para mitigar el incidente</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">12. Autoridad de Control</h3>
      <p>
        Si considera que el tratamiento de sus datos vulnera sus derechos, puede presentar una reclamación ante:
      </p>
      <ul className="list-none space-y-1 mt-2">
        <li><strong className="text-white">Autoridad de Protección de Datos Personales del Ecuador</strong></li>
        <li><strong className="text-white">Defensoría del Pueblo del Ecuador</strong> — para reclamos de habeas data (Art. 49 LOPDP)</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">13. Contacto del Delegado de Protección de Datos</h3>
      <ul className="list-none space-y-1">
        <li><strong className="text-white">Email:</strong> dpo@amephia.com</li>
        <li><strong className="text-white">Teléfono:</strong> +1 (334) 732-4056</li>
        <li><strong className="text-white">Plazo de respuesta:</strong> Máximo 15 días (Art. 24 LOPDP)</li>
      </ul>
    </section>
  </>
);

const GuaranteesContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Garantía de Satisfacción</h3>
      <p>
        En Amephia estamos comprometidos con su éxito. Por ello, ofrecemos las siguientes garantías según su plan:
      </p>
      <ul className="list-disc pl-6 space-y-2 mt-3">
        <li>
          <strong className="text-white">Plan Starter:</strong> 14 días de prueba gratuita sin compromiso.
          Si no está satisfecho, cancele sin costo alguno.
        </li>
        <li>
          <strong className="text-white">Plan Professional:</strong> 14 días de prueba gratuita + Garantía de
          devolución de 60 días. Si en los primeros 60 días no obtiene resultados medibles, le devolvemos
          el 100% de su inversión.
        </li>
        <li>
          <strong className="text-white">Plan Enterprise:</strong> Prueba de Concepto (POC) gratuita + Garantía
          de devolución de 90 días + Acuerdo de Nivel de Servicio (SLA) del 99.9% de uptime.
        </li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Garantía de Disponibilidad (SLA)</h3>
      <p>
        Garantizamos los siguientes niveles de disponibilidad del servicio:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Starter y Professional:</strong> 99.5% de uptime mensual</li>
        <li><strong className="text-white">Enterprise:</strong> 99.9% de uptime mensual con SLA contractual</li>
      </ul>
      <p className="mt-2">
        El cálculo de disponibilidad excluye ventanas de mantenimiento programado (notificadas con 48 horas
        de anticipación) y causas de fuerza mayor.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Garantía de Seguridad de Datos</h3>
      <p>Garantizamos la integridad y seguridad de sus datos mediante:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Encriptación AES-256 en reposo y SSL/TLS en tránsito</li>
        <li>Backups automáticos cada 6 horas con retención de 90 días</li>
        <li>Infraestructura certificada SOC 2 Type II</li>
        <li>Recuperación ante desastres con RPO &lt; 6 horas y RTO &lt; 4 horas</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Garantía de Soporte</h3>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Starter:</strong> Soporte por email con respuesta en máximo 24 horas hábiles</li>
        <li><strong className="text-white">Professional:</strong> Soporte prioritario con respuesta en menos de 2 horas en horario laboral</li>
        <li><strong className="text-white">Enterprise:</strong> Soporte 24/7 con gerente de cuenta dedicado y línea directa</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Garantía de Portabilidad</h3>
      <p>
        Si decide cancelar su suscripción, garantizamos que podrá exportar todos sus datos (clientes, casos,
        documentos, historial de pagos) en formatos estándar (CSV, PDF, JSON) dentro de las 48 horas
        siguientes a su solicitud, sin costo adicional. Conforme al Art. 21 de la LOPDP (Derecho a la
        Portabilidad), sus datos le pertenecen siempre.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Garantía de Precio</h3>
      <p>
        Los suscriptores activos mantienen su precio vigente al momento de la contratación. Cualquier
        incremento de precio aplicará únicamente a nuevos suscriptores o al renovar después de una
        cancelación. Le notificaremos con 30 días de anticipación sobre cualquier cambio.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Exclusiones</h3>
      <p>Las garantías no aplican en casos de:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Uso del servicio que viole los Términos de Servicio</li>
        <li>Modificaciones no autorizadas o uso indebido de la plataforma</li>
        <li>Interrupciones causadas por proveedores de internet del usuario</li>
        <li>Eventos de fuerza mayor (desastres naturales, conflictos, etc.)</li>
      </ul>
    </section>
  </>
);

const RefundsContent = () => (
  <>
    <section>
      <h3 className="text-xl font-semibold text-white mb-3">1. Política General de Reembolsos</h3>
      <p>
        En Amephia creemos en la transparencia total. Si nuestro servicio no cumple con sus expectativas,
        tiene derecho a solicitar un reembolso bajo las siguientes condiciones:
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Período de Prueba Gratuita</h3>
      <p>
        Todos los planes incluyen 14 días de prueba gratuita sin necesidad de ingresar datos de pago.
        Durante este período no se realiza ningún cobro. Si decide no continuar, simplemente no se
        suscribe y no se le cobrará nada.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Reembolsos por Plan</h3>
      <h4 className="text-white font-medium mt-3 mb-2">3.1 Plan Starter ($49/mes)</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Reembolso completo si solicita cancelación en los primeros 30 días después del primer cobro</li>
        <li>Sin preguntas, sin trámites complicados</li>
      </ul>

      <h4 className="text-white font-medium mt-3 mb-2">3.2 Plan Professional ($149/mes)</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Garantía de devolución de 60 días: reembolso del 100% si no obtiene resultados medibles</li>
        <li>Prorrateo disponible para cancelaciones después de los 60 días</li>
      </ul>

      <h4 className="text-white font-medium mt-3 mb-2">3.3 Plan Enterprise ($349/mes)</h4>
      <ul className="list-disc pl-6 space-y-1">
        <li>Garantía de devolución de 90 días: reembolso del 100%</li>
        <li>Condiciones adicionales según el contrato enterprise individual</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Planes Anuales</h3>
      <p>Para suscripciones anuales:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Primeros 60 días:</strong> Reembolso completo del pago anual</li>
        <li><strong className="text-white">Después de 60 días:</strong> Reembolso proporcional a los meses no utilizados, descontando el descuento anual aplicado</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Proceso de Solicitud de Reembolso</h3>
      <p>Para solicitar un reembolso:</p>
      <ol className="list-decimal pl-6 space-y-2 mt-2">
        <li>Envíe un email a <strong className="text-white">billing@amephia.com</strong> con el asunto "Solicitud de Reembolso"</li>
        <li>Incluya su nombre, email de la cuenta y motivo de la solicitud</li>
        <li>Recibirá una confirmación en un plazo máximo de 24 horas hábiles</li>
        <li>El reembolso se procesará en un plazo de 5 a 10 días hábiles al método de pago original</li>
      </ol>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Excepciones</h3>
      <p>No proceden reembolsos en los siguientes casos:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Violación de los Términos de Servicio que resulte en suspensión de la cuenta</li>
        <li>Solicitudes realizadas fuera del período de garantía aplicable</li>
        <li>Servicios de implementación o migración personalizada ya ejecutados</li>
        <li>Add-ons o servicios profesionales consumidos</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Derechos del Consumidor en Ecuador</h3>
      <p>
        Conforme a la Ley Orgánica de Defensa del Consumidor del Ecuador (Art. 71), usted tiene derecho a:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>La devolución del valor pagado cuando el servicio no corresponda a lo ofertado</li>
        <li>Reclamar ante la Defensoría del Pueblo o la autoridad competente</li>
        <li>Recibir información clara y veraz sobre las condiciones del servicio</li>
      </ul>
      <p className="mt-2">
        Estas disposiciones prevalecen sobre cualquier término contractual que las contradiga.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Contacto</h3>
      <ul className="list-none space-y-1">
        <li><strong className="text-white">Email de facturación:</strong> billing@amephia.com</li>
        <li><strong className="text-white">WhatsApp:</strong> +1 (334) 732-4056</li>
        <li><strong className="text-white">Horario:</strong> Lunes a viernes, 9:00 - 18:00 (Ecuador, GMT-5)</li>
      </ul>
    </section>
  </>
);

const MigrationSaasLanding = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  // WhatsApp Configuration
  const WHATSAPP_NUMBER = '13347324056'; // +1-334-732-4056

  const getWhatsAppURL = (plan?: string) => {
    let message = '';

    if (plan === 'starter') {
      message = `Hola, mi consultora está interesada en el Plan Starter ($49/mes) de Amephia.
Me gustaría conocer más sobre el proceso de implementación y los 14 días de prueba.`;
    } else if (plan === 'professional') {
      message = `Hola, nos interesa implementar el Plan Professional ($149/mes) en nuestra firma.
Nos gustaría agendar una demostración para evaluar cómo automatizar nuestros procesos.`;
    } else if (plan === 'enterprise') {
      message = `Hola, nos gustaría agilizar nuestras operaciones con el Plan Enterprise ($349/mes).
Manejamos un volumen alto de casos y requerimos información sobre integración y migración.`;
    } else {
      message = `Hola, visité el sitio web de Amephia SaaS de Gestión Migratoria.
Agradecería obtener información adicional y detalles sobre cómo iniciar una prueba en mi firma.`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };



  const painPoints = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      pain: "Tiempo excesivo respondiendo consultas de estado de casos",
      cost: "Múltiples horas diarias desviadas de tareas de alto valor"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      pain: "Demoras en la recolección de pagos y seguimiento de facturación",
      cost: "Flujo de caja irregular y desgaste en cobranzas manuales"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      pain: "Documentación dispersa en correos y aplicaciones de mensajería",
      cost: "Riesgos de seguridad, pérdida de información y retrasos"
    },
    {
      icon: <Users className="w-6 h-6" />,
      pain: "Capacidad operativa limitada para aceptar nuevos clientes",
      cost: "Crecimiento estancado por procesos administrativos ineficientes"
    }
  ];

  const transformations = [
    {
      metric: "Carga operativa alta",
      result: "Escalabilidad comprobada",
      description: "Optimice sus recursos. El portal 24/7 reduce drásticamente las consultas de rutina.",
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />
    },
    {
      metric: "Cobranza manual",
      result: "Facturación automatizada",
      description: "Integre pasarelas de pago y mejore la predictibilidad de su flujo de caja.",
      icon: <DollarSign className="w-8 h-8 text-emerald-400" />
    },
    {
      metric: "Archivos descentralizados",
      result: "Gestión documental segura",
      description: "Expedientes organizados, búsqueda instantánea y controles de acceso robustos.",
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
      role: "Socio Director - GlobalVisa Legal",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      content: "La adopción de Amephia nos permitió optimizar nuestros flujos de trabajo internos. La centralización de documentos y pagos ha sido fundamental para escalar nuestras operaciones sin comprometer la calidad del servicio.",
      metric: "Eficiencia Operativa",
      rating: 5,
      verified: true
    },
    {
      name: "Diana Sánchez",
      role: "Fundadora - Migration Partners",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      content: "El portal interactivo transformó la experiencia de nuestros clientes. Al tener total visibilidad de sus expedientes, las consultas de rutina disminuyeron significativamente, permitiendo a nuestro equipo enfocarse en resoluciones legales.",
      metric: "Satisfacción del Cliente",
      rating: 5,
      verified: true
    },
    {
      name: "Carlos Mendoza",
      role: "Managing Director - Express Immigration",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos2",
      content: "La implementación fue sorprendentemente fluida. Desde el primer mes vimos mejoras sustanciales en nuestros ciclos de cobranza y en la trazabilidad de los trámites. Es una infraestructura sólida y confiable.",
      metric: "Implementación Rápida",
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
      guarantee: "14 días gratis + Garantía 60 días"
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
      guarantee: "POC gratuito + Garantía 90 días"
    }
  ];

  const faqs = [
    {
      question: "¿Qué nivel de seguridad informática maneja la plataforma?",
      answer: "Amephia implementa encriptación AES-256 (estándar bancario) para todos los documentos y datos en reposo, así como conexiones SSL/TLS para datos en tránsito. Los servidores operan bajo certificación SOC 2 Type II y ejecutamos copias de seguridad automatizadas con redundancia geográfica cada 6 horas para garantizar disponibilidad operativa y cumplimiento de políticas de privacidad internacionales (GDPR/CCPA)."
    },
    {
      question: "¿La plataforma implica una curva de aprendizaje compleja para el equipo legal?",
      answer: "No. Amephia ha sido diseñada con una interfaz enfocada en la usabilidad profesional. La configuración inicial toma pocos minutos y la plataforma emula carpetas de casos lógicas que los profesionales ya dominan. Además, proveemos documentación completa, guías paso a paso y sesiones de onboarding (dependiendo del plan) para asegurar una adopción eficiente sin detener sus operaciones actuales."
    },
    {
      question: "¿El portal de autoservicio realmente disminuye las consultas de estado de los clientes?",
      answer: "Sí, de forma demostrable. Las métricas internas reflejan que la vasta mayoría de clientes acceden a su portal asignado para revisar el estado de sus expedientes, fechas pendientes o comprobantes. Esto reduce sustancialmente el número de correos electrónicos y mensajes de seguimiento hacia su equipo, consolidando un flujo de trabajo reactivo en uno proactivo y automatizado."
    },
    {
      question: "¿Qué procesos debo cancelar temporalmente para migrar mis expedientes?",
      answer: "Ninguno. La migración está diseñada para realizarse de forma asíncrona sin demandar «downtime» operativo («cero interrupciones»). Puede instaurar nuevos clientes en Amephia mientras importa paulatinamente expedientes en curso. En los planes empresariales ofrecemos migración de datos asistida (white-glove) manejada enteramente por nuestro soporte."
    },
    {
      question: "¿Amephia cumple con directivas de \"marca blanca\" (White Label)?",
      answer: "Por supuesto. Los planes Professional y Enterprise habilitan configuración de dominios corporativos personalizados (ej. portal.su-estudio.com) e integración de isologotipo y paletas de color institucionales. De este modo, los clientes finales interactúan íntegramente de cara a su marca, proyectando presencia de un estudio corporativo de gran envergadura."
    },
    {
      question: "¿Existe permanencia contractual o bloqueos si decidimos suspender la cuenta?",
      answer: "No exigimos contratos de permanencia en los planes mensuales. Respetamos rigurosamente el derecho de potabilidad de los datos; por lo que el usuario tiene la funcionalidad de exportar la totalidad de su portafolio de clientes, casos, documentos en lote (CSV, JSON, PDF) al solicitar la suspensión y cancelar el cobro posterior sin penalizaciones."
    }
  ];

  const guarantees: { icon: React.ReactNode; title: string; description: string }[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Urgency Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Timer className="w-4 h-4" />
            <span>Actualice la gestión de su firma migratoria. Inicie su prueba gratuita de 14 días.</span>
          </div>
          <a
            href={getWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-700 px-4 py-1 rounded-full font-bold hover:bg-emerald-50 transition-all text-center"
          >
            Contactar a Ventas
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-bold">Plataforma integral para despachos y consultoras</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Gestión Optimizable para
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Firmas Migratorias Modernas
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto font-medium">
              Amephia proporciona la infraestructura tecnológica necesaria para <span className="text-emerald-400 font-bold">centralizar expedientes</span>,
              mejorar la comunicación con el cliente y escalar sus operaciones <span className="text-emerald-400 font-bold">de forma segura e intuitiva.</span>
            </p>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-2 border-slate-700 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-white text-lg mb-2">
                <strong className="text-emerald-400">Eficiencia comprobada:</strong> Firmas que utilizan Amephia han logrado
              </p>
              <p className="text-slate-300">
                Reducir horas administrativas en un <span className="text-emerald-400 font-bold text-xl">45%</span> y mejorar los tiempos de respuesta a clientes.
              </p>
              <p className="text-slate-400 font-medium mt-2">
                Agende una demostración personalizada para su equipo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={getWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-3"
              >
                Comenzar Prueba Gratuita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">14 días de prueba</strong> sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">Implementación rápida</strong> e intuitiva</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span><strong className="text-white">Soporte técnico</strong> especializado</span>
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

      <section className="py-16 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Desafíos Operativos Comunes en Firmas Migratorias
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Identificamos las áreas críticas donde el trabajo administrativo consume el tiempo de los profesionales legales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-700/50 p-3 rounded-lg text-emerald-400">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-2">{item.pain}</p>
                    <p className="text-slate-400 text-sm">{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <p className="text-xl font-medium text-white mb-2">
              Transforme la complejidad administrativa en <span className="text-emerald-400">procesos organizados e inteligentes.</span>
            </p>
            <p className="text-slate-400">
              Nuestro compromiso es brindarle herramientas que devuelvan el control operativo a su equipo. ↓
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Una Nueva Perspectiva para su Negocio
            </h2>
            <p className="text-lg text-slate-400">
              Al adoptar Amephia, las firmas logran resultados sustanciales que cambian la manera en la que el equipo legal gestiona y atiende a sus clientes.
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

          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-10 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Automatización Estratégica
            </h3>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              La integración de flujos de trabajo automatizados y un <strong className="text-emerald-400">Portal del Cliente 24/7</strong> permite que su equipo se centre en el valor legal del servicio. Mientras la plataforma automatiza notificaciones, recolecta documentación y procesa pagos, sus profesionales desarrollan la firma.
            </p>
            <a
              href={getWhatsAppURL('professional')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40"
            >
              Contactar a Ventas
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Respaldado por Profesionales de la Industria
            </h2>
            <p className="text-lg text-slate-400">
              Conozca el impacto de Amephia en las operaciones diarias de firmas similares a la suya.
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

      {/* =========================================
          CÓMO FUNCIONA — Screenshots reales
      ========================================= */}
      <section id="como-funciona" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-bold">Interfaz Intuitiva y Eficiente</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Conozca la Plataforma
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Desde Adentro
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Diseñada específicamente para los flujos de trabajo de firmas migratorias modernas.
            </p>
          </div>

          {/* Screenshots grid */}
          <div className="space-y-20">

            {/* Step 1 — Login */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-4">
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                  <span className="text-sm text-slate-400 font-medium">Tu Portal Personalizado</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Tu empresa, tu subdominio,<br />
                  <span className="text-emerald-400">tu marca</span>
                </h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Cada consultora tiene su portal exclusivo en <span className="text-white font-mono">tuconsultora.amephia.com</span>.
                  Tus clientes ven tu marca, no la nuestra. Login seguro con sesiones encriptadas.
                </p>
                <ul className="space-y-3">
                  {['Portal exclusivo por consultora', 'Subdominio personalizado con tu nombre', 'Login seguro con encriptación SSL', 'Acceso 24/7 desde cualquier dispositivo'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-emerald-500/40 transition-all">
                  <img
                    src="/assets/migration-screenshots/01_login.png"
                    alt="Portal de Login - Amephia Migration SaaS"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-slate-300 font-mono border border-slate-700/50">
                    consultoria-abc.amephia.com
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 — Dashboard */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-blue-500/40 transition-all">
                  <img
                    src="/assets/migration-screenshots/02_dashboard.png"
                    alt="Dashboard Principal con métricas en tiempo real"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-4">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  <span className="text-sm text-slate-400 font-medium">Dashboard en Tiempo Real</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Todo tu negocio<br />
                  <span className="text-blue-400">de un vistazo</span>
                </h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Métricas de clientes, casos activos, ingresos cobrados y pipeline completo.
                  Sin abrir Excel. Sin llamar a tu equipo. La información que necesitas, donde la necesitas.
                </p>
                <ul className="space-y-3">
                  {['Clientes, casos e ingresos en tiempo real', 'Pipeline visual por etapas de proceso', 'Actividad reciente del equipo', 'Alertas de casos que necesitan atención'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 3 — Cases */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-4">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                  <span className="text-sm text-slate-400 font-medium">Gestión de Casos</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Cada caso,<br />
                  <span className="text-orange-400">bajo control total</span>
                </h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Vista kanban de todos tus trámites con estado actual, prioridad y progreso visual.
                  Green card, naturalización, EAD, I-130 — todos organizados en un solo lugar.
                </p>
                <ul className="space-y-3">
                  {['Vista kanban por estado del trámite', 'Filtros por tipo de caso y prioridad', 'Número de caso único auto-generado', 'Progreso visual por barra de color'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-orange-500/40 transition-all">
                  <img
                    src="/assets/migration-screenshots/04_cases.png"
                    alt="Gestión de Casos en modo kanban"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 — Case Detail */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-purple-500/40 transition-all">
                  <img
                    src="/assets/migration-screenshots/05_case_detail.png"
                    alt="Detalle de caso con timeline, documentos y pagos"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-4">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center font-bold">4</span>
                  <span className="text-sm text-slate-400 font-medium">Detalle de Caso Completo</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Documentos, pagos y mensajes<br />
                  <span className="text-purple-400">en un solo lugar</span>
                </h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Timeline de progreso con 5 etapas. Solicita documentos al cliente, registra pagos,
                  sube evidencias y chatea — todo dentro del caso sin salir a WhatsApp.
                </p>
                <ul className="space-y-3">
                  {['Timeline visual: Pago → Docs → Revisión → Proceso → Finalizado', 'Solicitar y aprobar documentos al cliente', 'Registro de pagos y saldo pendiente', 'Chat interno facilitador ↔ cliente'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 5 — Clients */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 mb-4">
                  <span className="w-6 h-6 bg-teal-500 text-white rounded-full text-xs flex items-center justify-center font-bold">5</span>
                  <span className="text-sm text-slate-400 font-medium">Gestión de Clientes</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Todos tus clientes,<br />
                  <span className="text-teal-400">organizados y accesibles</span>
                </h3>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Directorio completo de clientes. Crea uno nuevo en 30 segundos y el sistema
                  envía automáticamente el email de bienvenida con acceso al portal.
                </p>
                <ul className="space-y-3">
                  {['Directorio con búsqueda en tiempo real', 'Alta de clientes con email automático', 'Estado activo/pendiente por cliente', 'Historial de casos por cliente'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl group-hover:border-teal-500/40 transition-all">
                  <img
                    src="/assets/migration-screenshots/03_clients.png"
                    alt="Gestión de clientes con búsqueda y tabla"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Step 6 — Client Portal (HIGHLIGHTED) */}
            <div className="relative">
              {/* Special highlight badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl shadow-emerald-500/20 whitespace-nowrap">
                  Módulo de Autoservicio para Clientes
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-900 border border-slate-700 rounded-3xl p-10 pt-14 hover:border-emerald-500/40 transition-all">
                <div className="order-2 md:order-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 group-hover:border-yellow-500/60 transition-all">
                    <img
                      src="/assets/migration-screenshots/01_login.png"
                      alt="Portal de acceso exclusivo para cada cliente final"
                      className="w-full h-auto"
                    />
                    {/* Overlay badge on image */}
                    <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black">
                      VISTA DEL CLIENTE FINAL
                    </div>
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-slate-300 font-mono border border-slate-700/50">
                      juan.garcia@gmail.com → Ve SU caso
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-4">
                    <span className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center font-bold">6</span>
                    <span className="text-sm text-emerald-400 font-bold">Portal del Cliente en Marca Blanca</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Visibilidad total para<br />
                    <span className="text-emerald-400">sus clientes</span>
                  </h3>
                  <p className="text-slate-300 text-lg mb-4 leading-relaxed">
                    Una vez creado un expediente, el cliente final recibe credenciales seguras de acceso.
                    A través de su navegador o dispositivo móvil, puede dar seguimiento autónomo al estado de su trámite en todo momento.
                  </p>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                    <p className="text-emerald-400 font-medium text-sm">
                      Impacto operativo: Nuestros usuarios reportan una disminución sustancial en llamadas de seguimiento y correos rutinarios, ya que el cliente posee información transparente y en tiempo real.
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Ve el estado actual de su caso en tiempo real',
                      'Sube documentos requeridos directamente desde el portal',
                      'Revisa el historial de avances y etapas completadas',
                      'Accede a sus facturas y comprobantes de pago',
                      'Recibe notificaciones automáticas de cada avance',
                      'Chat directo con su facilitador sin llamar ni escribir a WhatsApp',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Client Portal Feature Banner — standalone callout before manual */}
          <div className="mt-16 bg-slate-900 border border-slate-700/80 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                <p className="text-white font-medium mb-1">Acceso Ininterrumpido</p>
                <p className="text-slate-400 text-sm">Visibilidad continua desde cualquier dispositivo.</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">Seguridad Legal</div>
                <p className="text-white font-medium mb-1">Carga Documental Segura</p>
                <p className="text-slate-400 text-sm">Recepción de documentación con controles encriptados.</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-teal-400 mb-2">Transparencia</div>
                <p className="text-white font-medium mb-1">Trazabilidad Total</p>
                <p className="text-slate-400 text-sm">Historial auditable de acciones y comunicaciones.</p>
              </div>
            </div>
          </div>

          {/* Manual Download CTA */}
          <div className="mt-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-800/80 rounded-3xl" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative border border-slate-700/50 rounded-3xl p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-bold">RECURSO GRATUITO</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Descarga el Manual Completo del Portal
              </h3>
              <p className="text-xl text-slate-300 mb-3 max-w-2xl mx-auto">
                19 páginas con capturas reales, guías paso a paso y referencia completa de todas las funciones.
              </p>
              <p className="text-slate-500 text-sm mb-10">
                PDF · 1.4 MB · Actualizado Febrero 2026 · En Español
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/assets/migration-screenshots/MANUAL_PORTAL_CLIENTE.pdf"
                  download="Manual_Portal_Amephia_Migration.pdf"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/30 hover:scale-105"
                >
                  <FileText className="w-5 h-5" />
                  Descargar Manual PDF — Gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  <Rocket className="w-5 h-5" />
                  Empezar Prueba Gratis — 14 días
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing - Profesional */}
      <section id="pricing" className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Planes de Inversión Tecnológica
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Soluciones estructuradas para firmas en todas las etapas de crecimiento. Inicie su prueba de 14 días sin requerir método de pago.
            </p>

            <div className="inline-flex items-center bg-slate-800/50 border border-slate-700/50 rounded-xl p-1 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === 'monthly'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-medium transition-all relative ${billingCycle === 'yearly'
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
                className={`relative rounded-2xl p-8 transition-all hover:scale-105 ${plan.highlighted
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
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-emerald-400 font-medium mb-4 text-sm">{plan.tagline}</p>
                  <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-slate-700/50">{plan.description}</p>

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

                  <a
                    href={getWhatsAppURL(plan.name.toLowerCase())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-medium text-center transition-all inline-block ${plan.highlighted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                  >
                    Contactar
                  </a>

                  <p className="text-xs text-slate-500 mb-2 mt-4">{plan.guarantee}</p>
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

          {/* Implementation Note */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12 text-center max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Implementación Estructurada Onboarding Asistido
            </h3>
            <p className="text-slate-400">
              Limitamos nuestro onboarding mensual a nuevas firmas para garantizar la configuración adecuada, la migración segura de datos y el entrenamiento técnico pertinente de su equipo de abogados y facilitadores.
            </p>
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

      {/* OTROS NEGOCIOS - No solo migración */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-bold">PLATAFORMA MULTIINDUSTRIA</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              No Solo Para Migración.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Para Cualquier Negocio de Servicios.
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              La misma plataforma que usan consultoras migratorias se adapta a cualquier negocio
              que gestione casos, clientes y documentos. Misma potencia, tu industria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                emoji: "⚖️",
                title: "Bufetes de Abogados",
                desc: "Gestión de casos legales, seguimiento de expedientes, portal para clientes y control de honorarios."
              },
              {
                emoji: "📋",
                title: "Consultoras de Visas y Trámites",
                desc: "Visas de trabajo, turismo, estudiantiles. Cada tipo de visa como un caso con su propio flujo."
              },
              {
                emoji: "🏗️",
                title: "Agencias de Permisos y Licencias",
                desc: "Permisos de construcción, licencias comerciales, trámites municipales con timeline de progreso."
              },
              {
                emoji: "📊",
                title: "Consultoras Contables y Tributarias",
                desc: "Declaraciones, auditorías y trámites fiscales. Cada cliente con su carpeta de documentos organizada."
              },
              {
                emoji: "🎓",
                title: "Agencias de Estudios en el Exterior",
                desc: "Aplicaciones a universidades, becas, documentos académicos y seguimiento de admisiones."
              },
              {
                emoji: "🛡️",
                title: "Agencias de Seguros",
                desc: "Pólizas por cliente, renovaciones, documentos de siniestros y seguimiento de reclamos con timeline."
              },
              {
                emoji: "🏠",
                title: "Inmobiliarias y Corredores",
                desc: "Seguimiento de propiedades, documentación de compraventa, portal para compradores y vendedores."
              },
              {
                emoji: "💼",
                title: "Freelancers y Agencias",
                desc: "Gestión de proyectos por cliente, entregables, facturación y portal de seguimiento para cada proyecto."
              }
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
              >
                <div className="text-4xl mb-3">{industry.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {industry.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{industry.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tu negocio gestiona clientes, casos o trámites?
            </h3>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Entonces esta plataforma es para ti. Mismo portal 24/7, mismos pagos automáticos,
              misma organización de documentos — adaptado a TU flujo de trabajo.
            </p>
            <a
              href={getWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/30 hover:scale-105"
            >
              Cuéntanos tu caso — Te asesoramos gratis
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ - ELIMINANDO OBJECIONES */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-slate-400">
              Respuestas claras sobre implementación, seguridad y retorno de inversión.
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
                    className={`w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
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

      {/* Final CTA - CIERRE PROFESIONAL */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Modernice la Gestión de su Firma Legal
              </h2>

              <p className="text-lg text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Descubra por qué más de 150 consultoras confían en Amephia para asegurar sus datos, agilizar sus procesos operativos y mejorar la comunicación con sus clientes.
              </p>

              <div className="flex flex-col items-center gap-4 mb-6">
                <a
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 inline-flex items-center gap-3"
                >
                  Contactar a Ventas
                  <ArrowRight className="w-5 h-5" />
                </a>

                <p className="text-slate-400 text-sm mt-4">
                  Evaluación técnica sin costo • Implementación asistida • Seguridad certificada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Modal */}
      <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />

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
                {[1, 2, 3, 4, 5].map((_, i) => (
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
                <li><button onClick={() => setLegalPage('terms')} className="hover:text-emerald-400 transition-colors text-left">Términos de Servicio</button></li>
                <li><button onClick={() => setLegalPage('privacy')} className="hover:text-emerald-400 transition-colors text-left">Privacidad y Datos Personales</button></li>
                <li><button onClick={() => setLegalPage('guarantees')} className="hover:text-emerald-400 transition-colors text-left">Garantías</button></li>
                <li><button onClick={() => setLegalPage('refunds')} className="hover:text-emerald-400 transition-colors text-left">Reembolsos</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              &copy; 2026 Amephia Systems Inc. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">SSL • AES-256 • SOC 2 • LOPDP Ecuador • GDPR</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MigrationSaasLanding;
