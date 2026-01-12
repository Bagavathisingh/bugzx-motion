'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const BentoGrid = ({ className, children, ...props }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    description: string;
    href?: string;
    cta?: string;
    background?: React.ReactNode;
    Icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

export const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    ...props
}: BentoCardProps) => (
    <Motion.div
        key={name}
        className={cn(
            "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
            "transform-gpu transition-all duration-300 hover:shadow-2xl",
            className
        )}
        whileHover={{ y: -5 }}
        {...props}
    >
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-neutral-800/10" />
        {background}
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
            {Icon && <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75" />}
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                {name}
            </h3>
            <p className="max-w-lg text-neutral-400">{description}</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {href && cta && (
                <button className="pointer-events-auto rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-black">
                    {cta}
                    <span className="ml-2">→</span>
                </button>
            )}
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-neutral-800/10" />
    </Motion.div>
);
