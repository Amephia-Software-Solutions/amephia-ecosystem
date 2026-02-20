import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface GymModuleProps {
    onOpenProject?: (projectId: ProjectId) => void;
}

export const GymModule = ({ onOpenProject }: GymModuleProps) => {
    const members = [
        { name: 'Carlos M.', plan: 'PRO', status: 'active' as const },
        { name: 'María L.', plan: 'BASIC', status: 'active' as const },
        { name: 'Ana S.', plan: 'ELITE', status: 'expiring' as const },
        { name: 'Luis P.', plan: 'PRO', status: 'active' as const },
    ];

    return (
        <ModuleCard
            title="AMEPHIA GYM"
            subtitle="ERP / Memberships / SRI"
            delay={0.05}
            onClick={() => onOpenProject?.('gym')}
        >
            <div className="w-full space-y-3">
                {/* KPIs */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { label: 'MEMBERS', value: '312', color: 'text-accentGym' },
                        { label: 'CHECK-INS', value: '47', color: 'text-green-400' },
                        { label: 'MRR', value: '$18K', color: 'text-primary' },
                    ].map((kpi, i) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                            className="text-center"
                        >
                            <div className={`font-mono text-sm font-bold ${kpi.color}`}>{kpi.value}</div>
                            <div className="text-[8px] text-mutedText/50 tracking-wider">{kpi.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Heartbeat */}
                <div className="relative h-6 overflow-hidden">
                    <motion.svg
                        className="absolute inset-0 w-[200%] h-full"
                        viewBox="0 0 400 24"
                        preserveAspectRatio="none"
                        animate={{ x: [0, -200] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                        <path
                            d="M0,12 L30,12 L40,3 L50,21 L60,12 L100,12 L110,6 L115,18 L120,12 L200,12 L230,12 L240,3 L250,21 L260,12 L300,12 L310,6 L315,18 L320,12 L400,12"
                            fill="none"
                            stroke="rgba(204,85,0,0.35)"
                            strokeWidth="1"
                        />
                    </motion.svg>
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-surface to-transparent" />
                </div>

                {/* Member feed */}
                <div className="space-y-1">
                    {members.map((m, i) => (
                        <motion.div
                            key={m.name}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                            className="flex items-center justify-between text-[9px] font-mono py-0.5 px-1.5 rounded bg-white/[0.02]"
                        >
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1 h-1 rounded-full ${m.status === 'active' ? 'bg-green-400' : 'bg-amber-400'}`} />
                                <span className="text-white/60">{m.name}</span>
                            </div>
                            <span className={`px-1 py-px rounded text-[7px] font-bold ${
                                m.plan === 'ELITE' ? 'bg-accentGym/20 text-accentGym'
                                : m.plan === 'PRO' ? 'bg-primary/15 text-primary'
                                : 'bg-white/5 text-mutedText/50'
                            }`}>{m.plan}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModuleCard>
    );
};
