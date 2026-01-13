'use client';

import * as React from "react"
import { Motion, splitMotionProps } from "@bugzx-motion/core"
import { cn } from "./utils"
import { Button } from "./button"
import { Input } from "./input"

// ============================================
// NAVBAR
// ============================================
interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    logo: React.ReactNode;
    items: { label: string; href: string }[];
    actions?: React.ReactNode;
    transparent?: boolean;
    variant?: "default" | "neon";
    accentColor?: string;
}

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
    ({ className, logo, items, actions, transparent = false, variant = "default", accentColor, ...props }, ref) => {
        const [scrolled, setScrolled] = React.useState(false);

        React.useEffect(() => {
            const handleScroll = () => setScrolled(window.scrollY > 20);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
            <Motion.header
                ref={ref}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    (scrolled || !transparent)
                        ? (variant === "neon" ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/30" : "bg-background/80 backdrop-blur-md border-b border-border")
                        : "bg-transparent border-transparent",
                    className
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                {...props}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        {logo}
                        <nav className="hidden md:flex gap-1">
                            {items.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                                >
                                    <span className="relative z-10">{item.label}</span>
                                    <Motion.div
                                        className={cn(
                                            "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-muted/50 -z-0",
                                            variant === "neon" && "bg-cyan-500/10"
                                        )}
                                        layoutId="navbar-hover"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                </a>
                            ))}
                        </nav>
                    </div>
                    {actions && <div className="flex items-center gap-4">{actions}</div>}
                </div>
            </Motion.header>
        );
    }
);
Navbar.displayName = "Navbar";

// ============================================
// SEARCH BAR
// ============================================
interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "minimal" | "neon";
    onSearch?: (query: string) => void;
    accentColor?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
    ({ className, variant = "default", onSearch, accentColor, ...props }, ref) => {
        const variants = {
            default: "bg-background border-border",
            minimal: "bg-secondary/50 border-transparent hover:bg-secondary/80",
            neon: "bg-black border-cyan-500/50 text-cyan-400 placeholder:text-cyan-700 shadow-[0_0_10px_rgba(6,182,212,0.2)] focus:ring-cyan-500",
        };

        return (
            <div className={cn("relative group w-full", className)}>
                <Input
                    ref={ref}
                    className={cn(
                        "pl-10 pr-12 h-11 transition-all duration-300",
                        variant === "neon" && "bg-black border-cyan-500/50 text-cyan-400 placeholder:text-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:border-cyan-400 focus:ring-cyan-500/20",
                        variant === "minimal" && "bg-secondary/20 border-transparent hover:bg-secondary/40",
                        className
                    )}
                    placeholder="Search..."
                    onChange={(e) => onSearch?.(e.target.value)}
                    {...props}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors pointer-events-none">
                    <svg className={cn("h-4 w-4", variant === "neon" && "text-cyan-500")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {variant !== "minimal" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                )}
            </div>
        );
    }
);
SearchBar.displayName = "SearchBar";

// ============================================
// SIDEBAR
// ============================================
export interface SidebarItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items: SidebarItem[];
    logo?: React.ReactNode;
    footer?: React.ReactNode;
    collapsed?: boolean;
    onToggle?: () => void;
    variant?: "default" | "neon";
    accentColor?: string;
    layoutId?: string;
}



export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    ({ className, items, logo, footer, collapsed = false, onToggle, variant = "default", accentColor, layoutId = "sidebar-active", ...props }, ref) => {
        const { otherProps } = splitMotionProps(props);
        return (
            <Motion.aside
                ref={ref}
                className={cn(
                    "flex flex-col border-r border-border bg-card/50 backdrop-blur-xl h-screen sticky top-0 transition-all duration-100 z-40 ease-out",
                    collapsed ? "w-20" : "w-72",
                    className
                )}
                {...otherProps}
            >
                <div className={cn(
                    "flex items-center p-6 pb-0 relative z-10",
                    collapsed ? "justify-center" : "justify-between"
                )}>
                    {logo && !collapsed && (
                        <Motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1"
                        >
                            {logo}
                        </Motion.div>
                    )}

                    {onToggle && (
                        <button
                            type="button"
                            onClick={onToggle}
                            className={cn(
                                "p-2 rounded-xl transition-all hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                                variant === "neon" && "hover:bg-cyan-500/10 hover:text-cyan-400"
                            )}
                        >
                            <Motion.div
                                animate={{ rotate: collapsed ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </Motion.div>
                        </button>
                    )}
                </div>
                <div className="flex-1 py-10 px-4 space-y-2 relative">
                    {items.map((item, i) => {
                        const active = !!item.active;
                        const content = (
                            <>
                                {active && (
                                    <Motion.div
                                        layoutId={layoutId}
                                        className={cn(
                                            "absolute inset-0 z-0 rounded-xl",
                                            variant === "neon"
                                                ? "bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                                : "bg-primary/10 border border-primary/20"
                                        )}
                                        style={accentColor && !variant.includes("neon") ? { backgroundColor: `${accentColor}1a`, borderColor: `${accentColor}33` } : {}}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={cn(
                                    "shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110",
                                    active && variant === "neon" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                                )}>
                                    {item.icon}
                                </span>
                                {!collapsed && (
                                    <Motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative z-10 font-medium whitespace-nowrap"
                                    >
                                        {item.label}
                                    </Motion.span>
                                )}
                                {collapsed && (
                                    <div className="absolute left-full ml-6 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border shadow-xl z-50">
                                        {item.label}
                                    </div>
                                )}
                            </>
                        );

                        const commonClassName = cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative overflow-hidden w-full text-left outline-none",
                            active
                                ? (variant === "neon" ? "text-cyan-400" : "text-primary font-semibold")
                                : "text-muted-foreground hover:text-foreground"
                        );

                        if (item.href) {
                            return (
                                <a
                                    key={i}
                                    href={item.href}
                                    onClick={item.onClick}
                                    className={commonClassName}
                                >
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={item.onClick}
                                className={commonClassName}
                            >
                                {content}
                            </button>
                        );
                    })}
                </div>
                {footer && (
                    <div className="p-6 border-t border-border/50">
                        {!collapsed ? footer : (
                            <div className="flex justify-center">
                                <span className="h-10 w-10 rounded-full border border-border flex items-center justify-center bg-muted/30">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </Motion.aside>
        );
    }
);
Sidebar.displayName = "Sidebar";
