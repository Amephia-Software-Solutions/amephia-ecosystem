import { Dumbbell, ArrowRight } from 'lucide-react';
import type { ProjectId } from '../projects';

interface Props {
  onOpenProject: (id: ProjectId) => void;
}

const screenshots = [
  { src: '/assets/screenshots/dashboard.png', label: 'Dashboard Ejecutivo' },
  { src: '/assets/screenshots/pos.png', label: 'Punto de Venta' },
  { src: '/assets/screenshots/member-profile.png', label: 'Perfil de Miembro' },
  { src: '/assets/screenshots/products.png', label: 'Inventario' },
];

export const GymShowcaseSection = ({ onOpenProject }: Props) => (
  <section className="mt-28">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell className="w-5 h-5 text-accentGym" />
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-accentGym font-mono">
            Producto Destacado
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          AMEPHIA <span className="text-primary">GYM</span>
        </h2>
        <p className="text-mutedText text-sm mt-1 max-w-lg">
          ERP completo para gimnasios: membresías, facturación SRI, POS, inventario, contabilidad NIIF y reportes. Desde <span className="text-white font-semibold">$29/mes</span>.
        </p>
      </div>
      <button
        onClick={() => onOpenProject('gym')}
        className="group flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shrink-0"
      >
        Ver Landing Completa
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    {/* Main screenshot */}
    <div className="relative group mb-4">
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-accentGym/15 to-primary/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <button
        onClick={() => onOpenProject('gym')}
        className="relative block w-full overflow-hidden rounded-xl border border-borderC/60 hover:border-primary/30 transition-all"
      >
        <img
          src="/assets/screenshots/dashboard.png"
          alt="AMEPHIA GYM - Dashboard"
          className="w-full transition-transform duration-500 group-hover:scale-[1.01]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
          <span className="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-lg flex items-center gap-2">
            Explorar AMEPHIA GYM <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </button>
    </div>

    {/* 4-column grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {screenshots.map((s, i) => (
        <button
          key={i}
          onClick={() => onOpenProject('gym')}
          className="group relative overflow-hidden rounded-lg border border-borderC/40 hover:border-primary/30 transition-all"
        >
          <img
            src={s.src}
            alt={`AMEPHIA GYM - ${s.label}`}
            className="w-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
            <span className="text-[10px] font-semibold text-white/80">{s.label}</span>
          </div>
        </button>
      ))}
    </div>

    {/* Feature pills */}
    <div className="flex flex-wrap gap-2 mt-5">
      {['Membresías', 'Facturación SRI', 'POS', 'Inventario', 'Contabilidad NIIF', 'Caja', 'Reportes', '4 Roles'].map(
        (tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono font-semibold uppercase tracking-wider text-mutedText/60 bg-white/[0.03] border border-borderC/40 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        )
      )}
    </div>
  </section>
);
