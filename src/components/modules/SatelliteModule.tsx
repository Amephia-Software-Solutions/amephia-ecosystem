import React from 'react';
import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface SatelliteModuleProps {
    title: string;
    type: 'pos' | 'nutri';
    delay?: number;
    onOpenProject?: (projectId: ProjectId) => void;
}

export const SatelliteModule: React.FC<SatelliteModuleProps> = ({ title, type, delay = 0, onOpenProject }) => {
    return (
        <ModuleCard
            title={title}
            subtitle={type === 'pos' ? "Sales / Inventory" : "Meal Plans / Macros"}
            className=""
            delay={delay}
            onClick={() => onOpenProject?.(type)}
        >
            <div className="w-full flex justify-center items-center">
                {type === 'pos' ? (
                    <div className="flex gap-1.5 items-end h-16">
                        {[40, 75, 30, 95, 50, 65, 45, 80].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: delay + i * 0.1, ease: 'easeOut' }}
                                className="w-2 bg-white/10 hover:bg-primary/80 transition-colors duration-300 rounded-t-sm"
                            ></motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="44" fill="none" stroke="#333" strokeWidth="3" />
                            <motion.circle
                                cx="48" cy="48" r="44"
                                fill="none"
                                stroke="#8fa876"
                                strokeWidth="3"
                                strokeDasharray="276"
                                initial={{ strokeDashoffset: 276 }}
                                animate={{ strokeDashoffset: 276 * 0.2 }}
                                transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-xl font-sans font-bold text-white">80%</span>
                            <span className="text-[8px] text-accentNutri uppercase tracking-wider">Adherence</span>
                        </div>
                    </div>
                )}
            </div>
        </ModuleCard>
    );
};
