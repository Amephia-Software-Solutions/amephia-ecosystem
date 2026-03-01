import React from 'react';
import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface BrokerSeguroModuleProps {
  onOpenProject?: (projectId: ProjectId) => void;
}

export const BrokerSeguroModule: React.FC<BrokerSeguroModuleProps> = ({ onOpenProject }) => {
  return (
    <ModuleCard
      title="BROKER SEGURO"
      subtitle="Policies / Claims / Portal"
      delay={0.25}
      onClick={() => onOpenProject?.('broker-seguro')}
    >
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-500/8 to-violet-500/8 border border-indigo-500/15 rounded-lg p-3"
        >
          {/* Mini dashboard grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: '👥', label: 'Clients', value: '1.2K', color: 'text-blue-400' },
              { icon: '📋', label: 'Policies', value: '3.8K', color: 'text-emerald-400' },
              { icon: '📝', label: 'Claims', value: '156', color: 'text-amber-400' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="bg-slate-800/40 border border-indigo-500/10 rounded p-1.5 text-center"
              >
                <div className="text-[10px] mb-0.5">{item.icon}</div>
                <div className={`text-[9px] font-mono font-bold ${item.color}`}>{item.value}</div>
                <div className="text-[7px] text-white/30">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Mini bar chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2 pt-2 border-t border-white/5"
          >
            <div className="flex items-end gap-0.5 h-8">
              {[35, 52, 45, 68, 60, 75, 70, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-indigo-600/50 to-indigo-400/70"
                />
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-2 pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center"
          >
            <div>
              <div className="text-indigo-400 font-mono text-xs font-bold">96</div>
              <div className="text-white/30 text-[7px]">APIs</div>
            </div>
            <div>
              <div className="text-violet-400 font-mono text-xs font-bold">4</div>
              <div className="text-white/30 text-[7px]">Roles</div>
            </div>
            <div>
              <div className="text-emerald-400 font-mono text-xs font-bold">12</div>
              <div className="text-white/30 text-[7px]">Modules</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 -right-1 bg-indigo-500/15 border border-indigo-400/30 rounded px-1.5 py-0.5"
        >
          <span className="text-indigo-400 text-[8px] font-mono">SaaS</span>
        </motion.div>
      </div>
    </ModuleCard>
  );
};
