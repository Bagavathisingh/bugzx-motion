'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        hoverEffect?: "lift" | "scale" | "glow" | "none";
        neon?: boolean; // New prop for neon styling
        accentColor?: string;
    }
>(({ className, hoverEffect = "lift", neon = false, accentColor, ...props }, ref) => {

    const motionProps = React.useMemo(() => {
        switch (hoverEffect) {
            case "lift":
                return { whileHover: { y: -5 } };
            case "scale":
                return { whileHover: { scale: 1.02 } };
            case "glow":
                return { whileHover: { shadow: "0 0 20px rgba(120, 119, 198, 0.3)" } }; // Simple CSS shadow sim
            default:
                return {};
        }
    }, [hoverEffect]);

    // Neon style base if enabled
    const neonClasses = neon
        ? "border-cyan-500/50 bg-black/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md text-cyan-50"
        : "bg-card text-card-foreground shadow-sm border border-border";

    return (
        <Motion.div
            ref={ref}
            className={cn(
                "rounded-xl",
                neonClasses,
                className
            )}
            {...motionProps}
            {...props}
        />
    )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
