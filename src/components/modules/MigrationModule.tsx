import React from 'react';
import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface MigrationModuleProps {
  onOpenProject?: (projectId: ProjectId) => void;
}

export const MigrationModule: React.FC<MigrationModuleProps> = ({ onOpenProject }) => {
  return (
    <ModuleCard
      title="MIGRATION SaaS"
      subtitle="Cases / Clients / Payments"
      delay={0.2}
      onClick={() => onOpenProject?.('migration')}
    >
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-gradient-to-br from-emerald-500/8 to-blue-500/8 border border-emerald-500/15 rounded-lg p-3"
        >
          {/* Tenants 2x3 */}
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                className="bg-slate-800/40 border border-emerald-500/10 rounded p-1.5 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 rounded-full bg-emerald-400"
                  />
                  <span className="text-[8px] text-white/60 font-mono">T{t}</span>
                </div>
                <div className="text-[8px] text-emerald-400 font-mono font-bold">{12 + t * 8}</div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center"
          >
            <div>
              <div className="text-emerald-400 font-mono text-xs font-bold">1.2K</div>
              <div className="text-white/30 text-[7px]">Cases</div>
            </div>
            <div>
              <div className="text-blue-400 font-mono text-xs font-bold">98%</div>
              <div className="text-white/30 text-[7px]">Uptime</div>
            </div>
            <div>
              <div className="text-purple-400 font-mono text-xs font-bold">24/7</div>
              <div className="text-white/30 text-[7px]">Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 -right-1 bg-emerald-500/15 border border-emerald-400/30 rounded px-1.5 py-0.5"
        >
          <span className="text-emerald-400 text-[8px] font-mono">SaaS</span>
        </motion.div>
      </div>
    </ModuleCard>
  );
};
