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

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    background?: string;
    accentColor?: string;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    ({ className, children, shimmerColor = "#ffffff", shimmerSize = "0.05em", borderRadius = "100px", background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", accentColor, ...props }, ref) => {
        return (
            <Motion.button
                ref={ref}
                className={cn(
                    "relative overflow-hidden px-6 py-3 font-medium text-white transition-all",
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
