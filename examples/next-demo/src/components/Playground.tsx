'use client';

import * as React from "react";
import { Button, Card, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@bugzx-motion/next";

// Simplified cn helper to avoid module resolution issues in demo
function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(" ");
}

interface PropControl {
    name: string;
    type: "text" | "number" | "boolean" | "select" | "color" | "multiselect";
    value: any;
    options?: string[];
    description?: string;
    min?: number;
    max?: number;
}

interface ComponentPlaygroundProps {
    title: string;
    description: string;
    code: string;
    controls?: PropControl[];
    onControlChange?: (name: string, value: any) => void;
    children: React.ReactNode;
    neonMode: boolean;
    componentName?: string;
}

export const ComponentPlayground = ({
    title,
    description,
    code,
    controls,
    onControlChange,
    children,
    neonMode,
    componentName: explicitComponentName
}: ComponentPlaygroundProps) => {
    const [activeTab, setActiveTab] = React.useState("preview");
    const [copied, setCopied] = React.useState(false);

    // Infer component name if not explicitly provided
    const match = code.match(/<([A-Z][a-zA-Z]*)/);
    const componentName = explicitComponentName || (match ? match[1] : "Component");

    const fullCode = `// 1. Install
npm install @bugzx-motion/next

// 2. Import
import { ${componentName} } from "@bugzx-motion/next";

// 3. Usage
${code}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col gap-2">
                <h3 className={`text-2xl font-bold ${neonMode ? "text-cyan-400" : ""}`}>{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>

            <Card className={cn(
                "overflow-hidden text-left",
                neonMode ? "bg-black/50 border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]" : "bg-white border-zinc-200 shadow-xl"
            )}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <TabsList neon={neonMode}>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        {activeTab === "code" && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopy}
                                className={neonMode ? "text-cyan-400 hover:text-cyan-300" : ""}
                            >
                                {copied ? "Copied!" : "Copy Full Code"}
                            </Button>
                        )}
                    </div>

                    <TabsContent value="preview" className="mt-0">
                        <div className="flex flex-col divide-y divide-border">
                            {/* Preview Area */}
                            <div className={cn(
                                "flex items-center justify-center min-h-[400px] relative p-12 overflow-auto",
                                neonMode ? "bg-black" : "bg-zinc-50/50"
                            )}>
                                <div className={cn(
                                    "absolute inset-0 opacity-[0.4] pointer-events-none",
                                    neonMode
                                        ? "bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:24px_24px]"
                                        : "bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px]"
                                )} />
                                <div className="relative z-10 flex flex-col items-center justify-center w-full">
                                    {children}
                                </div>
                            </div>

                            {/* Controls Area */}
                            {controls && controls.length > 0 && (
                                <div className={cn(
                                    "p-8 space-y-8",
                                    neonMode ? "bg-zinc-950/50" : "bg-zinc-50/30"
                                )}>
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground/80 mb-6">
                                        Properties
                                    </h4>
                                    {controls.map((control) => (
                                        <div key={control.name} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold uppercase text-muted-foreground">{control.name}</label>
                                                {control.description && (
                                                    <span className="text-[10px] text-muted-foreground">{control.description}</span>
                                                )}
                                            </div>

                                            {control.type === "boolean" && (
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={control.value ? (neonMode ? "neon" : "default") : "outline"}
                                                        className="cursor-pointer px-4 py-1"
                                                        onClick={() => onControlChange?.(control.name, !control.value)}
                                                    >
                                                        {control.value ? "True" : "False"}
                                                    </Badge>
                                                </div>
                                            )}

                                            {control.type === "select" && (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {control.options?.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => onControlChange?.(control.name, opt)}
                                                            className={cn(
                                                                "px-2 py-1.5 text-[10px] font-bold uppercase rounded border transition-all",
                                                                control.value === opt
                                                                    ? (neonMode ? "border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]" : "border-primary bg-primary/5 text-primary")
                                                                    : "border-border hover:bg-muted"
                                                            )}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {control.type === "multiselect" && (
                                                <div className="flex flex-wrap gap-2">
                                                    {control.options?.map((opt) => {
                                                        const isSelected = control.value.includes(opt);
                                                        return (
                                                            <Badge
                                                                key={opt}
                                                                variant={isSelected ? (neonMode ? "neon" : "default") : "outline"}
                                                                className="cursor-pointer text-[10px]"
                                                                onClick={() => {
                                                                    const newValue = isSelected
                                                                        ? control.value.filter((v: any) => v !== opt)
                                                                        : [...control.value, opt];
                                                                    onControlChange?.(control.name, newValue);
                                                                }}
                                                            >
                                                                {opt}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {control.type === "number" && (
                                                <div className="space-y-2">
                                                    <input
                                                        type="range"
                                                        min={control.min ?? 0}
                                                        max={control.max ?? 100}
                                                        value={control.value}
                                                        onChange={(e) => onControlChange?.(control.name, Number(e.target.value))}
                                                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                                    />
                                                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                                                        <span>{control.min ?? 0}</span>
                                                        <span className="text-primary font-bold">{control.value}</span>
                                                        <span>{control.max ?? 100}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {control.type === "text" && (
                                                <input
                                                    type="text"
                                                    value={control.value}
                                                    onChange={(e) => onControlChange?.(control.name, e.target.value)}
                                                    className={cn(
                                                        "w-full px-3 py-2 text-xs rounded border bg-transparent font-medium",
                                                        neonMode ? "border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20" : "border-zinc-200"
                                                    )}
                                                />
                                            )}

                                            {control.type === "color" && (
                                                <div className="space-y-3">
                                                    <div className="flex gap-2">
                                                        <div className="relative w-9 h-9 shrink-0 rounded overflow-hidden border border-border">
                                                            <input
                                                                type="color"
                                                                value={control.value}
                                                                onChange={(e) => onControlChange?.(control.name, e.target.value)}
                                                                className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer"
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={control.value}
                                                            onChange={(e) => onControlChange?.(control.name, e.target.value)}
                                                            className={cn(
                                                                "flex-1 px-3 py-2 text-xs rounded border bg-transparent font-mono",
                                                                neonMode ? "border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20" : "border-zinc-200"
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444", "#f59e0b", "#10b981"].map((c) => (
                                                            <button
                                                                key={c}
                                                                onClick={() => onControlChange?.(control.name, c)}
                                                                className={cn(
                                                                    "w-5 h-5 rounded-full border border-white/10 hover:scale-125 transition-all shadow-sm",
                                                                    control.value === c && (neonMode ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-black" : "ring-2 ring-primary ring-offset-2 ring-offset-white")
                                                                )}
                                                                style={{ backgroundColor: c }}
                                                                title={c}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="code" className="mt-0">
                        <div className={cn(
                            "p-4 space-y-6",
                            neonMode ? "bg-zinc-950 text-cyan-300" : "bg-zinc-900 text-zinc-300"
                        )}>
                            {/* Installation Section */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-semibold opacity-50 uppercase tracking-widest">
                                    <span>01.</span> Install
                                </div>
                                <div className={cn(
                                    "p-3 rounded-md border font-mono text-sm",
                                    neonMode ? "bg-black border-zinc-800" : "bg-zinc-800 border-zinc-700"
                                )}>
                                    npm install @bugzx-motion/next
                                </div>
                            </div>

                            {/* Import Section */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-semibold opacity-50 uppercase tracking-widest">
                                    <span>02.</span> Import
                                </div>
                                <div className={cn(
                                    "p-3 rounded-md border font-mono text-sm",
                                    neonMode ? "bg-black border-zinc-800" : "bg-zinc-800 border-zinc-700"
                                )}>
                                    import {'{'} {componentName} {'}'} from "@bugzx-motion/next";
                                </div>
                            </div>

                            {/* Usage Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-semibold opacity-50 uppercase tracking-widest">
                                        <span>03.</span> Usage
                                    </div>
                                </div>
                                <div className={cn(
                                    "p-3 rounded-md border font-mono text-sm overflow-x-auto",
                                    neonMode ? "bg-black border-zinc-800" : "bg-zinc-800 border-zinc-700"
                                )}>
                                    <pre className="whitespace-pre-wrap">
                                        <code>
                                            {code ? code.split(/(#(?:[\dA-Fa-f]{3}){1,2}(?!\w))/g).map((part, i) => {
                                                if (part.startsWith('#') && (part.length === 4 || part.length === 7)) {
                                                    return (
                                                        <span
                                                            key={i}
                                                            className="inline-flex items-center gap-1 px-1 rounded bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors group"
                                                            onClick={() => onControlChange?.("color", part)}
                                                            title={`Click to set accent color to ${part}`}
                                                        >
                                                            <span
                                                                className="w-2 h-2 rounded-full border border-white/20"
                                                                style={{ backgroundColor: part }}
                                                            />
                                                            <span className="text-primary font-bold">{part}</span>
                                                        </span>
                                                    );
                                                }
                                                return part;
                                            }) : null}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
};
