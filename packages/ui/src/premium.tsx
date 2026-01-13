'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

interface GradientBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    borderWidth?: number;
    accentColor?: string;
}

export const GradientBorderCard = React.forwardRef<HTMLDivElement, GradientBorderCardProps>(
    ({ className, children, gradientFrom = "#06b6d4", gradientTo = "#3b82f6", borderWidth = 2, accentColor, ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn("relative rounded-xl overflow-hidden", className)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                        padding: `${borderWidth}px`,
                    }}
                >
                    <div className="h-full w-full bg-background rounded-[10px]" />
                </div>
                <div className="relative z-10 p-6">
                    {children}
                </div>
            </Motion.div>
        );
    }
);
GradientBorderCard.displayName = "GradientBorderCard";

interface AnimatedGridPatternProps extends React.SVGProps<SVGSVGElement> {
    numSquares?: number;
    maxOpacity?: number;
    duration?: number;
}

export const AnimatedGridPattern = ({
    numSquares = 50,
    maxOpacity = 0.5,
    duration = 4,
    className,
    ...props
}: AnimatedGridPatternProps) => {
    // Generate stable positions using a seeded approach
    const positions = React.useMemo(() => {
        const pos = [];
        for (let i = 0; i < numSquares; i++) {
            // Use index-based deterministic positions to avoid hydration mismatch
            const x = (i * 37) % 100; // Prime number for better distribution
            const y = (i * 53) % 100;
            pos.push([x, y]);
        }
        return pos;
    }, [numSquares]);

    return (
        <svg
            className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
            {...props}
        >
            <defs>
                <pattern
                    id="grid-pattern"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                >
                    <path
                        d="M0 32V0h32"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            {positions.map(([x, y], i) => (
                <rect
                    key={i}
                    x={`${x}%`}
                    y={`${y}%`}
                    width="32"
                    height="32"
                    fill="currentColor"
                    fillOpacity={maxOpacity}
                    className="animate-pulse"
                    style={{
                        animationDelay: `${(i * 0.1) % duration}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            ))}
        </svg>
    );
};
AnimatedGridPattern.displayName = "AnimatedGridPattern";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    background?: string;
    accentColor?: string;
    size?: "sm" | "md" | "lg" | "default";
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    ({ className, children, shimmerColor = "#ffffff", shimmerSize = "0.05em", borderRadius = "100px", background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", accentColor, size = "default", ...props }, ref) => {
        const sizeClasses = {
            sm: "px-4 py-1.5 text-sm",
            md: "px-6 py-3",
            lg: "px-8 py-4 text-lg",
            default: "px-6 py-3"
        };

        return (
            <Motion.button
                ref={ref}
                className={cn(
                    "relative overflow-hidden font-medium text-white transition-all",
                    sizeClasses[size as keyof typeof sizeClasses],
                    className
                )}
                style={{
                    background,
                    borderRadius,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <div
                    className="absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 3s infinite',
                    }}
                />
                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </Motion.button>
        );
    }
);
ShimmerButton.displayName = "ShimmerButton";

// ============================================
// GLASS CARD
// ============================================
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    blur?: number;
    opacity?: number;
    accentColor?: string;
    border?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, children, blur = 12, opacity = 0.2, accentColor, border = true, ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-2xl",
                    border && "border border-white/20",
                    className
                )}
                style={{
                    backdropFilter: `blur(${blur}px)`,
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                {...props}
            >
                <div className="relative z-10 p-6">
                    {children}
                </div>
            </Motion.div>
        );
    }
);
GlassCard.displayName = "GlassCard";

// ============================================
// TEXT REVEAL
// ============================================
interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    stagger?: number;
    variant?: "default" | "neon";
}

export const TextReveal = ({ text, stagger = 0.05, variant = "default", className, ...props }: TextRevealProps) => {
    const characters = text.split("");

    return (
        <div
            className={cn("flex flex-wrap", className)}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            {...props}
        >
            {characters.map((char, i) => (
                <Motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: i * stagger,
                        ease: [0.2, 0.65, 0.3, 1.1]
                    }}
                    className={cn(
                        "inline-block whitespace-pre",
                        variant === "neon" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    )}
                >
                    {char}
                </Motion.span>
            ))}
        </div>
    );
};

// ============================================
// BACKGROUND BEAMS
// ============================================
export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <svg
                viewBox="0 0 1440 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute h-full w-full opacity-[0.15]"
                preserveAspectRatio="none"
            >
                <g filter="url(#beams-filter)">
                    <Motion.path
                        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 0.4, 0],
                            pathOffset: [0, 1],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0
                        }}
                        d="M -100 100 Q 400 300 1500 100"
                        stroke="url(#beam-grad-1)"
                        strokeWidth="2"
                        pathLength="1"
                    />
                    <Motion.path
                        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 0.3, 0],
                            pathOffset: [0, 1],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 2
                        }}
                        d="M -100 400 Q 700 100 1500 500"
                        stroke="url(#beam-grad-2)"
                        strokeWidth="3"
                        pathLength="1"
                    />
                    <Motion.path
                        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 0.5, 0],
                            pathOffset: [0, 1],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 4
                        }}
                        d="M -100 800 Q 300 500 1500 700"
                        stroke="url(#beam-grad-1)"
                        strokeWidth="2"
                        pathLength="1"
                    />
                </g>
                <defs>
                    <filter id="beams-filter" x="-100" y="-100" width="1640" height="1100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="bg" />
                        <feBlend mode="normal" in="SourceGraphic" in2="bg" result="blend" />
                        <feGaussianBlur stdDeviation="10" result="blur" />
                    </filter>
                    <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// ============================================
// BEAM CARD
// ============================================
interface BeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
    beamColor?: string;
    duration?: number;
}

export const BeamCard = React.forwardRef<HTMLDivElement, BeamCardProps>(
    ({ className, children, beamColor = "#06b6d4", duration = 3, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "group relative p-[1px] overflow-hidden rounded-2xl bg-zinc-900/50",
                    className
                )}
                {...props}
            >
                <div className="absolute inset-0 z-0">
                    <Motion.div
                        className="absolute inset-[-100%] z-0"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            background: `conic-gradient(from 0deg, transparent 0 340deg, ${beamColor} 360deg)`,
                        }}
                    />
                </div>
                <div className="relative z-10 h-full w-full rounded-2xl bg-zinc-950 p-6">
                    {children}
                </div>
            </div>
        );
    }
);
BeamCard.displayName = "BeamCard";
