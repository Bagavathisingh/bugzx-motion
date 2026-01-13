'use client';

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Motion } from "@bugzx-motion/core"
import { cn } from "./utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        asChild
    >
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "fixed inset-0 z-50 bg-black/60 backdrop-blur-md",
                className
            )}
            {...props}
        />
    </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
        animation?: "fade" | "pop" | "slide";
        accentColor?: string;
        textColor?: string;
    }
>(({ className, children, animation = "pop", accentColor, textColor, ...props }, ref) => {
    const animationProps = React.useMemo(() => {
        switch (animation) {
            case "pop":
                return {
                    initial: { opacity: 0, scale: 0.9, x: "-50%", y: "-45%" },
                    animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
                    exit: { opacity: 0, scale: 0.9, x: "-50%", y: "-45%" },
                    transition: { type: "spring", damping: 25, stiffness: 350 }
                };
            case "slide":
                return {
                    initial: { opacity: 0, x: "-50%", y: "20%" },
                    animate: { opacity: 1, x: "-50%", y: "-50%" },
                    exit: { opacity: 0, x: "-50%", y: "20%" },
                    transition: { type: "spring", damping: 30, stiffness: 300 }
                };
            case "fade":
                return {
                    initial: { opacity: 0, x: "-50%", y: "-50%" },
                    animate: { opacity: 1, x: "-50%", y: "-50%" },
                    exit: { opacity: 0, x: "-50%", y: "-50%" },
                };
            default:
                return {};
        }
    }, [animation]);

    const customStyle = {
        ...(accentColor ? {
            "--accent-glow": `${accentColor}33`,
            borderColor: `${accentColor}66`
        } : {}),
        ...(textColor ? { color: textColor } : {})
    };

    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                asChild
                {...props}
            >
                <Motion.div
                    {...animationProps}
                    className={cn(
                        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border bg-background/95 p-6 shadow-2xl backdrop-blur-xl sm:rounded-2xl overflow-hidden",
                        accentColor && "shadow-[0_0_50px_-12px_var(--accent-glow)]",
                        className
                    )}
                    style={customStyle as any}
                >
                    {accentColor && (
                        <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{ backgroundColor: accentColor }}
                        />
                    )}
                    {children}
                    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 opacity-70 transition-all hover:opacity-100 hover:bg-muted focus:outline-none">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.8536L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </Motion.div>
            </DialogPrimitive.Content>
        </DialogPortal>
    )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
