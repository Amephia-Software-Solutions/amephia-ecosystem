import React from 'react';

export const BentoGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[minmax(220px,auto)]">
        {children}
    </div>
);
