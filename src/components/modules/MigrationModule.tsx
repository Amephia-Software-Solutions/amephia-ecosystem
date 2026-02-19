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
      className="col-span-1 md:col-span-8 min-h-[320px] group"
      delay={0.2}
      onClick={() => onOpenProject?.('migration')}
    >
      <div className="relative w-full h-full flex items-center justify-center py-8">
        {/* Multi-tenant visualization */}
        <div className="relative w-full max-w-md">
          {/* Main platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="text-center mb-6">
              <div className="text-emerald-400 text-sm font-mono mb-1">AMEPHIA MIGRATION</div>
              <div className="text-white/60 text-xs">Multi-Tenant Platform</div>
            </div>

            {/* Tenants Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((tenant, index) => (
                <motion.div
                  key={tenant}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-slate-800/50 border border-emerald-500/10 rounded-lg p-3 hover:border-emerald-500/40 transition-all cursor-pointer group-hover:border-emerald-500/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 border border-emerald-400/30 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-white/80 font-medium truncate">Tenant {tenant}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-white/40">Cases</span>
                      <span className="text-emerald-400 font-mono">{12 + tenant * 8}</span>
                    </div>
                    <div className="flex justify-between text-[9px]">
                      <span className="text-white/40">Active</span>
                      <span className="text-blue-400 font-mono">{5 + tenant * 2}</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      ></motion.div>
                      <span className="text-[8px] text-emerald-400">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center"
            >
              <div>
                <div className="text-emerald-400 font-mono text-lg font-bold">1.2K+</div>
                <div className="text-white/40 text-[10px]">Cases</div>
              </div>
              <div>
                <div className="text-blue-400 font-mono text-lg font-bold">98%</div>
                <div className="text-white/40 text-[10px]">Uptime</div>
              </div>
              <div>
                <div className="text-purple-400 font-mono text-lg font-bold">24/7</div>
                <div className="text-white/40 text-[10px]">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-emerald-500/20 border border-emerald-400/40 rounded-lg px-3 py-1.5 backdrop-blur-sm"
          >
            <div className="text-emerald-400 text-xs font-mono">SaaS</div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-2 -left-4 bg-blue-500/20 border border-blue-400/40 rounded-lg px-3 py-1.5 backdrop-blur-sm"
          >
            <div className="text-blue-400 text-xs font-mono">Multi-Tenant</div>
          </motion.div>
        </div>
      </div>
    </ModuleCard>
  );
};
