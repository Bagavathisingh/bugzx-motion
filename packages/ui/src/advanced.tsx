'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

// ============================================
// FLOATING CARD
// ============================================
interface FloatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
    accentColor?: string;
}

export const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
    ({ className, children, intensity = "medium", accentColor, ...props }, ref) => {
        const intensities = {
            subtle: { y: -2, shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
            medium: { y: -5, shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
            strong: { y: -8, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
        };

        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "rounded-xl bg-card text-card-foreground border border-border p-6",
                    className
                )}
                style={{
                    transformStyle: "preserve-3d"
                }}
                whileHover={{
                    y: (intensities[intensity] || intensities.medium).y,
                    rotateX: 2,
                    boxShadow: (intensities[intensity] || intensities.medium).shadow,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                {...props}
            >
                <div style={{ transform: "translateZ(20px)" }}>
                    {children}
                </div>
            </Motion.div>
        );
    }
);
FloatingCard.displayName = "FloatingCard";

// ============================================
// MAGNETIC BUTTON
// ============================================
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    strength?: number;
    accentColor?: string;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
    ({ className, children, strength = 0.3, accentColor, ...props }, ref) => {
        const buttonRef = React.useRef<HTMLButtonElement>(null);
        const [position, setPosition] = React.useState({ x: 0, y: 0 });

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;
            setPosition({ x: deltaX, y: deltaY });
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        return (
            <Motion.button
                ref={buttonRef}
                className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    className
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: position.x, y: position.y }}
                transition={{ duration: 0.1, ease: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                {...props}
            >
                <Motion.span
                    animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
                    className="relative z-10 block pointer-events-none select-none"
                >
                    {children}
                </Motion.span>
            </Motion.button>
        );
    }
);
MagneticButton.displayName = "MagneticButton";

// ============================================
// TRACING BEAM
// ============================================
interface TracingBeamProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const TracingBeam = React.forwardRef<HTMLDivElement, TracingBeamProps>(
    ({ className, children, ...props }, ref) => {
        const [scrollY, setScrollY] = React.useState(0);
        const containerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const handleScroll = () => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const totalHeight = containerRef.current.scrollHeight;
                const visibleHeight = window.innerHeight;
                const progress = Math.max(0, Math.min(1, -rect.top / (totalHeight - visibleHeight)));
                setScrollY(progress);
            };

            window.addEventListener("scroll", handleScroll);
            handleScroll();
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
            <div ref={containerRef} className={cn("relative w-full max-w-4xl mx-auto h-full", className)} {...props}>
                <div className="absolute -left-4 md:-left-20 top-3">
                    <div className="h-full w-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <Motion.div
                            className="w-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                            animate={{ height: `${scrollY * 100}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <Motion.div
                        className="absolute w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] -left-[7px]"
                        animate={{ top: `${scrollY * 98}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
                <div className="pl-10 md:pl-0">
                    {children}
                </div>
            </div>
        );
    }
);
TracingBeam.displayName = "TracingBeam";

// ============================================
// PARALLAX CONTAINER
// ============================================
interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    speed?: number;
    accentColor?: string;
}

export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
    ({ className, children, speed = 0.5, accentColor, ...props }, ref) => {
        const [offset, setOffset] = React.useState(0);
        const containerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const handleScroll = () => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const scrolled = window.scrollY;
                const elementTop = rect.top + scrolled;
                const offset = (scrolled - elementTop) * speed;
                setOffset(offset);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, [speed]);

        return (
            <div ref={containerRef} className={cn("relative overflow-hidden", className)} {...props}>
                <Motion.div
                    style={{ y: offset }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                    {children}
                </Motion.div>
            </div>
        );
    }
);
Parallax.displayName = "Parallax";

// ============================================
// GLITCH TEXT
// ============================================
interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: string;
    variant?: "default" | "neon";
    accentColor?: string;
}

export const GlitchText = React.forwardRef<HTMLDivElement, GlitchTextProps>(
    ({ className, children, variant = "default", accentColor, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative inline-block cursor-default select-none",
                    variant === "neon" ? "text-cyan-400" : "text-foreground",
                    className
                )}
                {...props}
            >
                {/* Main Text */}
                <span className="relative z-10 block">{children}</span>

                {/* Glitch Layers - Only visible/animating on hover */}
                <Motion.span
                    className="absolute inset-0 z-0 opacity-0 pointer-events-none mix-blend-screen overflow-hidden"
                    whileHover={{
                        opacity: 0.8,
                        x: [0, -4, 4, -2, 0],
                        y: [0, 2, -2, 3, 0],
                    }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    style={{
                        color: "#ff00ff",
                        clipPath: "inset(20% 0 40% 0)"
                    }}
                >
                    {children}
                </Motion.span>

                <Motion.span
                    className="absolute inset-0 z-0 opacity-0 pointer-events-none mix-blend-screen overflow-hidden"
                    whileHover={{
                        opacity: 0.8,
                        x: [0, 4, -4, 2, 0],
                        y: [0, -3, 3, -1, 0],
                    }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    style={{
                        color: "#00ffff",
                        clipPath: "inset(50% 0 10% 0)"
                    }}
                >
                    {children}
                </Motion.span>

                <Motion.span
                    className="absolute inset-0 z-0 opacity-0 pointer-events-none"
                    whileHover={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.05, repeat: Infinity }}
                    style={{
                        backgroundColor: variant === "neon" ? "rgba(6, 182, 212, 0.4)" : "rgba(0,0,0,0.1)",
                        height: "1px",
                        top: "50%",
                        width: "100%"
                    }}
                />
            </div>
        );
    }
);
GlitchText.displayName = "GlitchText";

// ============================================
// TILT CARD
// ============================================
interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    maxTilt?: number;
    accentColor?: string;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
    ({ className, children, maxTilt = 10, accentColor, ...props }, ref) => {
        const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
        const cardRef = React.useRef<HTMLDivElement>(null);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = ((y - centerY) / centerY) * maxTilt;
            const tiltY = ((centerX - x) / centerX) * maxTilt;
            setTilt({ x: tiltX, y: tiltY });
        };

        const handleMouseLeave = () => {
            setTilt({ x: 0, y: 0 });
        };

        return (
            <Motion.div
                ref={cardRef}
                className={cn(
                    "rounded-xl bg-card text-card-foreground border border-border p-6",
                    className
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    transformStyle: "preserve-3d"
                }}
                {...props}
            >
                <div style={{ transform: "translateZ(30px)" }}>
                    {children}
                </div>
            </Motion.div>
        );
    }
);
TiltCard.displayName = "TiltCard";
