'use client';

import React, { createContext, useContext } from 'react';

interface MotionContextProps {
    reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextProps>({
    reducedMotion: false,
});

export const useBugzxMotion = () => useContext(MotionContext);

export const BugzxMotionProvider = ({
    children,
    reducedMotion = false
}: {
    children: React.ReactNode,
    reducedMotion?: boolean
}) => {
    return (
        <MotionContext.Provider value={{ reducedMotion }}>
            {children}
        </MotionContext.Provider>
    );
};
