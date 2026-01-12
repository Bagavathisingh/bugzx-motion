'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, Motion } from '@bugzx-motion/core';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <Motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </Motion.div>
        </AnimatePresence>
    );
};
