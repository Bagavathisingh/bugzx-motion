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

/**
 * BlueprintMarquee component - for scrolling technical text/tags
 */
export const BlueprintMarquee = ({
    items,
    direction = "left",
    speed = "normal",
    className
}: {
    items: string[];
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    className?: string;
}) => {
    const duration = speed === "slow" ? 40 : speed === "normal" ? 20 : 10;

    return (
        <div className={cn("overflow-hidden whitespace-nowrap border-y border-[#262626] py-3 bg-[#0d0d0d]", className)}>
            <Motion.div
                className="inline-block"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="flex gap-12 items-center px-4">
                    {[...items, ...items].map((item, i) => (
                        <span
                            key={i}
                            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-4"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#cf0] shadow-[0_0_5px_#cf0]" />
                            {item}
                        </span>
                    ))}
                </div>
            </Motion.div>
        </div>
    );
};

/**
 * BlueprintProjectCard component
 */
export const BlueprintProjectCard = ({
    title,
    description,
    tags,
    image,
    link,
    neon = true,
    className
}: {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    neon?: boolean;
    className?: string;
}) => {
    return (
        <BlueprintCard title={title} neon={neon} className={cn("overflow-hidden flex flex-col h-full", className)}>
            {image && (
                <div className="relative aspect-video mb-4 overflow-hidden border border-[#262626] hover:border-[#cf0]/30 transition-colors">
                    <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 scale-105 hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                </div>
            )}
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed line-clamp-3">
                {description}
            </p>
            <div className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 border border-[#262626] text-zinc-500 font-mono uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-[#cf0] uppercase tracking-widest hover:translate-x-1 transition-transform"
                    >
                        View System ──&gt;
                    </a>
                )}
            </div>
        </BlueprintCard>
    );
};

/**
 * BlueprintFooter component
 */
export const BlueprintFooter = ({
    copyright = "BugzxMotion",
    links = [],
    className
}: {
    copyright?: string;
    links?: { label: string; href: string }[];
    className?: string;
}) => {
    return (
        <footer className={cn("border-t border-[#262626] bg-[#0a0a0a] relative", className)}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <h4 className="text-[#cf0] font-bold text-sm uppercase tracking-widest mb-4">System Identity</h4>
                        <p className="text-xs text-zinc-500 font-mono max-w-sm">
                            Premium Motion Design System [v0.0.5]. Built for high-performance architectural interfaces and technical displays.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            {links.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-[10px] text-zinc-500 hover:text-[#cf0] transition-colors font-mono uppercase">
                                        / {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Status</h4>
                        <div className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            Core Systems Operational
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] text-zinc-700 font-mono uppercase tracking-widest">
                        &copy; 2026 {copyright} // All Systems Synchronized
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[9px] text-zinc-800 font-mono uppercase tracking-[0.3em]">
                            LAT: 13.0827° N / LONG: 80.2707° E
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/**
 * BlueprintContact component
 */
export const BlueprintContact = ({
    title = "Initialize Communication",
    onSubmit,
    className
}: {
    title?: string;
    onSubmit?: (data: any) => void;
    className?: string;
}) => {
    return (
        <div className={cn("border border-[#262626] bg-[#0d0d0d] p-8 md:p-12 relative overflow-hidden", className)}>
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-800 uppercase vertical-text tracking-widest opacity-30 select-none">
                CONTACT_PROTOCOL_SEQ_48
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-12 flex items-center gap-4">
                <span className="text-[#cf0] opacity-50">//</span> {title}
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); onSubmit?.({}); }}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold">Inquirer Name</label>
                        <input className="w-full bg-[#0a0a0a] border border-[#262626] px-4 py-3 text-xs text-zinc-300 font-mono focus:border-[#cf0] outline-none transition-colors" placeholder="ENTER_NAME" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold">Signal Address (Email)</label>
                        <input type="email" className="w-full bg-[#0a0a0a] border border-[#262626] px-4 py-3 text-xs text-zinc-300 font-mono focus:border-[#cf0] outline-none transition-colors" placeholder="ADDRESS@HOST.COM" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2 h-full flex flex-col">
                        <label className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold">Transmission Data</label>
                        <textarea className="w-full bg-[#0a0a0a] border border-[#262626] px-4 py-3 text-xs text-zinc-300 font-mono focus:border-[#cf0] outline-none transition-colors flex-1 min-h-[140px]" placeholder="DESCRIBE_PROJECT_PARAMETERS..." />
                    </div>
                </div>
                <div className="md:col-span-2 pt-4">
                    <BlueprintButton variant="neon" className="w-full md:w-auto h-12 px-12">
                        Execute Transmission
                    </BlueprintButton>
                </div>
            </form>
        </div>
    );
};
