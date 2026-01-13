'use client';

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { Motion, splitMotionProps } from "@bugzx-motion/core"
import { cn } from "./utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { neon?: boolean; accentColor?: string }
>(({ className, neon = false, accentColor, ...props }, ref) => {
    const { otherProps } = splitMotionProps(props);
    return (
        <TabsPrimitive.List
            ref={ref}
            className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl bg-muted/50 p-1.5 text-muted-foreground backdrop-blur-md border border-border/50 relative overflow-hidden",
                neon && "bg-black/40 border-cyan-500/30 text-cyan-900/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]",
                className
            )}
            {...(otherProps as any)}
        />
    );
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { accentColor?: string; neon?: boolean }
>(({ className, accentColor, neon, children, ...props }, ref) => {
    const { otherProps } = splitMotionProps(props);
    return (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
                "text-muted-foreground data-[state=active]:text-foreground",
                neon && "data-[state=active]:text-cyan-400 [&:not([data-state=active])]:text-cyan-800 hover:text-cyan-500",
                className
            )}
            {...(otherProps as any)}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
                <Motion.div
                    className="hidden data-[state=active]:block absolute inset-0"
                    layoutId="active-tab-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                    <div className={cn(
                        "absolute inset-0 rounded-lg",
                        neon ? "bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]" : "bg-background border border-border/50 shadow-sm"
                    )}
                        style={accentColor && !neon ? { backgroundColor: `${accentColor}1a`, borderColor: `${accentColor}33` } : {}}
                    />
                </Motion.div>
            </div>
        </TabsPrimitive.Trigger>
    );
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
        animation?: "fade" | "slide";
        accentColor?: string;
    }
>(({ className, animation = "fade", accentColor, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        asChild
        {...props}
    >
        <Motion.div
            initial={animation === "fade" ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={animation === "fade" ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={animation === "fade" ? { opacity: 0 } : { opacity: 0, x: -20 }}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
        >
            {props.children}
        </Motion.div>
    </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
