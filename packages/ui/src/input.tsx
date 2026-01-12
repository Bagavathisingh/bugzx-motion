import * as React from "react"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    neon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, neon = false, ...props }, ref) => {
        const neonClasses = neon
            ? "border-cyan-500/50 bg-black/50 text-cyan-100 placeholder:text-cyan-800 focus-visible:ring-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
            : "border-input bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring";

        return (
            <Motion.input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                    neonClasses,
                    className
                )}
                whileHover={neon ? { borderColor: "rgba(6,182,212,0.8)", boxShadow: "0 0 15px rgba(6,182,212,0.2)" } : { borderColor: "rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.995 }}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
