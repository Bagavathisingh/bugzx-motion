'use client';

import * as React from "react";
import { Motion } from "@bugzx-motion/core";
import { cn } from "./utils";

export type IconName =
    | "shopping"
    | "education"
    | "premium"
    | "diamond"
    | "bolt"
    | "layer"
    | "home"
    | "compass"
    | "book"
    | "star"
    | "clock"
    | "trophy"
    | "user"
    | "info";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name?: IconName;
    size?: number | string;
    variant?: "default" | "neon";
    // Motion props
    initial?: any;
    animate?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
}

const glyphs: Record<IconName, () => React.JSX.Element> = {
    shopping: () => (
        <>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </>
    ),
    education: () => (
        <>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" />
        </>
    ),
    premium: () => (
        <>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </>
    ),
    diamond: () => (
        <>
            <path d="M6 3h12l4 6-10 12L2 9Z" />
            <path d="M11 3 8 9l4 12 4-12-3-6" />
            <path d="M2 9h20" />
        </>
    ),
    bolt: () => (
        <>
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </>
    ),
    layer: () => (
        <>
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.1 6.27a1 1 0 0 0 0 1.83l9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09a1 1 0 0 0 0-1.83Z" />
            <path d="m2.1 11.27 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09" />
            <path d="m2.1 16.27 9.07 4.09a2 2 0 0 0 1.66 0l9.07-4.09" />
        </>
    ),
    home: () => (
        <>
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </>
    ),
    compass: () => (
        <>
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </>
    ),
    book: () => (
        <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
    ),
    star: () => (
        <>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </>
    ),
    clock: () => (
        <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </>
    ),
    trophy: () => (
        <>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </>
    ),
    user: () => (
        <>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </>
    ),
    info: () => (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </>
    ),
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ name, size = 24, variant = "default", className, ...props }, ref) => {
        if (!name || !glyphs[name]) return null;

        const GlyphNodes = glyphs[name];

        return (
            <Motion.svg
                ref={ref}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width={size}
                height={size}
                className={cn(
                    "transition-colors",
                    variant === "neon" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]",
                    className
                )}
                {...props}
            >
                <GlyphNodes />
            </Motion.svg>
        );
    }
);
Icon.displayName = "Icon";
