import { ModuleCard } from './ModuleCard';
import { motion } from 'framer-motion';
import type { ProjectId } from '../../projects';

interface EcommerceModuleProps {
    onOpenProject?: (projectId: ProjectId) => void;
}

export const EcommerceModule = ({ onOpenProject }: EcommerceModuleProps) => {
    return (
        <ModuleCard
            title="ECOMMERCE"
            subtitle="Tienda Online SaaS"
            className=""
            delay={0.15}
            onClick={() => onOpenProject?.('ecommerce')}
        >
            <div className="relative w-full h-28 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-700">
                {/* Mini product grid */}
                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                            className="w-14 h-14 rounded-lg border border-white/5 bg-white/[0.03] flex flex-col items-center justify-center gap-1 overflow-hidden"
                        >
                            <div className="w-8 h-6 rounded bg-gradient-to-br from-primary/20 to-primary/5" />
                            <div className="w-6 h-[3px] rounded-full bg-white/10" />
                            <div className="w-4 h-[3px] rounded-full bg-primary/30" />
                        </motion.div>
                    ))}
                </div>

                {/* Cart bar */}
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex items-center justify-between max-w-[180px] w-full px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
                >
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 5h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                        </svg>
                        <span className="font-mono text-[8px] text-primary/80 tracking-wide">3 items</span>
                    </div>
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="font-mono text-[9px] text-primary font-bold tracking-wider"
                    >
                        CHECKOUT
                    </motion.span>
                </motion.div>

                {/* Payment pulse */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1 w-24 h-4 bg-primary/10 rounded-full blur-md"
                />
            </div>
        </ModuleCard>
    );
};
