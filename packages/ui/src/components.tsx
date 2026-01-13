'use client';

import * as React from "react"
import { Motion, AnimatePresence } from "@bugzx-motion/core"
import { cn } from "./utils"

// ============================================
// BADGE COMPONENT
// ============================================
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "neon";
    animate?: boolean;
    accentColor?: string;
    textColor?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "default", animate = false, accentColor, textColor, ...props }, ref) => {
        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground border border-input hover:bg-accent",
            success: "bg-green-500 text-white hover:bg-green-600",
            neon: "bg-black text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]",
        };

        const Component = (animate ? Motion.div : "div") as any;
        const motionProps = animate ? {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            whileHover: { scale: 1.05 },
        } : {};

        const isCustomizable = variant === "default" || variant === "outline" || variant === "neon";

        const customStyle = {
            ...(accentColor && isCustomizable ? {
                backgroundColor: variant === "outline" ? "transparent" : accentColor,
                borderColor: accentColor,
                color: variant === "outline" ? accentColor : undefined,
                boxShadow: variant === "neon" ? `0 0 10px ${accentColor}4d` : undefined
            } : {}),
            ...(textColor ? { color: textColor } : {})
        };

        return (
            <Component
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    variants[variant],
                    className
                )}
                style={customStyle}
                {...motionProps}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

// ============================================
// AVATAR COMPONENT
// ============================================
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg" | "xl";
    status?: "online" | "offline" | "away" | "busy";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps & { accentColor?: string }>(
    ({ className, src, alt, fallback, size = "md", status, accentColor, ...props }, ref) => {
        const sizes = {
            sm: "h-8 w-8 text-xs",
            md: "h-10 w-10 text-sm",
            lg: "h-12 w-12 text-base",
            xl: "h-16 w-16 text-lg",
        };

        const statusColors = {
            online: "bg-green-500",
            offline: "bg-gray-400",
            away: "bg-yellow-500",
            busy: "bg-red-500",
        };

        return (
            <Motion.div
                ref={ref}
                className={cn("relative inline-flex", className)}
                whileHover={{ scale: 1.05 }}
                {...props}
            >
                <div className={cn(
                    "relative flex shrink-0 overflow-hidden rounded-full",
                    sizes[size]
                )}>
                    {src ? (
                        <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted font-medium">
                            {fallback || "?"}
                        </div>
                    )}
                </div>
                {status && (
                    <span className={cn(
                        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
                        statusColors[status]
                    )} />
                )}
            </Motion.div>
        );
    }
);
Avatar.displayName = "Avatar";

// ============================================
// PROGRESS COMPONENT
// ============================================
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    variant?: "default" | "success" | "warning" | "danger" | "neon";
    showLabel?: boolean;
    animated?: boolean;
    accentColor?: string;
    textColor?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value = 0, max = 100, variant = "default", showLabel = false, animated = true, accentColor, textColor, ...props }, ref) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

        const variants = {
            default: "bg-primary",
            success: "bg-green-500",
            warning: "bg-yellow-500",
            danger: "bg-red-500",
            neon: "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]",
        };

        return (
            <div ref={ref} className={cn("relative w-full", className)} {...props}>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <Motion.div
                        className={cn("h-full transition-all", variants[variant])}
                        style={accentColor && (variant === "default" || variant === "neon") ? {
                            backgroundColor: accentColor,
                            backgroundImage: variant === "neon" ? `linear-gradient(to right, ${accentColor}, ${accentColor}dd)` : undefined,
                            boxShadow: variant === "neon" ? `0 0 10px ${accentColor}80` : undefined
                        } : {}}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: animated ? 0.5 : 0, ease: "easeOut" }}
                    />
                </div>
                {showLabel && (
                    <span
                        className="mt-1 text-xs text-muted-foreground"
                        style={textColor ? { color: textColor } : {}}
                    >
                        {Math.round(percentage)}%
                    </span>
                )}
            </div>
        );
    }
);
Progress.displayName = "Progress";

// ============================================
// SKELETON COMPONENT
// ============================================
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "circular" | "text" | "neon";
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps & { accentColor?: string }>(
    ({ className, variant = "default", accentColor, ...props }, ref) => {
        const variants = {
            default: "rounded-md",
            circular: "rounded-full",
            text: "rounded h-4",
            neon: "rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden bg-muted",
                    variant === "neon" ? "bg-cyan-950/20" : "bg-zinc-200 dark:bg-zinc-800",
                    variants[variant],
                    className
                )}
                {...props}
            >
                <Motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                />
            </div>
        );
    }
);
Skeleton.displayName = "Skeleton";

// ============================================
// SEPARATOR COMPONENT
// ============================================
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    variant?: "default" | "gradient" | "neon";
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps & { accentColor?: string }>(
    ({ className, orientation = "horizontal", decorative = true, variant = "default", accentColor, ...props }, ref) => {
        const variants = {
            default: "bg-border",
            gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
            neon: "bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.3)]",
        };

        return (
            <div
                ref={ref}
                role={decorative ? "none" : "separator"}
                aria-orientation={orientation}
                className={cn(
                    "shrink-0",
                    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Separator.displayName = "Separator";

// ============================================
// TOOLTIP COMPONENT
// ============================================
interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    variant?: "default" | "neon";
}

export const Tooltip = ({ children, content, side = "top", variant = "default" }: TooltipProps) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const variants = {
        default: "bg-popover text-popover-foreground border border-border",
        neon: "bg-black text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.8, y: side === "top" ? 10 : side === "bottom" ? -10 : 0, x: side === "left" ? 10 : side === "right" ? -10 : 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        className={cn(
                            "absolute z-50 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl border backdrop-blur-md",
                            positions[side],
                            variants[variant]
                        )}
                    >
                        {content}
                        <div className={cn(
                            "absolute w-2 h-2 rotate-45 border-r border-b",
                            side === "top" && "bottom-[-5px] left-1/2 -translate-x-1/2",
                            side === "bottom" && "top-[-5px] left-1/2 -translate-x-1/2 border-l border-t border-r-0 border-b-0",
                            side === "left" && "right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-t",
                            side === "right" && "left-[-5px] top-1/2 -translate-y-1/2 border-l border-b-0 border-t-0",
                            variant === "neon" ? "bg-black border-cyan-500/50" : "bg-popover border-border"
                        )} />
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
Tooltip.displayName = "Tooltip";

// ============================================
// ALERT COMPONENT
// ============================================
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "destructive" | "success" | "warning" | "neon";
    title?: string;
    icon?: React.ReactNode;
    accentColor?: string;
    textColor?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant = "default", title, icon, children, accentColor, textColor, ...props }, ref) => {
        const variants = {
            default: "bg-background text-foreground border-border",
            destructive: "border-destructive/50 bg-destructive/5 text-destructive [&>svg]:text-destructive",
            success: "border-green-500/50 bg-green-500/5 text-green-700 dark:text-green-400 [&>svg]:text-green-600",
            warning: "border-yellow-500/50 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600",
            neon: "bg-black/50 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
        };

        const customStyle = {
            ...(accentColor && (variant === "default" || variant === "neon") ? { borderColor: accentColor } : {}),
            ...(textColor ? { color: textColor } : {})
        };

        const [dismissed, setDismissed] = React.useState(false);

        if (dismissed) return null;

        return (
            <Motion.div
                ref={ref}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                    "relative w-full rounded-xl border p-4 backdrop-blur-sm group",
                    variants[variant],
                    className
                )}
                style={customStyle}
                {...props}
            >
                <div className="flex gap-4">
                    {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
                    <div className="flex-1">
                        {title && <h5 className="mb-1 font-bold leading-none tracking-tight">{title}</h5>}
                        <div className="text-sm opacity-90 [&_p]:leading-relaxed">{children}</div>
                    </div>
                    <button
                        onClick={() => setDismissed(true)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/5 rounded-md"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>
            </Motion.div>
        );
    }
);
Alert.displayName = "Alert";
