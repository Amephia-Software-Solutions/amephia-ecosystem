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
        Al acceder y utilizar la plataforma Amephia Migration SaaS (en adelante, "el Servicio"), operada por
        Amephia Systems Inc. (en adelante, "Amephia", "nosotros"), usted acepta quedar vinculado por estos
        Términos de Servicio. Si no está de acuerdo con alguno de estos términos, no utilice el Servicio.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">2. Descripción del Servicio</h3>
      <p>
        Amephia Migration SaaS es una plataforma de gestión integral para facilitadores migratorios que permite:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Gestión de casos y trámites migratorios</li>
        <li>Portal de autoservicio para clientes 24/7</li>
        <li>Procesamiento de pagos en línea</li>
        <li>Almacenamiento seguro de documentos</li>
        <li>Comunicación facilitador-cliente</li>
        <li>Reportes y analítica del negocio</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">3. Registro y Cuenta</h3>
      <p>
        Para utilizar el Servicio, usted debe: (a) tener al menos 18 años de edad; (b) proporcionar información
        veraz, completa y actualizada durante el registro; (c) mantener la confidencialidad de sus credenciales
        de acceso; (d) notificarnos inmediatamente ante cualquier uso no autorizado de su cuenta.
      </p>
      <p className="mt-2">
        Usted es responsable de todas las actividades que ocurran bajo su cuenta. Amephia no será responsable
        por pérdidas derivadas del uso no autorizado de su cuenta.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">4. Planes y Facturación</h3>
      <p>
        El Servicio ofrece planes de suscripción mensual y anual. Los precios están expresados en dólares
        estadounidenses (USD) y no incluyen impuestos aplicables según su jurisdicción.
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li><strong className="text-white">Período de prueba:</strong> 14 días gratuitos sin necesidad de tarjeta de crédito.</li>
        <li><strong className="text-white">Renovación:</strong> Las suscripciones se renuevan automáticamente al finalizar cada período.</li>
        <li><strong className="text-white">Cambios de precio:</strong> Notificaremos con 30 días de anticipación cualquier cambio de precios. Los suscriptores activos mantienen su precio durante el período contratado.</li>
        <li><strong className="text-white">Cancelación:</strong> Puede cancelar en cualquier momento. Su acceso continuará hasta el final del período facturado.</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">5. Uso Aceptable</h3>
      <p>Usted se compromete a NO utilizar el Servicio para:</p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Actividades ilegales o fraudulentas</li>
        <li>Facilitar inmigración ilegal o tráfico de personas</li>
        <li>Almacenar contenido malicioso, ilegal o que viole derechos de terceros</li>
        <li>Intentar acceder a datos de otros usuarios o vulnerar la seguridad del sistema</li>
        <li>Revender, sublicenciar o redistribuir el Servicio sin autorización escrita</li>
        <li>Realizar ingeniería inversa o descompilar el software</li>
      </ul>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">6. Propiedad Intelectual</h3>
      <p>
        Todo el contenido, código, diseño, marcas y materiales del Servicio son propiedad exclusiva de
        Amephia Systems Inc. y están protegidos por leyes de propiedad intelectual. Usted conserva la
        propiedad de todos los datos que suba a la plataforma.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">7. Disponibilidad del Servicio</h3>
      <p>
        Nos esforzamos por mantener una disponibilidad del 99.9% (plan Enterprise con SLA). Sin embargo,
        el Servicio puede experimentar interrupciones por mantenimiento programado (notificado con 48 horas
        de anticipación), actualizaciones de seguridad críticas o causas de fuerza mayor.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">8. Limitación de Responsabilidad</h3>
      <p>
        En la máxima medida permitida por la ley, Amephia no será responsable por: daños indirectos,
        incidentales, especiales o consecuentes; pérdida de beneficios, datos o uso; interrupciones del
        negocio. Nuestra responsabilidad total no excederá el monto pagado por usted en los últimos 12 meses.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">9. Resolución de Disputas</h3>
      <p>
        Cualquier disputa será resuelta mediante arbitraje vinculante de acuerdo con las reglas de arbitraje
        comercial aplicables. Para usuarios en Ecuador, se respetarán los derechos establecidos en la Ley
        Orgánica de Defensa del Consumidor y la normativa local vigente.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">10. Modificaciones</h3>
      <p>
        Nos reservamos el derecho de modificar estos Términos con 30 días de notificación previa por email
        y aviso en la plataforma. El uso continuado del Servicio después de dichas modificaciones constituye
        su aceptación de los nuevos términos.
      </p>
    </section>

    <section>
      <h3 className="text-xl font-semibold text-white mb-3">11. Contacto</h3>
      <p>
        Para consultas sobre estos Términos de Servicio, contáctenos en:
      </p>
      <ul className="list-none space-y-1 mt-2">
        <li><strong className="text-white">Email:</strong> legal@amephia.com</li>
        <li><strong className="text-white">WhatsApp:</strong> +593 98 605 9727</li>
        <li><strong className="text-white">Empresa:</strong> Amephia Systems Inc.</li>
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
        <li><strong className="text-white">Teléfono:</strong> +593 98 605 9727</li>
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
        <li><strong className="text-white">WhatsApp:</strong> +593 98 605 9727</li>
        <li><strong className="text-white">Horario:</strong> Lunes a viernes, 9:00 - 18:00 (Ecuador, GMT-5)</li>
      </ul>
    </section>
  </>
);

const MigrationSaasLanding = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  // WhatsApp Configuration
  const WHATSAPP_NUMBER = '593986059727'; // +593-98-605-9727

  const getWhatsAppURL = (plan?: string) => {
    let message = '';

    if (plan === 'starter') {
      message = `🚀 Hola! Quiero empezar con el Plan STARTER ($49/mes) del SaaS de Gestión Migratoria.

¿Pueden ayudarme con el setup y los 14 días gratis?`;
    } else if (plan === 'professional') {
      message = `🔥 Hola! ¡LO QUIERO! Necesito el Plan PROFESSIONAL ($149/mes).

Estoy listo para TRIPLICAR mis ingresos. ¿Cuándo empezamos?`;
    } else if (plan === 'enterprise') {
      message = `💎 Hola! Necesito hablar sobre el Plan ENTERPRISE ($349/mes).

Procesamos 100+ casos/mes y necesitamos la migración VIP completa. ¿Podemos agendar una llamada?`;
    } else {
      message = `👋 Hola! Vengo de la landing page del SaaS de Gestión Migratoria.

Quiero información sobre cómo empezar con los 14 días gratis. ¿Me pueden ayudar?`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

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

  const guarantees: { icon: React.ReactNode; title: string; description: string }[] = [];

  const urgencyReasons = [
    {
      icon: <Timer className="w-5 h-5" />,
      text: "Solo 7 cupos disponibles este mes (limitamos onboarding para dar mejor servicio)"
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
          <a
            href={getWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-red-50 transition-all animate-pulse"
          >
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
                href={getWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
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
              href={getWhatsAppURL('professional')}
              target="_blank"
              rel="noopener noreferrer"
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

      {/* =========================================
          CÓMO FUNCIONA — Screenshots reales
      ========================================= */}
      <section id="como-funciona" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-bold">PLATAFORMA REAL — No mockups. No diseños bonitos. El sistema REAL.</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Mira Cómo Funciona
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Por Dentro
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Estas no son ilustraciones. Son capturas reales del sistema que usarás desde el día 1.
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
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-6 py-2 rounded-full text-sm font-black shadow-xl shadow-orange-500/40 animate-pulse whitespace-nowrap">
                  ⭐ LA FUNCIÓN QUE MÁS REDUCE TUS LLAMADAS
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 border-2 border-yellow-500/30 rounded-3xl p-10 pt-14 hover:border-yellow-500/50 transition-all">
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
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 mb-4">
                    <span className="w-6 h-6 bg-yellow-500 text-slate-900 rounded-full text-xs flex items-center justify-center font-black">6</span>
                    <span className="text-sm text-yellow-400 font-bold">Portal Exclusivo para Cada Cliente Final</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Cada cliente tuyo tiene<br />
                    <span className="text-yellow-400">su propio acceso al portal</span>
                  </h3>
                  <p className="text-slate-300 text-lg mb-4 leading-relaxed">
                    <strong className="text-white">Esto es el game-changer:</strong> Cuando creas un caso, tu cliente
                    recibe un email de acceso a <strong>SU portal personalizado</strong>. Puede ingresar
                    desde su celular o computadora, las 24 horas, los 7 días de la semana.
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                    <p className="text-yellow-300 font-semibold text-sm">
                      💡 Resultado: El 89% de los clientes usa el portal en las primeras 48 horas.
                      Las consultorias reportan <strong>78% MENOS llamadas</strong> de "¿cómo va mi caso?".
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
          <div className="mt-16 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-yellow-500/30 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-5xl font-black text-yellow-400 mb-2">24/7</div>
                <p className="text-white font-bold mb-1">Acceso sin límites</p>
                <p className="text-slate-400 text-sm">Tus clientes ven su caso desde cualquier dispositivo, a cualquier hora</p>
              </div>
              <div>
                <div className="text-5xl font-black text-orange-400 mb-2">78%</div>
                <p className="text-white font-bold mb-1">Menos llamadas</p>
                <p className="text-slate-400 text-sm">Porque el cliente ya sabe exactamente en qué etapa está su trámite</p>
              </div>
              <div>
                <div className="text-5xl font-black text-emerald-400 mb-2">0</div>
                <p className="text-white font-bold mb-1">WhatsApps de estado</p>
                <p className="text-slate-400 text-sm">El portal responde las preguntas antes de que las hagan</p>
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

                  <a
                    href={getWhatsAppURL(plan.name.toLowerCase())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl font-bold text-lg mb-4 transition-all inline-block text-center ${plan.highlighted
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 animate-pulse'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                  >
                    {plan.cta}
                  </a>

                  <p className="text-xs text-slate-400 mb-2">{plan.guarantee}</p>
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
                  href={getWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
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
