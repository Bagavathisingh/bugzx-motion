'use client';
import Link from "next/link";
import {
  Button, Badge, ShimmerButton, AnimatedGridPattern,
  BackgroundBeams, TextReveal, GlitchText, Spotlight,
  TiltCard, FloatingCard, MagneticButton, TracingBeam,
  Icon, BentoGrid, BentoCard, GlassCard, BeamCard, Motion, cn
} from "@bugzx-motion/next";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <BackgroundBeams />
        <AnimatedGridPattern
          className="text-cyan-500/10"
          maxOpacity={0.15}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge variant="neon" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              v0.0.6 Now Public
            </Badge>
          </Motion.div>

          <div className="space-y-4">
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <img
                src="/logo.png"
                alt="BugzxMotion Logo"
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </Motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Better</span> <br />
              <GlitchText variant="neon" className="bg-zinc-950 px-4 mt-2">INTERFACES</GlitchText>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-zinc-400 leading-relaxed">
              A premium component library that combines the best design systems with powerful motion primitives. Native React, zero configuration.
            </p>
          </div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link href="/docs">
              <ShimmerButton size="lg" className="px-10 py-4 text-lg font-bold">
                Browse Components
              </ShimmerButton>
            </Link>
            <Button onClick={() => window.location.href = "https://github.com/Bagavathisingh/bugzx-motion"} variant="outline" size="lg" className="px-10 py-4 h-auto border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              Star on GitHub
            </Button>
          </Motion.div>
        </div>
        <div className="absolute top-1/4 -left-20 h-[300px] w-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 h-[400px] w-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      <section className="py-24 px-6 relative border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Powerful Motion Engine</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Production-ready motion primitives that run on the CSS engine for maximum performance. Familiar API, zero learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <GlassCard className="p-8 flex flex-col items-center justify-center space-y-6 text-center border-white/5">
              <div className="h-24 flex items-center justify-center">
                <Motion.div
                  className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-cyan-400">Gestures</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Native <code>whileHover</code> and <code>whileTap</code> support for instant tactile feedback.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 flex flex-col items-center justify-center space-y-6 text-center border-white/5">
              <div className="h-24 flex items-center justify-center">
                <Motion.div
                  className="w-16 h-16 border-2 border-cyan-500/50 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                    borderColor: ["#06b6d4", "#3b82f6", "#06b6d4"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-cyan-400">Keyframes</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Complex multi-step animations using simple array values. Optimized CSS output.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 flex flex-col items-center justify-center space-y-6 text-center border-white/5">
              <div className="h-24 flex items-center justify-center">
                <svg width="60" height="60" viewBox="0 0 100 100">
                  <Motion.path
                    d="M 20, 20 L 80, 20 L 80, 80 L 20, 80 Z"
                    fill="transparent"
                    strokeWidth="4"
                    stroke="#06b6d4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-cyan-400">SVG Paths</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Advanced <code>pathLength</code> and <code>pathOffset</code> controls for stunning vector reveals.
                </p>
              </div>
            </GlassCard>

            {/* Variants */}
            <GlassCard className="p-8 flex flex-col items-center justify-center space-y-6 text-center border-white/5 group">
              <div className="h-24 flex items-center justify-center">
                <Motion.div
                  className="flex gap-2"
                  initial="closed"
                  whileHover="open"
                >
                  {[0, 1, 2].map((i) => (
                    <Motion.div
                      key={i}
                      className="w-4 h-4 bg-cyan-500 rounded-full"
                      variants={{
                        closed: { scale: 1, y: 0 },
                        open: { scale: 1.5, y: -20 }
                      }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </Motion.div>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-cyan-400">Variants</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Orchestrate complex staggered animations with named states and children propagation.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Installation & Usage Section */}
      <section className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to Start?</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Get up and running in seconds. No complex setup required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Installation */}
            <GlassCard className="p-8 space-y-6 border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <h3 className="text-xl font-bold">Installation</h3>
              </div>
              <p className="text-sm text-zinc-400">Install the package using your favorite package manager.</p>

              <div className="bg-gradient-to-br from-white/10 to-white/0 rounded-xl p-4 font-mono text-sm text-cyan-400 border border-white/10 flex items-center justify-between group cursor-pointer hover:border-cyan-500/30 transition-colors">
                <span>npm install @bugzx-motion/next</span>
                <span className="text-zinc-600 group-hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </span>
              </div>
              <div className="flex gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> TypeScript Ready</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> SSR Compatible</span>
              </div>
            </GlassCard>

            {/* Usage */}
            <GlassCard className="p-8 space-y-6 border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                </div>
                <h3 className="text-xl font-bold">Usage</h3>
              </div>
              <p className="text-sm text-zinc-400">Import and use components directly in your application.</p>

              <div className="bg-gradient-to-br from-white/10 to-white/0 rounded-xl p-4 font-mono text-sm text-zinc-300 border border-white/10 overflow-x-auto">
                <pre>
                  <span className="text-purple-400">import</span> {"{"} Motion {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@bugzx-motion/next'</span>;{"\n\n"}
                  <span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() {"{"}{"\n"}
                  {"  "}<span className="text-purple-400">return</span> ({"\n"}
                  {"    "}&lt;<span className="text-cyan-400">Motion.div</span>{"\n"}
                  {"      "}<span className="text-cyan-400">animate</span>={"{"}{"{"} <span className="text-orange-400">y</span>: <span className="text-blue-400">50</span> {"}"}{"}"}{"\n"}
                  {"      "}<span className="text-cyan-400">transition</span>={"{"}{"{"} <span className="text-orange-400">duration</span>: <span className="text-blue-400">0.5</span> {"}"}{"}"}{"\n"}
                  {"    "}/&gt;{"\n"}
                  {"  "});{"\n"}
                  {"}"}
                </pre>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
