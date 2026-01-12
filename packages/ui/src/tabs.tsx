'use client';

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { neon?: boolean; accentColor?: string }
>(({ className, neon = false, accentColor, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
            neon && "bg-black/80 border border-cyan-500/50 text-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
            neon && "[&_button[data-state=active]]:bg-cyan-950 [&_button[data-state=active]]:text-cyan-400 [&_button[data-state=active]]:shadow-[0_0_10px_rgba(6,182,212,0.4)] [&_button]:text-cyan-700 [&_button:hover]:text-cyan-500",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { accentColor?: string }
>(({ className, accentColor, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
            className
        )}
        {...props}
    />
))
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
