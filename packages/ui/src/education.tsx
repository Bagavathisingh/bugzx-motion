'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"
import { Badge } from "./components"
import { Progress } from "./components"

// ============================================
// COURSE CARD
// ============================================
interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    instructor: string;
    thumbnail: string;
    progress?: number;
    totalLessons: number;
    completedLessons: number;
    category?: string;
    variant?: "default" | "compact" | "neon";
    accentColor?: string;
}

export const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
    ({ className, title, instructor, thumbnail, progress = 0, totalLessons, completedLessons, category, variant = "default", accentColor, ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "group relative overflow-hidden rounded-xl border bg-card text-card-foreground",
                    variant === "neon" && "border-cyan-500/30 bg-black shadow-[0_0_15px_rgba(6,182,212,0.15)]",
                    className
                )}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {category && (
                        <div className="absolute top-2 left-2">
                            <Badge variant={variant === "neon" ? "neon" : "secondary"}>
                                {category}
                            </Badge>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                        <div className="flex items-center gap-2 text-white/90">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium">{totalLessons} Lessons</span>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className={cn("mb-1 font-semibold line-clamp-1", variant === "neon" && "text-cyan-50")}>
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{instructor}</p>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className={cn(variant === "neon" && "text-cyan-400")}>{progress}% Complete</span>
                            <span className="text-muted-foreground">{completedLessons}/{totalLessons}</span>
                        </div>
                        <Progress
                            value={progress}
                            variant={variant === "neon" ? "neon" : "default"}
                            className="h-1.5"
                        />
                    </div>
                </div>
            </Motion.div>
        );
    }
);
CourseCard.displayName = "CourseCard";

// ============================================
// LESSON ITEM
// ============================================
interface LessonItemProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    duration: string;
    isCompleted?: boolean;
    isActive?: boolean;
    isLocked?: boolean;
    index: number;
    variant?: "default" | "neon";
    accentColor?: string;
}

export const LessonItem = React.forwardRef<HTMLDivElement, LessonItemProps>(
    ({ className, title, duration, isCompleted, isActive, isLocked, index, variant = "default", accentColor, ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                    variant === "neon"
                        ? (isActive ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]" : "bg-black/40 border-zinc-800 hover:border-cyan-500/30")
                        : (isActive ? "bg-primary/5 border-primary/20" : "bg-card border-border/50 hover:bg-accent"),
                    isLocked && "opacity-60 cursor-not-allowed grayscale",
                    className
                )}
                whileHover={!isLocked ? { x: 4, scale: 1.01 } : {}}
                {...props}
            >
                <div className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    isCompleted
                        ? (variant === "neon" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-green-500 text-white")
                        : (variant === "neon" ? "bg-zinc-800 text-cyan-400 border border-cyan-500/30" : "bg-muted text-muted-foreground"),
                    isActive && !isCompleted && (variant === "neon" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" : "bg-primary text-primary-foreground")
                )}>
                    {isCompleted ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        index
                    )}
                </div>

                <div className="flex-1 overflow-hidden ml-1">
                    <p className={cn(
                        "text-sm font-semibold truncate transition-colors",
                        isCompleted && "text-muted-foreground line-through opacity-70",
                        variant === "neon" && !isCompleted && "text-zinc-100"
                    )}>
                        {title}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span>{duration}</span>
                    {isLocked && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    )}
                </div>
            </Motion.div>
        );
    }
);
LessonItem.displayName = "LessonItem";

// ============================================
// CERTIFICATE CARD
// ============================================
interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    studentName: string;
    issueDate: string;
    courseName: string;
    id: string;
    variant?: "default" | "neon";
}

export const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
    ({ className, title, studentName, issueDate, courseName, id, variant = "default", ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "relative overflow-hidden p-8 rounded-2xl border bg-card text-card-foreground shadow-xl",
                    variant === "neon" ? "border-cyan-500/40 bg-black" : "border-border/50",
                    className
                )}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                {...props}
            >
                {/* Decorative Elements */}
                <div className={cn(
                    "absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-20",
                    variant === "neon" ? "bg-cyan-500" : "bg-primary"
                )} />
                <div className={cn(
                    "absolute -left-10 -bottom-10 h-40 w-40 rounded-full blur-3xl opacity-20",
                    variant === "neon" ? "bg-purple-500" : "bg-secondary"
                )} />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className={cn(
                        "p-3 rounded-full border",
                        variant === "neon" ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" : "bg-primary/10 text-primary border-primary/20"
                    )}>
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>

                    <div className="space-y-1">
                        <h2 className={cn("text-xs font-bold uppercase tracking-[0.2em] opacity-60", variant === "neon" && "text-cyan-400")}>
                            {title}
                        </h2>
                        <h3 className="text-2xl font-bold tracking-tight">{courseName}</h3>
                    </div>

                    <div className="w-16 h-px bg-border/50" />

                    <div className="space-y-2">
                        <p className="text-sm opacity-60">This is to certify that</p>
                        <p className={cn("text-xl font-serif italic font-bold", variant === "neon" && "text-cyan-50 font-sans")}>{studentName}</p>
                        <p className="text-sm opacity-60">has successfully completed the requirements for this course.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-12 w-full pt-4 border-t border-border/20 mt-4">
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold opacity-40">Issue Date</p>
                            <p className="text-xs font-semibold">{issueDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-bold opacity-40">Certificate ID</p>
                            <p className="text-xs font-mono font-semibold tracking-tighter">{id}</p>
                        </div>
                    </div>
                </div>
            </Motion.div>
        );
    }
);
CertificateCard.displayName = "CertificateCard";

// ============================================
// STUDENT PROGRESS STATS
// ============================================
interface StudentProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    stats: {
        label: string;
        value: string | number;
        icon: React.ReactNode;
        trend?: string;
    }[];
    variant?: "default" | "neon";
}

export const StudentProgress = ({ stats, variant = "default", className, ...props }: StudentProgressProps) => {
    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)} {...props}>
            {stats.map((stat, i) => (
                <Motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                        "p-4 rounded-xl border bg-card flex flex-col justify-between h-32",
                        variant === "neon" ? "border-cyan-500/20 bg-black/40 shadow-[0_0_10px_rgba(6,182,212,0.1)]" : "border-border/50 shadow-sm"
                    )}
                >
                    <div className="flex items-center justify-between">
                        <div className={cn(
                            "p-2 rounded-lg",
                            variant === "neon" ? "bg-cyan-500/10 text-cyan-400" : "bg-primary/10 text-primary"
                        )}>
                            {stat.icon}
                        </div>
                        {stat.trend && (
                            <span className="text-[10px] font-bold text-green-500">{stat.trend}</span>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                        <p className={cn("text-xl font-black tracking-tight", variant === "neon" && "text-cyan-50")}>{stat.value}</p>
                    </div>
                </Motion.div>
            ))}
        </div>
    );
};

// ============================================
// STEP PROGRESS
// ============================================
interface StepProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    steps: {
        title: string;
        description: string;
        status: "completed" | "active" | "locked";
    }[];
    variant?: "default" | "neon";
}

export const StepProgress = ({ steps, variant = "default", className, ...props }: StepProgressProps) => {
    return (
        <div className={cn("space-y-0 relative", className)} {...props}>
            {/* Vertical Line */}
            <div className={cn(
                "absolute left-[19px] top-4 bottom-4 w-px bg-border/50",
                variant === "neon" && "bg-cyan-500/20"
            )} />

            {steps.map((step, i) => (
                <Motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-6 pb-10 last:pb-0 group"
                >
                    {/* Node */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                        <Motion.div
                            className={cn(
                                "h-4 w-4 rounded-full border-2 transition-all duration-500",
                                step.status === "completed" && (variant === "neon" ? "bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-green-500 border-green-600"),
                                step.status === "active" && (variant === "neon" ? "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-125" : "bg-primary border-primary scale-125"),
                                step.status === "locked" && "bg-muted border-border"
                            )}
                            animate={step.status === "active" ? {
                                scale: [1.25, 1.5, 1.25],
                            } : {}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                        <h4 className={cn(
                            "font-bold transition-colors",
                            step.status === "active" ? (variant === "neon" ? "text-cyan-400" : "text-primary") : "text-card-foreground",
                            step.status === "locked" && "opacity-50"
                        )}>
                            {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                            {step.description}
                        </p>
                    </div>
                </Motion.div>
            ))}
        </div>
    );
};
