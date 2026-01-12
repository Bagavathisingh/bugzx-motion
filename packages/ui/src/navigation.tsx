'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
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
                        <nav className="hidden md:flex gap-6">
                            {items.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
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
            <div className="relative group w-full max-w-md">
                <Input
                    ref={ref}
                    className={cn(
                        "pl-10 pr-4 transition-all focus:w-full",
                        variants[variant],
                        className
                    )}
                    placeholder="Search..."
                    onChange={(e) => onSearch?.(e.target.value)}
                    {...props}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors">
                    <svg className={cn("h-4 w-4", variant === "neon" && "text-cyan-500")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {variant !== "minimal" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
                        <span className={cn(
                            "text-xs border px-1.5 py-0.5 rounded",
                            variant === "neon" ? "border-cyan-800 text-cyan-600" : "border-border text-muted-foreground"
                        )}>
                            ⌘K
                        </span>
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
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items: { icon: React.ReactNode; label: string; href: string; active?: boolean }[];
    footer?: React.ReactNode;
    collapsed?: boolean;
    variant?: "default" | "neon";
    accentColor?: string;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
    ({ className, items, footer, collapsed = false, variant = "default", accentColor, ...props }, ref) => {
        return (
            <Motion.aside
                ref={ref}
                className={cn(
                    "flex flex-col border-r border-border bg-card h-screen sticky top-0 transition-all duration-300",
                    collapsed ? "w-16" : "w-64",
                    className
                )}
                {...props}
            >
                <div className="flex-1 py-6 px-3 space-y-2">
                    {items.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group relative",
                                item.active
                                    ? (variant === "neon" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]" : "bg-primary/10 text-primary")
                                    : (variant === "neon" ? "text-muted-foreground hover:bg-zinc-800 hover:text-cyan-400" : "text-muted-foreground hover:bg-accent hover:text-foreground")
                            )}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {!collapsed && (
                                <Motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </Motion.span>
                            )}
                            {collapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border shadow-sm">
                                    {item.label}
                                </div>
                            )}
                        </a>
                    ))}
                </div>
                {footer && (
                    <div className="p-4 border-t border-border">
                        {!collapsed ? footer : (
                            <div className="flex justify-center">
                                <span className="h-8 w-8 rounded-full bg-muted" />
                            </div>
                        )}
                    </div>
                )}
            </Motion.aside>
        );
    }
);
Sidebar.displayName = "Sidebar";
