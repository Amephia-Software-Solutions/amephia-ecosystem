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
            subtitle="Online Store / Payments"
            className=""
            delay={0.15}
            onClick={() => onOpenProject?.('ecommerce')}
        >
            <div className="relative w-28 h-28 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <svg className="absolute inset-0 w-full h-full text-white/5 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
                <svg className="absolute inset-0 w-full h-full text-primary/20 animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
                </svg>
                <div className="relative z-10 w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-surface/50 backdrop-blur-md">
                    <motion.div
                        animate={{ height: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-full bg-primary/20 blur-sm"
                    />
                    <div className="w-full h-[1px] bg-primary absolute shadow-[0_0_8px_1px_rgba(59,130,246,0.4)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    <span className="font-mono text-[8px] text-primary tracking-widest">CHECKOUT</span>
                </div>
            </div>
        </ModuleCard>
    );
};
