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
                whileHover={{
                    y: intensities[intensity].y,
                    boxShadow: intensities[intensity].shadow,
                }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                {children}
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
                    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    className
                )}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                {...props}
            >
                {children}
            </Motion.button>
        );
    }
);
MagneticButton.displayName = "MagneticButton";

// ============================================
// RIPPLE EFFECT
// ============================================
interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    color?: string;
    accentColor?: string;
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
    ({ className, children, color = "rgba(255, 255, 255, 0.5)", accentColor, ...props }, ref) => {
        const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

        const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const newRipple = { x, y, id: Date.now() };
            setRipples([...ripples, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 600);
        };

        return (
            <div
                ref={ref}
                className={cn("relative overflow-hidden", className)}
                onClick={addRipple}
                {...props}
            >
                {children}
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full animate-ripple pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 0,
                            height: 0,
                            backgroundColor: color,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ))}
                <style>{`
                    @keyframes ripple {
                        to {
                            width: 500px;
                            height: 500px;
                            opacity: 0;
                        }
                    }
                    .animate-ripple {
                        animation: ripple 0.6s ease-out;
                    }
                `}</style>
            </div>
        );
    }
);
Ripple.displayName = "Ripple";

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
        const variants = {
            default: "text-foreground",
            neon: "text-cyan-400",
        };

        return (
            <div
                ref={ref}
                className={cn("relative inline-block group", variants[variant], className)}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <span
                    className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
                    aria-hidden="true"
                >
                    {children}
                </span>
                <span
                    className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
                    aria-hidden="true"
                >
                    {children}
                </span>
                <style>{`
                    @keyframes glitch-1 {
                        0%, 100% { transform: translate(0); }
                        20% { transform: translate(-2px, 2px); }
                        40% { transform: translate(-2px, -2px); }
                        60% { transform: translate(2px, 2px); }
                        80% { transform: translate(2px, -2px); }
                    }
                    @keyframes glitch-2 {
                        0%, 100% { transform: translate(0); }
                        20% { transform: translate(2px, -2px); }
                        40% { transform: translate(2px, 2px); }
                        60% { transform: translate(-2px, -2px); }
                        80% { transform: translate(-2px, 2px); }
                    }
                    .animate-glitch-1 {
                        animation: glitch-1 0.3s infinite;
                        color: #ff00ff;
                        mix-blend-mode: screen;
                    }
                    .animate-glitch-2 {
                        animation: glitch-2 0.3s infinite;
                        color: #00ffff;
                        mix-blend-mode: screen;
                    }
                `}</style>
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
                style={{ transformStyle: "preserve-3d" }}
                {...props}
            >
                {children}
            </Motion.div>
        );
    }
);
TiltCard.displayName = "TiltCard";
