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
