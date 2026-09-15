import { useEffect } from 'react';

/**
 * BrochurePage — renders inside React so it works with any server/hosting.
 * All styles are injected inline to keep it fully self-contained.
 */
export default function BrochurePage() {
  useEffect(() => {
    // Set page title and meta
    document.title = 'AmePhia Systems — Brochure Corporativo | Corporate Brochure';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Brochure corporativo de AmePhia Systems. Empresa confiable de desarrollo de software en California, Newark NJ y Ecuador.');

    // Language helpers
    const setLang = (lang: string) => {
      document.body.classList.toggle('br-lang-en', lang === 'en');
      const btnEs = document.getElementById('br-btn-es');
      const btnEn = document.getElementById('br-btn-en');
      if (btnEs) btnEs.classList.toggle('br-active', lang === 'es');
      if (btnEn) btnEn.classList.toggle('br-active', lang === 'en');
      localStorage.setItem('amephia-brochure-lang', lang);
    };

    // Wire up buttons
    const btnEs = document.getElementById('br-btn-es');
    const btnEn = document.getElementById('br-btn-en');
    if (btnEs) btnEs.onclick = () => setLang('es');
    if (btnEn) btnEn.onclick = () => setLang('en');

    // Restore preference
    const saved = localStorage.getItem('amephia-brochure-lang');
    const browserLang = navigator.language || 'es';
    const preferred = saved || (browserLang.startsWith('en') ? 'en' : 'es');
    if (preferred === 'en') setLang('en');

    // Scroll animations
    if ('IntersectionObserver' in window) {
      const cards = document.querySelectorAll('.br-card');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animation = 'brFadeUp .5s ease both';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      cards.forEach(c => { (c as HTMLElement).style.opacity = '0'; io.observe(c); });
    }

    return () => {
      // Cleanup body class on unmount
      document.body.classList.remove('br-lang-en');
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        :root{--br-bg:#060B16;--br-bg2:#0a1628;--br-blue:#3b82f6;--br-purple:#8b5cf6;--br-cyan:#06b6d4;--br-white:#fff;--br-slate:#94a3b8;--br-slate2:#64748b;--br-border:rgba(255,255,255,0.08);--br-grad:linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4);--br-r:14px;--br-font:'Inter',system-ui,sans-serif;--br-font2:'Space Grotesk',system-ui,sans-serif;}
        .br-wrap{font-family:var(--br-font);background:var(--br-bg);color:var(--br-white);min-height:100vh;line-height:1.6;-webkit-font-smoothing:antialiased;}
        @keyframes brFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

        /* ── Language ── */
        .br-es{display:block}.br-en{display:none}
        .br-s-es{display:inline}.br-s-en{display:none}
        body.br-lang-en .br-es{display:none}body.br-lang-en .br-en{display:block}
        body.br-lang-en .br-s-es{display:none}body.br-lang-en .br-s-en{display:inline}

        /* ── Nav ── */
        .br-nav{position:sticky;top:0;z-index:999;background:rgba(6,11,22,.93);backdrop-filter:blur(12px);border-bottom:1px solid var(--br-border);display:flex;align-items:center;justify-content:space-between;padding:10px 24px;gap:12px;}
        .br-logo{font-family:var(--br-font2);font-weight:700;font-size:18px;color:var(--br-white);text-decoration:none;display:flex;align-items:center;gap:4px;}
        .br-logo span{background:var(--br-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .br-controls{display:flex;align-items:center;gap:8px;}
        .br-lbtn{padding:6px 14px;border-radius:99px;border:1px solid var(--br-border);background:transparent;color:var(--br-slate);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;font-family:var(--br-font);}
        .br-lbtn.br-active{background:var(--br-blue);border-color:var(--br-blue);color:#fff;}
        .br-lbtn:hover:not(.br-active){border-color:rgba(255,255,255,.2);color:var(--br-white);}
        .br-pdf{padding:7px 16px;border-radius:99px;border:none;background:var(--br-grad);color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:var(--br-font);display:flex;align-items:center;gap:6px;transition:opacity .2s,transform .2s;}
        .br-pdf:hover{opacity:.88;transform:scale(1.03);}
        .br-back{padding:7px 14px;border-radius:99px;border:1px solid var(--br-border);background:transparent;color:var(--br-slate);font-size:13px;font-weight:600;cursor:pointer;font-family:var(--br-font);display:flex;align-items:center;gap:5px;transition:all .2s;text-decoration:none;}
        .br-back:hover{border-color:rgba(255,255,255,.25);color:var(--br-white);}

        /* ── Layout ── */
        .br-sec{padding:72px 24px;max-width:1100px;margin:0 auto;}
        .br-sec-full{padding:72px 24px;}
        .br-inner{max-width:1100px;margin:0 auto;}
        .br-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:99px;border:1px solid rgba(59,130,246,.3);background:rgba(59,130,246,.08);color:var(--br-blue);font-size:12px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-bottom:16px;}
        .br-h2{font-family:var(--br-font2);font-size:clamp(26px,4vw,40px);font-weight:800;line-height:1.15;margin-bottom:12px;}
        .br-sub{font-size:clamp(14px,2vw,16px);color:var(--br-slate);max-width:640px;margin-bottom:40px;line-height:1.75;}
        .br-grad{background:var(--br-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .br-divider{height:1px;background:var(--br-border);margin:0;}

        /* ── Hero ── */
        .br-hero{min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 20px 56px;position:relative;overflow:hidden;}
        .br-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% -20%,rgba(59,130,246,.15) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 60%,rgba(139,92,246,.1) 0%,transparent 60%),linear-gradient(180deg,var(--br-bg) 0%,var(--br-bg2) 100%);}
        .br-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px);background-size:50px 50px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 80%);}
        .br-hero-inner{position:relative;z-index:1;max-width:860px;}
        .br-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:99px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);font-size:12px;color:var(--br-slate);margin-bottom:28px;font-weight:500;}
        .br-h1{font-family:var(--br-font2);font-size:clamp(34px,6vw,68px);font-weight:900;line-height:1.06;margin-bottom:18px;letter-spacing:-1.5px;}
        .br-hero-sub{font-size:clamp(14px,2vw,18px);color:var(--br-slate);max-width:580px;margin:0 auto 32px;line-height:1.75;}
        .br-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:40px;}
        .br-btn-p{padding:12px 26px;border-radius:99px;background:var(--br-grad);color:#fff;font-weight:700;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:7px;transition:opacity .2s,transform .2s,box-shadow .2s;box-shadow:0 4px 20px rgba(59,130,246,.3);}
        .br-btn-p:hover{opacity:.9;transform:translateY(-2px);}
        .br-btn-s{padding:11px 22px;border-radius:99px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.04);color:var(--br-white);font-weight:600;font-size:14px;text-decoration:none;display:inline-flex;align-items:center;gap:7px;transition:border-color .2s,background .2s;}
        .br-btn-s:hover{border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.08);}
        .br-locs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
        .br-loc{display:flex;align-items:center;gap:6px;padding:5px 13px;border-radius:99px;border:1px solid var(--br-border);background:rgba(255,255,255,.03);font-size:12px;color:var(--br-slate);}

        /* ── Stats ── */
        .br-stats{background:var(--br-bg2);border-top:1px solid var(--br-border);border-bottom:1px solid var(--br-border);padding:32px 24px;}
        .br-stats-g{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:1100px;margin:0 auto;}
        @media(min-width:600px){.br-stats-g{grid-template-columns:repeat(4,1fr);}}
        .br-stat{text-align:center;}
        .br-stat-n{font-family:var(--br-font2);font-size:clamp(26px,4vw,40px);font-weight:800;background:var(--br-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:4px;}
        .br-stat-l{font-size:13px;color:var(--br-slate);font-weight:500;}

        /* ── 3-col grid ── */
        .br-g3{display:grid;grid-template-columns:1fr;gap:20px;}
        @media(min-width:680px){.br-g3{grid-template-columns:repeat(3,1fr);}}
        /* ── 2-col grid ── */
        .br-g2{display:grid;grid-template-columns:1fr;gap:20px;}
        @media(min-width:600px){.br-g2{grid-template-columns:repeat(2,1fr);}}
        /* ── 3-col grid for why ── */
        .br-g-why{display:grid;grid-template-columns:1fr;gap:18px;}
        @media(min-width:580px){.br-g-why{grid-template-columns:repeat(2,1fr);}}
        @media(min-width:900px){.br-g-why{grid-template-columns:repeat(3,1fr);}}
        /* ── products 3-col ── */
        .br-gp{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
        @media(min-width:680px){.br-gp{grid-template-columns:repeat(3,1fr);}}

        /* ── Cards ── */
        .br-card{background:var(--br-bg2);border:1px solid var(--br-border);border-radius:var(--br-r);padding:24px 22px;transition:border-color .25s,transform .25s;}
        .br-card:hover{border-color:rgba(59,130,246,.3);transform:translateY(-3px);}
        .br-card-icon{width:42px;height:42px;border-radius:10px;background:rgba(59,130,246,.12);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px;}
        .br-card h3{font-family:var(--br-font2);font-size:15px;font-weight:700;margin-bottom:8px;}
        .br-card p{font-size:13.5px;color:var(--br-slate);line-height:1.65;}
        .br-stag{display:inline-block;margin-top:12px;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:600;background:rgba(59,130,246,.12);color:var(--br-blue);border:1px solid rgba(59,130,246,.2);}

        /* ── Services dark bg ── */
        .br-svc-bg{background:var(--br-bg2);}
        .br-svc-card{position:relative;overflow:hidden;}
        .br-svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--br-grad);opacity:0;transition:opacity .25s;}
        .br-svc-card:hover::before{opacity:1;}

        /* ── Product card ── */
        .br-prod{background:var(--br-bg2);border:1px solid var(--br-border);border-radius:var(--br-r);padding:20px 18px;text-align:center;transition:border-color .25s,transform .2s;}
        .br-prod:hover{border-color:rgba(6,182,212,.35);transform:translateY(-3px);}
        .br-prod-em{font-size:26px;margin-bottom:8px;}
        .br-prod-n{font-size:13.5px;font-weight:700;margin-bottom:5px;}
        .br-prod-d{font-size:12px;color:var(--br-slate);line-height:1.55;}

        /* ── Why card ── */
        .br-why{display:flex;gap:13px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid var(--br-border);border-radius:var(--br-r);padding:20px;}
        .br-why:hover{border-color:rgba(59,130,246,.3);}
        .br-why-n{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:var(--br-grad);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;margin-top:2px;}
        .br-why-t h3{font-size:14.5px;font-weight:700;margin-bottom:5px;}
        .br-why-t p{font-size:13px;color:var(--br-slate);line-height:1.6;}

        /* ── Coverage ── */
        .br-cov{background:var(--br-bg2);border:1px solid var(--br-border);border-radius:var(--br-r);padding:26px;}
        .br-cov-flag{font-size:30px;margin-bottom:10px;}
        .br-cov h3{font-family:var(--br-font2);font-size:17px;font-weight:800;margin-bottom:7px;}
        .br-cov p{font-size:13.5px;color:var(--br-slate);margin-bottom:14px;line-height:1.65;}
        .br-cities{display:flex;flex-wrap:wrap;gap:7px;}
        .br-city{padding:3px 11px;border-radius:99px;background:rgba(255,255,255,.05);border:1px solid var(--br-border);font-size:11.5px;color:var(--br-slate);font-weight:500;}

        /* ── Contact ── */
        .br-ctc-bg{background:linear-gradient(135deg,var(--br-bg2),#0f1a2e);border-top:1px solid var(--br-border);}
        .br-ctc-g{display:grid;grid-template-columns:1fr;gap:32px;}
        @media(min-width:700px){.br-ctc-g{grid-template-columns:1fr 1fr;}}
        .br-ctc-item{display:flex;align-items:center;gap:12px;padding:13px 16px;background:rgba(255,255,255,.04);border:1px solid var(--br-border);border-radius:var(--br-r);text-decoration:none;color:var(--br-white);transition:border-color .2s,background .2s;margin-bottom:12px;}
        .br-ctc-item:hover{border-color:rgba(59,130,246,.4);background:rgba(59,130,246,.08);}
        .br-ci-icon{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
        .br-ci-g{background:rgba(16,185,129,.15);}
        .br-ci-b{background:rgba(59,130,246,.15);}
        .br-ci-p{background:rgba(139,92,246,.15);}
        .br-ci-txt strong{display:block;font-size:13.5px;font-weight:700;margin-bottom:2px;}
        .br-ci-txt span{font-size:12.5px;color:var(--br-slate);}
        .br-qr{background:#fff;border-radius:var(--br-r);padding:18px;text-align:center;max-width:200px;}
        .br-qr img{width:150px;height:150px;display:block;margin:0 auto 8px;}
        .br-qr p{font-size:11.5px;color:#334155;font-weight:600;}

        /* ── Footer ── */
        .br-footer{background:var(--br-bg);border-top:1px solid var(--br-border);padding:24px;}
        .br-footer-in{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;}
        .br-flogo{font-family:var(--br-font2);font-size:15px;font-weight:700;color:var(--br-white);}
        .br-flogo span{background:var(--br-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .br-fcopy{font-size:12px;color:var(--br-slate2);}
        .br-flink{font-size:12.5px;color:var(--br-blue);text-decoration:none;font-weight:500;}
        .br-flink:hover{text-decoration:underline;}

        @media(max-width:480px){.br-sec{padding:48px 16px;}.br-sec-full{padding:48px 16px;}.br-hero{padding:64px 16px 44px;}}
        @media print{.br-nav,.br-pdf,.br-back{display:none!important;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
      `}</style>

      <div className="br-wrap">

        {/* NAV */}
        <nav className="br-nav">
          <a href="https://amephia.com" className="br-logo">Ame<span>Phia</span></a>
          <div className="br-controls">
            <a href="/" className="br-back">← <span className="br-s-es">Inicio</span><span className="br-s-en">Home</span></a>
            <button className="br-lbtn br-active" id="br-btn-es">🇪🇨 ES</button>
            <button className="br-lbtn" id="br-btn-en">🇺🇸 EN</button>
            <button className="br-pdf" onClick={() => window.print()}>
              ⬇ <span className="br-s-es">Descargar PDF</span><span className="br-s-en">Download PDF</span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="br-hero">
          <div className="br-hero-bg" />
          <div className="br-grid-bg" />
          <div className="br-hero-inner">
            <div className="br-badge">⭐ 4.9 / 5 · 150+ <span className="br-s-es">Clientes</span><span className="br-s-en">Clients</span> &nbsp;·&nbsp; 10+ <span className="br-s-es">años</span><span className="br-s-en">years</span></div>
            <h1 className="br-h1">
              <span className="br-es">Construimos el<br /><span className="br-grad">Futuro Digital</span><br />de tu Empresa</span>
              <span className="br-en">Engineering the<br /><span className="br-grad">Digital Future</span><br />of Your Business</span>
            </h1>
            <p className="br-hero-sub">
              <span className="br-es">Empresa confiable de ingeniería de software en California, Newark NJ (EE.UU.) y Ecuador. Precios conscientes, código 100% tuyo, buen trabajo garantizado.</span>
              <span className="br-en">Trusted software engineering company in California, Newark NJ (USA) &amp; Ecuador. Fair pricing, 100% code ownership, quality work guaranteed.</span>
            </p>
            <div className="br-actions">
              <a href="https://wa.me/13347324056" className="br-btn-p" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              <a href="https://amephia.com" className="br-btn-s" target="_blank" rel="noopener noreferrer">🌐 amephia.com</a>
              <a href="mailto:info@amephia.com" className="br-btn-s">✉️ info@amephia.com</a>
            </div>
            <div className="br-locs">
              <div className="br-loc">🇺🇸 California</div>
              <div className="br-loc">🇺🇸 Newark, NJ</div>
              <div className="br-loc">🇪🇨 Quito</div>
              <div className="br-loc">🇪🇨 Guayaquil</div>
              <div className="br-loc">🌎 <span className="br-s-es">Todo Ecuador</span><span className="br-s-en">All Ecuador</span></div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="br-stats">
          <div className="br-stats-g">
            <div className="br-stat"><div className="br-stat-n">150+</div><div className="br-stat-l"><span className="br-s-es">Clientes en Producción</span><span className="br-s-en">Production Clients</span></div></div>
            <div className="br-stat"><div className="br-stat-n">10+</div><div className="br-stat-l"><span className="br-s-es">Años de Experiencia</span><span className="br-s-en">Years of Experience</span></div></div>
            <div className="br-stat"><div className="br-stat-n">99.9%</div><div className="br-stat-l"><span className="br-s-es">Disponibilidad Cloud</span><span className="br-s-en">Cloud Uptime SLA</span></div></div>
            <div className="br-stat"><div className="br-stat-n">100K+</div><div className="br-stat-l"><span className="br-s-es">Transacciones Procesadas</span><span className="br-s-en">Transactions Processed</span></div></div>
          </div>
        </div>
        <div className="br-divider" />

        {/* ABOUT */}
        <section className="br-sec">
          <div className="br-chip">🏢 <span className="br-s-es">Quiénes Somos</span><span className="br-s-en">About Us</span></div>
          <h2 className="br-h2"><span className="br-es">Ingeniería de <span className="br-grad">Alto Estándar</span>, Precios Conscientes</span><span className="br-en">Elite Engineering, <span className="br-grad">Fair & Transparent</span> Pricing</span></h2>
          <p className="br-sub"><span className="br-es">AmePhia Systems Inc. es una firma de ingeniería de software con más de una década de trayectoria. Somos directos, transparentes, y entregamos código que escala.</span><span className="br-en">AmePhia Systems Inc. is a software engineering firm with over a decade of experience. We are direct, transparent, and deliver code that scales.</span></p>
          <div className="br-g3">
            {[
              { icon: '🎯', es: 'Misión', en: 'Mission', des: 'Acelerar el crecimiento de nuestros clientes construyendo software de alto rendimiento, con precios justos y entregas a tiempo.', deen: 'Accelerate our clients\' growth by building high-performance software with fair pricing and on-time delivery.' },
              { icon: '🔭', es: 'Visión', en: 'Vision', des: 'Ser la empresa de software de referencia para negocios en EE.UU. y Ecuador que buscan tecnología de primer nivel.', deen: 'Become the go-to software company for US and Ecuador businesses seeking top-tier technology without intermediaries.' },
              { icon: '💎', es: 'Valores', en: 'Values', des: 'Confianza · Transparencia · Excelencia técnica · Código limpio · Compromiso con el cliente · Integridad.', deen: 'Trust · Transparency · Technical excellence · Clean code · Client commitment · Integrity.' },
            ].map(item => (
              <div key={item.es} className="br-card">
                <div className="br-card-icon">{item.icon}</div>
                <h3><span className="br-s-es">{item.es}</span><span className="br-s-en">{item.en}</span></h3>
                <p><span className="br-es">{item.des}</span><span className="br-en">{item.deen}</span></p>
              </div>
            ))}
          </div>
        </section>
        <div className="br-divider" />

        {/* SERVICES */}
        <section className="br-sec-full br-svc-bg">
          <div className="br-inner">
            <div className="br-chip">🛠️ <span className="br-s-es">Servicios</span><span className="br-s-en">Services</span></div>
            <h2 className="br-h2"><span className="br-es">Lo que <span className="br-grad">Construimos</span> para Ti</span><span className="br-en">What We <span className="br-grad">Build</span> for You</span></h2>
            <p className="br-sub"><span className="br-es">Cada proyecto se desarrolla con ingenieros senior directamente — sin intermediarios, sin sorpresas.</span><span className="br-en">Every project is developed with senior engineers directly — no intermediaries, no surprises.</span></p>
            <div className="br-g2">
              {[
                { icon: '🌐', es: 'Sistemas Web a Medida / ERPs', en: 'Custom Web Systems / ERPs', des: 'ERPs, CRMs, SaaS multi-tenant, apps móviles. Stack moderno: React, TypeScript, Node.js, PostgreSQL, AWS.', deen: 'ERPs, CRMs, multi-tenant SaaS, mobile apps. Modern stack: React, TypeScript, Node.js, PostgreSQL, AWS.', tag: 'Custom development' },
                { icon: '🚀', es: 'Modernización Web + SEO Orgánico', en: 'Website Modernization + Organic SEO', des: 'Sitios lentos a plataformas de alta conversión: carga <1s, diseño moderno, SEO para posicionar en Google.', deen: 'Slow sites to high-conversion platforms: sub-1s load, modern design, SEO architecture to rank on Google.', tag: 'SEO + Performance' },
                { icon: '⭐', es: 'Review Shield — Embudo de Reseñas Google', en: 'Review Shield — Google Business Review Funnel', des: '4–5⭐ van a Google Business; 1–3⭐ a gestión interna. Protege y construye tu reputación pública automáticamente.', deen: '4–5⭐ go to Google Business; 1–3⭐ to internal management. Protect and build your public reputation automatically.', tag: 'Google Business' },
                { icon: '🇺🇸', es: 'Nearshore Engineering para EE.UU.', en: 'Nearshore Engineering for USA', des: 'Equipo senior para empresas en CA, NJ y todo EE.UU. Contratos bajo ley de California, coincidencia horaria PST/EST/CST.', deen: 'Senior team for CA, NJ and all USA. Contracts under California law, full PST/EST/CST timezone overlap.', tag: 'US Contracts · Nearshore' },
              ].map(s => (
                <div key={s.es} className="br-card br-svc-card">
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <h3><span className="br-s-es">{s.es}</span><span className="br-s-en">{s.en}</span></h3>
                  <p><span className="br-es">{s.des}</span><span className="br-en">{s.deen}</span></p>
                  <span className="br-stag">{s.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="br-divider" />

        {/* PRODUCTS */}
        <section className="br-sec">
          <div className="br-chip">📦 <span className="br-s-es">Productos Propietarios</span><span className="br-s-en">Proprietary Products</span></div>
          <h2 className="br-h2"><span className="br-es">Suite de <span className="br-grad">Soluciones</span> Empresariales</span><span className="br-en">Enterprise <span className="br-grad">Solutions</span> Suite</span></h2>
          <p className="br-sub"><span className="br-es">9 productos propietarios construidos y probados en producción con clientes reales.</span><span className="br-en">9 proprietary products built and battle-tested in production with real clients.</span></p>
          <div className="br-gp">
            {[
              { em: '🧾', name: 'Facturón SRI', es: 'Facturación electrónica SRI 100% compatible. Facturas, retenciones, guías, firma XAdES-BES, API REST.', en: '100% SRI-compliant electronic invoicing. Invoices, withholdings, guides, XAdES-BES signature, REST API.' },
              { em: '📊', name: 'ContAme', es: 'Contabilidad NIIF en la nube. Multi-empresa, nómina, conciliación bancaria, reportes financieros.', en: 'Cloud NIIF/IFRS accounting. Multi-company, payroll, bank reconciliation, automatic financial reports.' },
              { em: '🎓', name: 'AmePhia EDU', es: 'Sistema escolar MinEduc 2025. LOEI, LMS nativo, portal de padres PWA, conciliación bancaria.', en: 'MinEduc 2025 school system. LOEI, native LMS, PWA parent portal, integrated bank reconciliation.' },
              { em: '🛡️', name: 'ShieldData', es: 'Cumplimiento LOPDP Ecuador con IA. RAT automático, derechos ARCO, notificación SPDP, firma PAdES.', en: 'Ecuador LOPDP compliance with AI. Automatic RAT, ARCO rights, SPDP notification, PAdES signature.' },
              { em: '💪', name: 'AmePhia GYM', es: 'ERP para gimnasios. Membresías, facturación SRI, POS, inventario, contabilidad NIIF.', en: 'Gym ERP. Memberships, SRI invoicing, POS, inventory, NIIF accounting, attendance tracking.' },
              { em: '🛒', name: 'AmePhia STORE', es: 'Ecommerce SaaS multi-tenant. Pagos Nuvei/PayPhone/Kushki, inventario Kardex, facturación SRI.', en: 'Multi-tenant SaaS ecommerce. Nuvei/PayPhone/Kushki payments, Kardex inventory, SRI invoicing.' },
              { em: '🔒', name: 'Broker Seguro', es: 'Software para corredores de seguros. Pólizas, vencimientos, renovaciones, comisiones, portal.', en: 'Insurance broker software. Policies, renewals, commissions, claims, client portal.' },
              { em: '🏥', name: 'AmePhia POS', es: 'Punto de venta rápido con facturación instantánea, devoluciones e impresoras térmicas.', en: 'Fast POS with instant invoicing, returns, barcode scanner, and thermal printer support.' },
              { em: '✈️', name: 'Migralia', es: 'Plataforma SaaS para facilitadores migratorios. Casos, clientes, documentos, pagos.', en: 'SaaS platform for immigration consultants. Cases, clients, documents, payments, client portal.' },
            ].map(p => (
              <div key={p.name} className="br-prod br-card">
                <div className="br-prod-em">{p.em}</div>
                <div className="br-prod-n">{p.name}</div>
                <div className="br-prod-d"><span className="br-es">{p.es}</span><span className="br-en">{p.en}</span></div>
              </div>
            ))}
          </div>
        </section>
        <div className="br-divider" />

        {/* WHY */}
        <section className="br-sec-full" style={{ background: 'linear-gradient(135deg,rgba(59,130,246,.05) 0%,rgba(139,92,246,.05) 100%)' }}>
          <div className="br-inner">
            <div className="br-chip">✅ <span className="br-s-es">¿Por Qué AmePhia?</span><span className="br-s-en">Why AmePhia?</span></div>
            <h2 className="br-h2"><span className="br-es">6 Razones para <span className="br-grad">Elegirnos</span></span><span className="br-en">6 Reasons to <span className="br-grad">Choose Us</span></span></h2>
            <p className="br-sub"><span className="br-es">No somos una agencia genérica. Somos ingenieros senior que resuelven problemas reales.</span><span className="br-en">We are not a generic agency. We are senior engineers who solve real problems.</span></p>
            <div className="br-g-why">
              {[
                { n: 1, es: 'Empresa Confiable y Seria', en: 'Reliable & Trustworthy Company', des: '10+ años de trayectoria comprobada. Contratos formales, entregas a tiempo y soporte continuo.', deen: '10+ years of proven track record. Formal contracts, on-time delivery, and continuous support.' },
                { n: 2, es: 'Precios Conscientes y Transparentes', en: 'Fair & Transparent Pricing', des: 'Sin sobreprecios ni costos ocultos. Tarifas justas ajustadas al alcance real del proyecto.', deen: 'No markup or hidden costs. Fair rates adjusted to your real project scope.' },
                { n: 3, es: 'Código 100% Tuyo', en: '100% Your Code', des: 'Todo el código fuente es propiedad exclusiva del cliente desde el primer día. Sin vendor lock-in.', deen: 'All source code is exclusively owned by the client from day one. Zero vendor lock-in.' },
                { n: 4, es: 'Ingenieros Senior Directo', en: 'Direct Senior Engineers', des: 'Hablas directamente con los ingenieros que construyen tu producto. Sin intermediarios.', deen: 'You speak directly with the engineers building your product. No intermediaries.' },
                { n: 5, es: 'Bilingüe: EE.UU. + Ecuador', en: 'Bilingual: USA + Ecuador', des: 'Contratos bajo ley de EE.UU. (W-9/W-8, ACH) y Ecuador (SRI/LOPDP). Coincidencia horaria total.', deen: 'Contracts under US law (W-9/W-8, ACH) and Ecuador (SRI/LOPDP). Full timezone overlap.' },
                { n: 6, es: 'Stack Moderno de Alto Rendimiento', en: 'Modern High-Performance Stack', des: 'React, TypeScript, Node.js, PostgreSQL, AWS Cloud. 99.9% uptime, carga <1s, arquitectura escalable.', deen: 'React, TypeScript, Node.js, PostgreSQL, AWS Cloud. 99.9% uptime, sub-1s load, scalable architecture.' },
              ].map(w => (
                <div key={w.n} className="br-why br-card">
                  <div className="br-why-n">{w.n}</div>
                  <div className="br-why-t">
                    <h3><span className="br-s-es">{w.es}</span><span className="br-s-en">{w.en}</span></h3>
                    <p><span className="br-es">{w.des}</span><span className="br-en">{w.deen}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="br-divider" />

        {/* COVERAGE */}
        <section className="br-sec">
          <div className="br-chip">🌎 <span className="br-s-es">Cobertura</span><span className="br-s-en">Coverage</span></div>
          <h2 className="br-h2"><span className="br-es">Presencia <span className="br-grad">Internacional</span></span><span className="br-en"><span className="br-grad">International</span> Presence</span></h2>
          <p className="br-sub"><span className="br-es">Equipos en dos países para servir a clientes en todo Estados Unidos y Ecuador.</span><span className="br-en">Teams in two countries to serve clients across the United States and Ecuador.</span></p>
          <div className="br-g2">
            <div className="br-cov br-card">
              <div className="br-cov-flag">🇺🇸</div>
              <h3>United States</h3>
              <p><span className="br-es">Contratos bajo legislación estadounidense (W-9/W-8, ACH/Wire). Coincidencia horaria PST · EST · CST.</span><span className="br-en">Contracts under US law (W-9/W-8, ACH/Wire). Full PST · EST · CST timezone overlap.</span></p>
              <div className="br-cities">
                {['📍 California', '📍 Los Angeles', '📍 Newark, NJ', '📍 Nationwide'].map(c => <span key={c} className="br-city">{c}</span>)}
              </div>
            </div>
            <div className="br-cov br-card">
              <div className="br-cov-flag">🇪🇨</div>
              <h3>Ecuador</h3>
              <p><span className="br-es">Centro de ingeniería con cumplimiento SRI, LOPDP, NIIF/IFRS y MinEduc.</span><span className="br-en">Engineering hub with SRI, LOPDP, NIIF/IFRS and MinEduc compliance.</span></p>
              <div className="br-cities">
                {['📍 Quito', '📍 Guayaquil', '📍 Cuenca', '📍 Ambato', '📍 Manta', '📍 Loja', '📍 Todo Ecuador'].map(c => <span key={c} className="br-city">{c}</span>)}
              </div>
            </div>
          </div>
        </section>
        <div className="br-divider" />

        {/* CONTACT */}
        <section className="br-sec-full br-ctc-bg">
          <div className="br-inner">
            <div className="br-ctc-g">
              <div>
                <div className="br-chip">📞 <span className="br-s-es">Contáctanos</span><span className="br-s-en">Contact Us</span></div>
                <h2 className="br-h2"><span className="br-es">¿Listo para <span className="br-grad">empezar</span>?</span><span className="br-en">Ready to <span className="br-grad">start</span>?</span></h2>
                <p className="br-sub" style={{ marginBottom: 20 }}><span className="br-es">Primera consulta sin costo. Respondemos en menos de 2 horas en horario laboral.</span><span className="br-en">Free first consultation. We respond in under 2 hours during business hours.</span></p>
                <a href="https://wa.me/13347324056" className="br-ctc-item" target="_blank" rel="noopener noreferrer"><div className="br-ci-icon br-ci-g">💬</div><div className="br-ci-txt"><strong>WhatsApp</strong><span>+1 (334) 732-4056</span></div></a>
                <a href="mailto:info@amephia.com" className="br-ctc-item"><div className="br-ci-icon br-ci-b">✉️</div><div className="br-ci-txt"><strong>Email</strong><span>info@amephia.com</span></div></a>
                <a href="https://amephia.com" className="br-ctc-item" target="_blank" rel="noopener noreferrer"><div className="br-ci-icon br-ci-p">🌐</div><div className="br-ci-txt"><strong>Website</strong><span>amephia.com</span></div></a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div className="br-qr">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://amephia.com&color=060B16&bgcolor=ffffff&margin=8" alt="QR amephia.com" width="150" height="150" loading="lazy" />
                  <p>amephia.com</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--br-slate)', marginBottom: 4 }}>⭐ <span className="br-s-es">Calificación promedio</span><span className="br-s-en">Average rating</span></div>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--br-font2)', background: 'var(--br-grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>4.9 / 5</div>
                  <div style={{ fontSize: 12, color: 'var(--br-slate2)' }}>150+ <span className="br-s-es">clientes verificados</span><span className="br-s-en">verified clients</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="br-footer">
          <div className="br-footer-in">
            <div className="br-flogo">Ame<span>Phia</span> Systems Inc.</div>
            <div className="br-fcopy">© 2026 AmePhia Systems Inc. · California, USA · Ecuador</div>
            <a href="https://amephia.com" className="br-flink" target="_blank" rel="noopener noreferrer">amephia.com →</a>
          </div>
        </footer>

      </div>
    </>
  );
}
