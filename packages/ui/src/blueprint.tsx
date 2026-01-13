'use client';

import * as React from 'react';
import { Motion } from '@bugzx-motion/core';
import { cn } from './utils';

/**
 * BlueprintGrid component - provides a consistent background grid pattern
 */
export const BlueprintGrid = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "bg-[#0a0a0a] min-h-screen relative overflow-hidden",
                className
            )}
            {...props}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(90deg, #262626 1px, transparent 1px),
            linear-gradient(#262626 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    opacity: 0.5
                }}
            />
            {props.children}
        </div>
    );
});
BlueprintGrid.displayName = "BlueprintGrid";

/**
 * BlueprintCard component
 */
export const BlueprintCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        title?: string;
        neon?: boolean;
        index?: string | number;
    }
>(({ className, title, neon, index, children, ...props }, ref) => {
    return (
        <Motion.div
            ref={ref}
            className={cn(
                "border border-[#262626] bg-[#0d0d0d]/80 backdrop-blur-sm relative group transition-all duration-300",
                neon && "hover:border-[#cf0]/50",
                className
            )}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            {...props}
        >
            {/* Corner accents */}
            <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-[#262626] group-hover:border-[#cf0] transition-colors" />
            <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-[#262626] group-hover:border-[#cf0] transition-colors" />
            <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-[#262626] group-hover:border-[#cf0] transition-colors" />
            <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-[#262626] group-hover:border-[#cf0] transition-colors" />

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    {index !== undefined && (
                        <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
              // {String(index).padStart(2, '0')}
                        </span>
                    )}
                    {neon && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#cf0] shadow-[0_0_8px_#cf0]" />
                    )}
                </div>

                {title && (
                    <h3 className={cn(
                        "text-lg font-bold uppercase tracking-tight mb-2 transition-colors",
                        neon ? "text-[#cf0]" : "text-white"
                    )}>
                        {title}
                    </h3>
                )}

                <div className="text-sm text-zinc-400 font-mono leading-relaxed">
                    {children}
                </div>
            </div>
        </Motion.div>
    );
});
BlueprintCard.displayName = "BlueprintCard";

/**
 * BlueprintButton component
 */
export const BlueprintButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: 'default' | 'neon' | 'outline';
    }
>(({ className, variant = 'default', ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "px-6 py-2 uppercase tracking-widest font-mono text-xs transition-all active:scale-95 border",
                variant === 'default' && "bg-transparent border-[#262626] text-white hover:bg-white hover:text-black",
                variant === 'neon' && "bg-[#cf0] border-[#cf0] text-black hover:bg-transparent hover:text-[#cf0] shadow-[0_0_15px_rgba(207,255,0,0.2)]",
                variant === 'outline' && "bg-transparent border-[#cf0] text-[#cf0] hover:bg-[#cf0] hover:text-black",
                className
            )}
            {...props}
        />
    );
});
BlueprintButton.displayName = "BlueprintButton";
