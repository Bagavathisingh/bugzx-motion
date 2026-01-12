'use client';

import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"
import { Badge } from "./components"
import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"

// ============================================
// PRODUCT CARD
// ============================================
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviews?: number;
    badge?: string;
    onAddToCart?: () => void;
    onQuickView?: () => void;
    variant?: "default" | "minimal" | "premium";
    accentColor?: string;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
    ({
        className,
        image,
        title,
        price,
        originalPrice,
        rating = 0,
        reviews = 0,
        badge,
        onAddToCart,
        onQuickView,
        variant = "default",
        accentColor,
        ...props
    }, ref) => {
        const [isHovered, setIsHovered] = React.useState(false);
        const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "group relative overflow-hidden rounded-xl bg-card border border-border",
                    variant === "premium" && "bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950",
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {badge && <Badge variant="destructive">{badge}</Badge>}
                        {discount > 0 && <Badge variant="success">-{discount}%</Badge>}
                    </div>

                    {/* Quick Actions */}
                    <Motion.div
                        className="absolute top-2 right-2 flex flex-col gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                    >
                        <button
                            onClick={onQuickView}
                            className="rounded-full bg-white/90 dark:bg-black/90 p-2 shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button className="rounded-full bg-white/90 dark:bg-black/90 p-2 shadow-lg hover:bg-white dark:hover:bg-black transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </Motion.div>

                    {/* Add to Cart Button */}
                    <Motion.button
                        onClick={onAddToCart}
                        className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3 font-medium"
                        initial={{ y: "100%" }}
                        animate={{ y: isHovered ? 0 : "100%" }}
                        transition={{ duration: 0.2 }}
                    >
                        Add to Cart
                    </Motion.button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {/* Rating */}
                    {rating > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={cn(
                                            "h-4 w-4",
                                            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                        )}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({reviews})</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${price.toFixed(2)}</span>
                        {originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </Motion.div>
        );
    }
);
ProductCard.displayName = "ProductCard";

// ============================================
// PRICING CARD
// ============================================
interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    price: number;
    period?: string;
    features: string[];
    popular?: boolean;
    cta?: string;
    onSelect?: () => void;
    variant?: "default" | "neon";
    size?: "sm" | "md" | "lg";
    accentColor?: string;
    textColor?: string;
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
    ({ className, name, price, period = "month", features, popular, cta = "Get Started", onSelect, variant = "default", size = "md", accentColor, textColor, ...props }, ref) => {
        const variantClasses = {
            default: popular
                ? "border-primary bg-primary/5 shadow-xl scale-105"
                : "border-border bg-card",
            neon: popular
                ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-105"
                : "border-zinc-800 bg-black/60",
        };

        const sizeClasses = {
            sm: "p-6",
            md: "p-8",
            lg: "p-10",
        };

        const customStyle = {
            ...(accentColor ? {
                borderColor: accentColor,
                backgroundColor: popular ? `${accentColor}1a` : undefined,
                boxShadow: popular && variant === "neon" ? `0 0 30px ${accentColor}33` : undefined
            } : {}),
            ...(textColor ? { color: textColor } : {})
        };

        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "relative rounded-2xl border",
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                style={customStyle}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                {popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge variant="default" className="px-4 py-1">Most Popular</Badge>
                    </div>
                )}

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-muted-foreground">/{period}</span>
                    </div>
                </div>

                <ul className="space-y-3 mb-8">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Motion.button
                    onClick={onSelect}
                    className={cn(
                        "w-full py-3 rounded-lg font-bold transition-all",
                        variant === "neon"
                            ? (popular ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-zinc-800 text-cyan-400 border border-cyan-500/30")
                            : (popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {cta}
                </Motion.button>
            </Motion.div>
        );
    }
);
PricingCard.displayName = "PricingCard";

// ============================================
// CART ITEM
// ============================================
interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    title: string;
    price: number;
    quantity: number;
    onQuantityChange?: (quantity: number) => void;
    onRemove?: () => void;
    variant?: "default" | "minimal";
    accentColor?: string;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
    ({ className, image, title, price, quantity, onQuantityChange, onRemove, variant = "default", accentColor, ...props }, ref) => {
        return (
            <Motion.div
                ref={ref}
                className={cn(
                    "flex gap-4 p-4 rounded-xl border transition-all",
                    variant === "minimal"
                        ? "border-transparent bg-transparent hover:bg-muted/50"
                        : "border-border bg-card shadow-sm hover:shadow-md",
                    className
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                {...props}
            >
                <img src={image} alt={title} className="h-20 w-20 rounded-md object-cover shrink-0" />

                <div className="flex-1">
                    <h4 className="font-medium mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">${price.toFixed(2)}</p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
                            className="h-8 w-8 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                        >
                            -
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                            onClick={() => onQuantityChange?.(quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                    <button
                        onClick={onRemove}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span className="font-bold">${(price * quantity).toFixed(2)}</span>
                </div>
            </Motion.div>
        );
    }
);
CartItem.displayName = "CartItem";

// ============================================
// CATEGORY CARD
// ============================================
interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    image: string;
    productCount?: number;
    href?: string;
    accentColor?: string;
}

export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
    ({ className, name, image, productCount, href, accentColor, ...props }, ref) => {
        return (
            <Motion.a
                ref={ref}
                href={href}
                className={cn(
                    "group relative block overflow-hidden rounded-xl aspect-square cursor-pointer",
                    className
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                {...props}
            >
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{name}</h3>
                    {productCount && (
                        <p className="text-sm text-white/80">{productCount} Products</p>
                    )}
                </div>
            </Motion.a>
        );
    }
);
CategoryCard.displayName = "CategoryCard";

// ============================================
// COMMERCE SEARCH BAR
// ============================================
export interface ProductSearchBarProps extends React.HTMLAttributes<HTMLFormElement> {
    onSearch?: (query: string) => void;
    placeholder?: string;
    variant?: "default" | "neon" | "minimal";
    size?: "sm" | "md" | "lg";
    accentColor?: string;
}

export const ProductSearchBar = React.forwardRef<HTMLFormElement, ProductSearchBarProps>(
    ({ className, onSearch, placeholder = "Search for products...", variant = "default", size = "md", accentColor, ...props }, ref) => {
        const [query, setQuery] = React.useState("");
        const [isFocused, setIsFocused] = React.useState(false);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSearch?.(query);
        };

        const sizeClasses = {
            sm: "py-2 px-3 text-xs",
            md: "py-4 px-4 text-sm",
            lg: "py-6 px-6 text-base"
        };

        const glowClasses = {
            default: "bg-primary/20",
            neon: "bg-gradient-to-r from-cyan-500 to-blue-600",
            minimal: "bg-zinc-400/20 dark:bg-zinc-600/20"
        };

        return (
            <form onSubmit={handleSubmit} className={cn("relative group w-full max-w-2xl mx-auto", className)} ref={ref} {...props}>
                {/* Background Glow */}
                <div
                    className={cn(
                        "absolute -inset-1 rounded-full opacity-0 transition duration-500 blur-xl group-focus-within:opacity-40",
                        glowClasses[variant]
                    )}
                    style={accentColor ? {
                        backgroundColor: accentColor,
                        backgroundImage: variant === "neon" ? `linear-gradient(to right, ${accentColor}, ${accentColor}dd)` : undefined
                    } : {}}
                />

                <div className="relative flex items-center w-full bg-background border border-border rounded-full overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary shadow-sm focus-within:shadow-xl focus-within:shadow-primary/10">
                    <div className="flex-1 flex items-center pl-5">
                        <Motion.div
                            animate={isFocused ? { scale: 1.15, textShadow: "0 0 8px rgba(6,182,212,0.5)" } : { scale: 1 }}
                            className="text-muted-foreground group-focus-within:text-primary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Motion.div>
                        <input
                            type="text"
                            className={cn(
                                "w-full bg-transparent border-none focus:ring-0 outline-none placeholder:text-muted-foreground/60",
                                sizeClasses[size]
                            )}
                            placeholder={placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>

                    <div className="flex items-center gap-2 pr-3">
                        <kbd className={cn(
                            "hidden sm:inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-muted-foreground opacity-100",
                            size === "sm" ? "h-5 text-[8px]" : "h-6 text-[10px]"
                        )}>
                            <span className={size === "sm" ? "text-[10px]" : "text-xs"}>⌘</span>K
                        </kbd>

                        <button
                            type="submit"
                            className={cn(
                                "bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all whitespace-nowrap",
                                size === "sm" ? "px-4 py-1 text-xs" : size === "lg" ? "px-10 py-3 text-base" : "px-6 py-2 text-sm"
                            )}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
);
ProductSearchBar.displayName = "ProductSearchBar";

// ============================================
// FILTER SIDEBAR
// ============================================
export interface FilterSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    categories?: string[];
    selectedCategories?: string[];
    onCategoryChange?: (category: string) => void;
    priceRange?: [number, number];
    onPriceChange?: (range: [number, number]) => void;
    onClearAll?: () => void;
    variant?: "default" | "neon" | "minimal";
    accentColor?: string;
}

export const FilterSidebar = React.forwardRef<HTMLDivElement, FilterSidebarProps>(
    ({ className, categories = ["Electronics", "Clothing", "Home", "Sports"], selectedCategories = [], onCategoryChange, onClearAll, variant = "default", accentColor, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("w-72 p-8 border rounded-2xl bg-card h-fit shadow-sm", className)} {...props}>
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                Filter By
                            </h3>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClearAll?.();
                                }}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Categories</p>
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <div key={category} className="flex items-center space-x-3 group cursor-pointer" onClick={(e) => {
                                        // Prevents double toggle if clicking the checkbox directly
                                        if ((e.target as HTMLElement).closest('button[role="checkbox"]')) return;
                                        onCategoryChange?.(category);
                                    }}>
                                        <Checkbox
                                            variant={variant === "neon" ? "neon" : variant === "minimal" ? "minimal" : "default"}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => onCategoryChange?.(category)}
                                        />
                                        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all select-none">{category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Sort By</p>
                        <RadioGroup defaultValue="newest">
                            <div className="space-y-3">
                                {[
                                    { id: "newest", label: "Newest Arrivals" },
                                    { id: "price-low", label: "Price: Low to High" },
                                    { id: "price-high", label: "Price: High to Low" },
                                    { id: "popular", label: "Most Popular" }
                                ].map((option) => (
                                    <div key={option.id} className="flex items-center space-x-3 group cursor-pointer">
                                        <RadioGroupItem value={option.id} id={option.id} variant={variant === "neon" ? "neon" : variant === "minimal" ? "minimal" : "default"} />
                                        <label htmlFor={option.id} className="text-sm font-medium opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all cursor-pointer select-none">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="pt-8 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Price Range</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                                    <input type="number" min="0" placeholder="Min" className="w-full pl-6 pr-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <span className="text-muted-foreground">—</span>
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                                    <input type="number" min="0" placeholder="Max" className="w-full pl-6 pr-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                            </div>
                            <button className="w-full py-3 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all">
                                Apply Range
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);
FilterSidebar.displayName = "FilterSidebar";

// ============================================
// ORDER BUTTON
// ============================================
interface OrderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isProcessing?: boolean;
    isSuccess?: boolean;
    variant?: "default" | "neon" | "minimal" | "outline";
    size?: "sm" | "md" | "lg";
    accentColor?: string;
}

export const OrderButton = React.forwardRef<HTMLButtonElement, OrderButtonProps>(
    ({ className, children, isProcessing, isSuccess, variant = "default", size = "md", accentColor, ...props }, ref) => {
        const variantClasses = {
            default: isSuccess
                ? "bg-green-500 text-white shadow-green-500/25 shadow-lg"
                : "bg-primary text-primary-foreground shadow-primary/25 shadow-lg hover:shadow-primary/40",
            neon: isSuccess
                ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
            minimal: isSuccess
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700",
            outline: isSuccess
                ? "border-2 border-green-500 text-green-500 bg-transparent"
                : "border-2 border-primary text-primary bg-transparent hover:bg-primary/5",
        };

        const sizeClasses = {
            sm: "px-6 py-2 text-xs rounded-lg",
            md: "px-8 py-4 text-sm rounded-xl",
            lg: "px-12 py-6 text-lg rounded-2xl",
        };

        const customStyle = accentColor && !isSuccess ? {
            backgroundColor: variant === "outline" ? "transparent" : (variant === "neon" ? `${accentColor}1a` : accentColor),
            borderColor: accentColor,
            color: variant === "outline" || variant === "neon" ? accentColor : undefined,
            boxShadow: variant === "neon" ? `0 0 15px ${accentColor}4d` : (variant === "default" ? `0 10px 15px -3px ${accentColor}40` : undefined)
        } : {};

        return (
            <Motion.button
                ref={ref as any}
                className={cn(
                    "relative overflow-hidden group flex items-center justify-center gap-2 font-bold transition-all duration-300",
                    variantClasses[variant],
                    sizeClasses[size],
                    (isProcessing || isSuccess) && "pointer-events-none opacity-80",
                    className
                )}
                style={customStyle}
                whileHover={!isProcessing && !isSuccess ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isProcessing && !isSuccess ? { scale: 0.98 } : {}}
                {...props}
            >
                {/* Background Animation */}
                <Motion.div
                    initial={{ x: "-100%" }}
                    animate={isProcessing ? { x: "100%" } : { x: "-100%" }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="absolute inset-0 bg-white/20 skew-x-12"
                />

                <span className="relative flex items-center gap-2">
                    {isProcessing ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : isSuccess ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    )}

                    {isProcessing ? "Processing..." : isSuccess ? "Order Placed!" : children || "Order Now"}
                </span>
            </Motion.button>
        );
    }
);
OrderButton.displayName = "OrderButton";
