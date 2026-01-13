'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  Button, Card, Badge, ProductCard, PricingCard, CartItem, CategoryCard,
  CourseCard, LessonItem, Navbar, SearchBar, Sidebar,
  Input, Switch, Checkbox, Tabs, TabsList, TabsTrigger, TabsContent,
  Alert, Tooltip, Avatar, Progress, Skeleton, Separator,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
  Spotlight, GradientBorderCard, ShimmerButton, AnimatedGridPattern, BentoGrid, BentoCard,
  FloatingCard, MagneticButton, TracingBeam, GlitchText, TiltCard, Motion,
  ProductSearchBar, FilterSidebar, OrderButton, RadioGroup, RadioGroupItem,
  CertificateCard, StudentProgress, GlassCard, TextReveal,
  BackgroundBeams, BeamCard, StepProgress, Icon,
  cn
} from "@bugzx-motion/next";

import { ComponentPlayground } from "@/components/Playground";

// Define categories
type Category = "overview" | "ecommerce" | "education" | "auth" | "navigation" | "premium" | "icons";

export default function DocsPage() {
  // Playground States
  const [playgroundSidebarCollapsed, setPlaygroundSidebarCollapsed] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);

  const [activeCategory, setActiveCategory] = useState<Category>("overview");
  const [neonMode, setNeonMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Other States
  const [productVariant, setProductVariant] = useState<"default" | "premium">("default");
  const [progressValue, setProgressValue] = useState(65);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [searchVariant, setSearchVariant] = useState<"default" | "neon" | "minimal">("default");
  const [searchSize, setSearchSize] = useState<"sm" | "md" | "lg">("md");
  const [filterVariant, setFilterVariant] = useState<"default" | "neon" | "minimal">("neon");
  const [orderVariant, setOrderVariant] = useState<"default" | "neon" | "minimal" | "outline">("default");
  const [orderSize, setOrderSize] = useState<"sm" | "md" | "lg">("md");
  const [pricingVariant, setPricingVariant] = useState<"default" | "neon">("default");
  const [pricingPopular, setPricingPopular] = useState(true);
  const [cartVariant, setCartVariant] = useState<"default" | "minimal">("default");
  const [accentColor, setAccentColor] = useState("#06b6d4");
  const [badgeVariant, setBadgeVariant] = useState<any>("default");
  const [alertVariant, setAlertVariant] = useState<any>("default");
  const [dialogVariant, setDialogVariant] = useState<any>("pop");
  const [tooltipSide, setTooltipSide] = useState<any>("top");
  const [skeletonVariant, setSkeletonVariant] = useState<any>("default");
  const [navbarVariant, setNavbarVariant] = useState<any>("default");
  const [searchBarVariant, setSearchBarVariant] = useState<any>("default");
  const [progressVariant, setProgressVariant] = useState<any>("default");
  const [pricingPeriod, setPricingPeriod] = useState<"month" | "year">("month");
  const [activeTab, setActiveTab] = useState("design");
  const [textColor, setTextColor] = useState("#ffffff");
  const [selectedIcon, setSelectedIcon] = useState<any>("bolt");
  const [iconSize, setIconSize] = useState(64);
  const [iconVariant, setIconVariant] = useState<"default" | "neon">("neon");
  const [iconColor, setIconColor] = useState("#06b6d4");

  // Premium States
  const [glassBlur, setGlassBlur] = useState(16);
  const [glassOpacity, setGlassOpacity] = useState(0.1);
  const [textRevealText, setTextRevealText] = useState("MOTION IS POWER");
  const [textRevealStagger, setTextRevealStagger] = useState(0.05);
  const [beamColorState, setBeamColorState] = useState("#06b6d4");
  const [tiltMax, setTiltMax] = useState(15);
  const [floatingIntensity, setFloatingIntensity] = useState<any>("strong");
  const [spotlightColorState, setSpotlightColorState] = useState("rgba(6, 182, 212, 0.4)");
  const [magneticStrength, setMagneticStrength] = useState(0.5);
  const [glitchVariantState, setGlitchVariantState] = useState<any>("neon");

  const renderContent = () => {
    switch (activeCategory) {
      case "overview":
        return (
          <div className="space-y-12">
            <div className="relative overflow-hidden rounded-3xl p-12 flex flex-col items-center justify-center text-center border border-dashed border-zinc-800 bg-zinc-950/50">
              <div className="relative z-10 max-w-2xl flex flex-col items-center">
                <Badge variant="neon" className="mb-4">Documentation Overview</Badge>
                <h1 className="text-4xl font-bold mb-4 tracking-tight">
                  Design with <span className="text-cyan-400">Physics</span>
                </h1>
                <p className="text-zinc-400 leading-relaxed">
                  Welcome to the Bugzx Motion Engine documentation. Explore our interactive components, physics-based primitives, and premium layouts designed for high-performance React applications.
                </p>
              </div>
            </div>

            <GlassCard className="p-8 space-y-8 border-white/5">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Installation</h3>
                <div className="bg-gradient-to-br from-white/10 to-white/0 rounded-xl p-4 font-mono text-sm text-zinc-300 border border-white/10">
                  npm install @bugzx-motion/next
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Basic Usage</h3>
                <p className="text-zinc-400 mb-4">Import components directly from the package. All components include semantic TypeScript definitions.</p>
                <div className="bg-gradient-to-br from-white/10 to-white/0 rounded-xl p-4 font-mono text-sm text-zinc-300 border border-white/10 overflow-x-auto">
                  <pre>
                    <span className="text-purple-400">import</span> {"{"} Motion {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@bugzx-motion/next'</span>;{"\n\n"}
                    <span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() {"{"}{"\n"}
                    {"  "}<span className="text-purple-400">return</span> ({"\n"}
                    {"    "}&lt;<span className="text-cyan-400">Motion.div</span>{"\n"}
                    {"      "}<span className="text-cyan-400">animate</span>={"{"}{"{"} <span className="text-orange-400">y</span>: <span className="text-blue-400">50</span> {"}"}{"}"}{"\n"}
                    {"    "}/&gt;{"\n"}
                    {"  "});{"\n"}
                    {"}"}
                  </pre>
                </div>
              </div>
            </GlassCard>

            <BentoGrid>
              <BentoCard
                name="E-Commerce Ready"
                description="Full suite of shop components available now."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("ecommerce")}
                Icon={() => <Icon name="shopping" />}
              />
              <BentoCard
                name="Education Platform"
                description="LMS components built-in for courses."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("education")}
                Icon={() => <Icon name="education" />}
              />
              <BentoCard
                name="Premium Effects"
                description="Spotlights, tilt, and glitter effects."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("premium")}
                Icon={() => <Icon name="premium" />}
              />
            </BentoGrid>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ComponentPlayground
                title="Badge Designs"
                description="Status indicators with multiple variants and custom colors."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: badgeVariant, options: ["default", "secondary", "destructive", "outline", "success", "neon"] },
                  { name: "color", type: "color", value: accentColor },
                  { name: "textColor", type: "color", value: textColor }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setBadgeVariant(val);
                  if (name === "color") setAccentColor(val);
                  if (name === "textColor") setTextColor(val);
                }}
                code={`<Badge \n  variant="${badgeVariant}" \n  accentColor="${accentColor}"\n  textColor="${textColor}"\n>\n  Status Label\n</Badge>`}
              >
                <div className="flex gap-4 items-center">
                  <Badge variant={badgeVariant} accentColor={accentColor} textColor={textColor}>New Feature</Badge>
                  <Badge variant={badgeVariant} accentColor={accentColor} textColor={textColor} animate>Live Updates</Badge>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Progress Visualization"
                description="Animated progress bars with custom accent colors."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: progressVariant, options: ["default", "success", "warning", "danger", "neon"] },
                  { name: "value", type: "number", value: progressValue, min: 0, max: 100 },
                  { name: "color", type: "color", value: accentColor },
                  { name: "textColor", type: "color", value: textColor }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setProgressVariant(val);
                  if (name === "value") setProgressValue(val);
                  if (name === "color") setAccentColor(val);
                  if (name === "textColor") setTextColor(val);
                }}
                code={`<Progress \n  value={${progressValue}} \n  variant="${progressVariant}" \n  accentColor="${accentColor}" \n  textColor="${textColor}" \n  showLabel \n/>`}
              >
                <div className="w-full max-w-sm space-y-6">
                  <Progress value={progressValue} variant={progressVariant} accentColor={accentColor} textColor={textColor} showLabel />
                  <Progress value={progressValue * 0.7} variant={progressVariant} accentColor={accentColor} textColor={textColor} animated={false} />
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Checkbox Designs"
                description="Custom animated checkboxes with multiple variants."
                neonMode={neonMode}
                code={`<Checkbox variant="neon" />\n<Checkbox variant="default" />`}
              >
                <div className="flex flex-wrap gap-8 justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox variant="default" defaultChecked />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox variant="neon" defaultChecked />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Neon</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox variant="minimal" defaultChecked />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Minimal</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox variant="outline" defaultChecked />
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Outline</span>
                  </div>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Radio Group Designs"
                description="Animated radio buttons with multiple premium variants."
                neonMode={neonMode}
                code={`<RadioGroup variant="neon">\n  <RadioGroupItem value="1" />\n</RadioGroup>`}
              >
                <div className="flex flex-wrap gap-8 justify-center">
                  <RadioGroup defaultValue="neon" className="flex flex-row gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <RadioGroupItem value="default" variant="default" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Default</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <RadioGroupItem value="neon" variant="neon" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Neon</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <RadioGroupItem value="minimal" variant="minimal" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Minimal</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <RadioGroupItem value="outline" variant="outline" />
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">Outline</span>
                    </div>
                  </RadioGroup>
                </div>
              </ComponentPlayground>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div className="space-y-10 flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">E-Commerce Components</h2>
              <p className="text-muted-foreground text-lg">Everything you need to build a modern online store.</p>
            </div>

            <ComponentPlayground
              title="Product Card"
              description="Interactive product card with quick actions and motion effects."
              neonMode={neonMode}
              controls={[
                { name: "variant", type: "select", value: productVariant, options: ["default", "premium"] },
              ]}
              onControlChange={(_, val) => setProductVariant(val)}
              code={`<ProductCard 
  title="Premium Headphones" 
  price={299} 
  image="/headphones.jpg" 
  variant="${productVariant}" 
/>`}
            >
              <ProductCard
                title="Noise Cancelling Headphones Pro"
                price={299.00}
                originalPrice={349.00}
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
                rating={4.8}
                reviews={128}
                badge="Best Seller"
                variant={productVariant}
                className="w-[300px]"
              />
            </ComponentPlayground>

            <div className="flex flex-col gap-10 w-full">
              <ComponentPlayground
                title="Pricing Card"
                description="Conversion-optimized pricing tables."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: pricingVariant, options: ["default", "neon"] },
                  { name: "size", type: "select", value: orderSize, options: ["sm", "md", "lg"] },
                  { name: "color", type: "color", value: accentColor },
                  { name: "textColor", type: "color", value: textColor },
                  { name: "popular", type: "boolean", value: pricingPopular },
                  { name: "price", type: "number", value: 29, min: 9, max: 99 }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setPricingVariant(val);
                  if (name === "size") setOrderSize(val);
                  if (name === "color") setAccentColor(val);
                  if (name === "textColor") setTextColor(val);
                  if (name === "popular") setPricingPopular(val);
                }}
                code={`<PricingCard \n  variant="${pricingVariant}" \n  size="${orderSize}" \n  accentColor="${accentColor}" \n  textColor="${textColor}" \n  popular={${pricingPopular}} \n  name="Pro" \n  price={29} \n/>`}
              >
                <PricingCard
                  name="Pro Plan"
                  price={29}
                  features={["Unlimited Projects", "Analytics", "24/7 Support"]}
                  popular={pricingPopular}
                  variant={pricingVariant}
                  size={orderSize as any}
                  accentColor={accentColor}
                  textColor={textColor}
                  className="w-[300px]"
                />
              </ComponentPlayground>

              <ComponentPlayground
                title="Cart Item"
                description="Animated cart management."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: cartVariant, options: ["default", "minimal"] },
                  { name: "quantity", type: "number", value: cartQuantity, min: 1, max: 5 }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setCartVariant(val);
                  if (name === "quantity") setCartQuantity(val);
                }}
                code={`<CartItem \n  variant="${cartVariant}" \n  quantity={${cartQuantity}} \n/>`}
              >
                <CartItem
                  title="Headphones"
                  price={299}
                  quantity={cartQuantity}
                  onQuantityChange={setCartQuantity}
                  variant={cartVariant}
                  image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
                  className="w-full max-w-md"
                />
              </ComponentPlayground>
            </div>

            <ComponentPlayground
              title="Product Search"
              description="Modern, animated search bar with focus effects."
              neonMode={neonMode}
              controls={[
                { name: "variant", type: "select", value: searchVariant, options: ["default", "neon", "minimal"] },
                { name: "size", type: "select", value: searchSize, options: ["sm", "md", "lg"] },
                { name: "color", type: "color", value: accentColor }
              ]}
              onControlChange={(name, val) => {
                if (name === "variant") setSearchVariant(val);
                if (name === "size") setSearchSize(val);
                if (name === "color") setAccentColor(val);
              }}
              code={`<ProductSearchBar \n  variant="${searchVariant}" \n  size="${searchSize}" \n  accentColor="${accentColor}" \n  onSearch={(q) => console.log(q)} \n/>`}
            >
              <ProductSearchBar
                variant={searchVariant}
                size={searchSize}
                accentColor={accentColor}
                onSearch={(q) => alert(`Searching for: ${q}`)}
                className="max-w-md"
              />
            </ComponentPlayground>

            <div className="flex flex-col gap-10 w-full">
              <ComponentPlayground
                title="Filter Sidebar"
                description="Categorized filtering system with checkboxes."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: filterVariant, options: ["default", "neon", "minimal"] },
                  { name: "categories", type: "multiselect", value: selectedCats, options: ["Electronics", "Clothing", "Books", "Home", "Sports"] }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setFilterVariant(val);
                  if (name === "categories") setSelectedCats(val);
                }}
                code={`<FilterSidebar \n  variant="${filterVariant}" \n  selectedCategories={${JSON.stringify(selectedCats)}} \n/>`}
              >
                <FilterSidebar
                  variant={filterVariant}
                  selectedCategories={selectedCats}
                  onCategoryChange={(cat) => {
                    setSelectedCats(prev =>
                      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                    );
                  }}
                  onClearAll={() => setSelectedCats([])}
                />
              </ComponentPlayground>

              <ComponentPlayground
                title="Order Button"
                description="Call to action with processing and success states."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: orderVariant, options: ["default", "neon", "minimal", "outline"] },
                  { name: "size", type: "select", value: orderSize, options: ["sm", "md", "lg"] },
                  { name: "color", type: "color", value: accentColor }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setOrderVariant(val);
                  if (name === "size") setOrderSize(val);
                  if (name === "color") setAccentColor(val);
                }}
                code={`<OrderButton \n  variant="${orderVariant}" \n  size="${orderSize}" \n  accentColor="${accentColor}" \n  isProcessing={${orderProcessing}} \n  isSuccess={${orderSuccess}} \n/>`}
              >
                <OrderButton
                  variant={orderVariant}
                  size={orderSize}
                  accentColor={accentColor}
                  isProcessing={orderProcessing}
                  isSuccess={orderSuccess}
                  onClick={() => {
                    setOrderProcessing(true);
                    setTimeout(() => {
                      setOrderProcessing(false);
                      setOrderSuccess(true);
                      setTimeout(() => setOrderSuccess(false), 3000);
                    }, 2000);
                  }}
                >
                  Confirm Order
                </OrderButton>
              </ComponentPlayground>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-10 flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Education Components</h2>
              <p className="text-muted-foreground text-lg">Building blocks for LMS and course platforms.</p>
            </div>

            <ComponentPlayground
              title="Dashboard Stats"
              description="Visual overview of student progress metrics."
              neonMode={neonMode}
              code={`<StudentProgress \n  variant="${neonMode ? "neon" : "default"}" \n  stats={[...]} \n/>`}
            >
              <StudentProgress
                className="w-full max-w-4xl"
                variant={neonMode ? "neon" : "default"}
                stats={[
                  { label: "Courses", value: 12, icon: <Icon name="book" />, trend: "+2 this month" },
                  { label: "Points", value: "2,450", icon: <Icon name="star" /> },
                  { label: "Hours", value: 48, icon: <Icon name="clock" /> },
                  { label: "Ranking", value: "#42", icon: <Icon name="trophy" />, trend: "Top 5%" },
                ]}
              />
            </ComponentPlayground>

            <ComponentPlayground
              title="Course Card"
              description="Rich course preview with progress tracking."
              neonMode={neonMode}
              code={`<CourseCard title="React Mastery" progress={${progressValue}} />`}
              controls={[
                { name: "progress", type: "number", value: progressValue }
              ]}
              onControlChange={(_, val) => setProgressValue(val)}
            >
              <CourseCard
                title="Advanced React Patterns"
                instructor="Sarah Drasner"
                thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
                totalLessons={24}
                completedLessons={Math.floor((progressValue / 100) * 24)}
                progress={progressValue}
                category="Development"
                variant={neonMode ? "neon" : "default"}
                className="w-[350px]"
              />
            </ComponentPlayground>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full items-start">
              <ComponentPlayground
                title="Learning Path"
                description="Vertical progress tracker for course milestones."
                neonMode={neonMode}
                code={`<StepProgress \n  variant="${neonMode ? "neon" : "default"}" \n  steps={[...]} \n/>`}
              >
                <div className="w-full text-left p-4">
                  <StepProgress
                    variant={neonMode ? "neon" : "default"}
                    steps={[
                      { title: "React Fundamentals", description: "Learn the core concepts of React and its ecosystem.", status: "completed" },
                      { title: "Advanced Hooks & State", description: "Mastering useEffect, useMemo, and custom hooks.", status: "active" },
                      { title: "Server Side Rendering", description: "Deep dive into Next.js and RSC architecture.", status: "locked" },
                      { title: "Performance Tuning", description: "The final step to becoming a React master.", status: "locked" },
                    ]}
                  />
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Achievement Seal"
                description="Premium verifiable certificate for course graduates."
                neonMode={neonMode}
                code={`<CertificateCard \n  studentName="Alex Johnson" \n  courseName="React Masterclass" \n  variant="${neonMode ? "neon" : "default"}" \n/>`}
              >
                <CertificateCard
                  title="Official Certificate of Completion"
                  studentName="Alex Johnson"
                  courseName="Advanced React Architecture"
                  issueDate="January 12, 2026"
                  id="BUGZX-2026-X942"
                  variant={neonMode ? "neon" : "default"}
                  className="w-full max-w-md shadow-2xl"
                />
              </ComponentPlayground>
            </div>
          </div>
        );

      case "navigation":
        return (
          <div className="space-y-10 flex flex-col items-center text-center w-full">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4 font-mono tracking-tighter">Navigation & Feedback</h2>
              <p className="text-muted-foreground text-lg italic">
                Modern patterns for moving through apps and communicating status.
              </p>
            </div>

            <Tabs defaultValue="nav-core" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList neon={neonMode}>
                  <TabsTrigger value="nav-core">Navigation Core</TabsTrigger>
                  <TabsTrigger value="nav-feedback">Feedback & Status</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="nav-core" className="space-y-12">
                <div className="grid grid-cols-1 gap-10">
                  <ComponentPlayground
                    title="Interactive Navbar"
                    description="Responsive header with animated entry and glass effects."
                    neonMode={neonMode}
                    controls={[{ name: "variant", type: "select", value: navbarVariant, options: ["default", "neon"] }]}
                    onControlChange={(name, val) => setNavbarVariant(val)}
                    code={`<Navbar \n  variant="${navbarVariant}" \n  logo={...} \n  items={[...]} \n/>`}
                  >
                    <div className="relative h-[300px] w-full border rounded-2xl overflow-hidden bg-slate-950/5 shadow-2xl group flex flex-col">
                      <Navbar
                        logo={<div className="flex items-center gap-2">
                          <div className={cn("w-8 h-8 rounded-lg", navbarVariant === "neon" ? "bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "bg-primary")} />
                          <span className="font-black text-xl tracking-tighter uppercase">Motion</span>
                        </div>}
                        items={[
                          { label: "Products", href: "#" },
                          { label: "Solutions", href: "#" },
                          { label: "Enterprise", href: "#" }
                        ]}
                        actions={<div className="flex gap-2">
                          <Button variant="ghost" size="sm">Log in</Button>
                          <Button size="sm" variant={navbarVariant === "neon" ? "neon" : "default"}>Sign Up</Button>
                        </div>}
                        className="absolute w-full"
                        variant={navbarVariant}
                      />
                      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                        <h4 className="text-xl font-bold mb-2">Main Content Area</h4>
                        <p className="text-sm opacity-50">Scrolling will trigger the glass effect on the navbar.</p>
                      </div>
                    </div>
                  </ComponentPlayground>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <ComponentPlayground
                      title="Command Search"
                      description="Search bar with keyboard shortcuts and variants."
                      neonMode={neonMode}
                      controls={[{ name: "variant", type: "select", value: searchBarVariant, options: ["default", "minimal", "neon"] }]}
                      onControlChange={(name, val) => setSearchBarVariant(val)}
                      code={`<SearchBar variant="${searchBarVariant}" placeholder="Search..." />`}
                    >
                      <div className="p-10 flex items-center justify-center w-full">
                        <SearchBar variant={searchBarVariant} placeholder="Try searching 'Animations'..." className="max-w-md w-full" />
                      </div>
                    </ComponentPlayground>

                    <div className="space-y-6">
                      <ComponentPlayground
                        title="Smart Sidebar"
                        description="Redesigned with sliding indicators and spring physics."
                        neonMode={neonMode}
                        code={`<Sidebar items={[...]} variant="${neonMode ? "neon" : "default"}" collapsed={playgroundSidebarCollapsed} onToggle={() => setPlaygroundSidebarCollapsed(!playgroundSidebarCollapsed)} />`}
                      >
                        <div className="h-[450px] border rounded-2xl overflow-hidden flex bg-card/30 backdrop-blur-sm w-full shadow-2xl relative">
                          <Sidebar
                            layoutId="sidebar-playground"
                            collapsed={playgroundSidebarCollapsed}
                            onToggle={() => setPlaygroundSidebarCollapsed(!playgroundSidebarCollapsed)}
                            items={[
                              {
                                icon: <Icon name="home" />,
                                label: "Dashboard",
                                active: activeSidebarItem === 0,
                                onClick: () => setActiveSidebarItem(0)
                              },
                              {
                                icon: <Icon name="user" />,
                                label: "Team",
                                active: activeSidebarItem === 1,
                                onClick: () => setActiveSidebarItem(1)
                              },
                              {
                                icon: <Icon name="layer" />,
                                label: "Projects",
                                active: activeSidebarItem === 2,
                                onClick: () => setActiveSidebarItem(2)
                              },
                            ]}
                            variant={neonMode ? "neon" : "default"}
                            className={cn(
                              "h-full border-r",
                              playgroundSidebarCollapsed ? "w-20" : "w-64"
                            )}
                          />
                          <div className="flex-1 p-8">
                            <div className="grid grid-cols-1 gap-4">
                              {[0, 1, 2].map((i) => (
                                <button
                                  key={i}
                                  onClick={() => setActiveSidebarItem(i)}
                                  className={cn(
                                    "p-4 border rounded-xl transition-all text-left",
                                    activeSidebarItem === i ? "border-cyan-500 bg-cyan-500/10 shadow-lg" : "hover:bg-muted/50"
                                  )}
                                >
                                  <span className="font-bold">Item {i + 1}</span>
                                  <p className="text-xs opacity-50">Click to switch sidebar active state</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ComponentPlayground>
                    </div>

                    <ComponentPlayground
                      title="Premium Tabs"
                      description="Reimagined with physics-based sliding active state."
                      neonMode={neonMode}
                      code={`<Tabs defaultValue="design">\n  <TabsList neon={${neonMode}}>\n    <TabsTrigger value="design">Design</TabsTrigger>\n    <TabsTrigger value="code">Code</TabsTrigger>\n  </TabsList>\n</Tabs>`}
                    >
                      <Tabs defaultValue="design" className="w-full">
                        <TabsList neon={neonMode} className="w-full max-w-[300px] mx-auto">
                          <TabsTrigger value="design">Design</TabsTrigger>
                          <TabsTrigger value="code">Logic</TabsTrigger>
                          <TabsTrigger value="perf">Speed</TabsTrigger>
                        </TabsList>
                        <div className="mt-8 px-4 h-32 flex items-center justify-center text-center">
                          <TabsContent value="design" animation="slide">
                            <p className="text-lg font-medium">Beauty in every pixel.<br /><span className="text-sm opacity-50 font-normal">Our design system is built for the web.</span></p>
                          </TabsContent>
                          <TabsContent value="code" animation="slide">
                            <p className="text-lg font-medium">Clean, performant code.<br /><span className="text-sm opacity-50 font-normal">TypeScript first, accessibility always.</span></p>
                          </TabsContent>
                          <TabsContent value="perf" animation="slide">
                            <p className="text-lg font-medium">Blazing fast interactions.<br /><span className="text-sm opacity-50 font-normal">Optimized for 120fps animations.</span></p>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </ComponentPlayground>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nav-feedback" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                  <ComponentPlayground
                    title="Modern Alert"
                    description="Contextual status messages with spring entries."
                    neonMode={neonMode}
                    controls={[
                      { name: "variant", type: "select", value: alertVariant, options: ["default", "destructive", "success", "warning", "neon"] },
                      { name: "color", type: "color", value: accentColor }
                    ]}
                    onControlChange={(name, val) => {
                      if (name === "variant") setAlertVariant(val);
                      if (name === "color") setAccentColor(val);
                    }}
                    code={`<Alert variant="${alertVariant}" accentColor="${accentColor}" title="...">...</Alert>`}
                  >
                    <Alert
                      variant={alertVariant}
                      accentColor={accentColor}
                      title="System Update"
                      className="max-w-md mx-auto"
                      icon={<Icon name="info" />}
                    >
                      A new version of the dashboard is available. Please refresh to see the latest changes.
                    </Alert>
                  </ComponentPlayground>

                  <ComponentPlayground
                    title="Premium Dialog"
                    description="Glassmorphic pop-ups with spring physics."
                    neonMode={neonMode}
                    controls={[
                      { name: "variant", type: "select", value: dialogVariant, options: ["pop", "slide", "fade"] },
                    ]}
                    onControlChange={(name, val) => setDialogVariant(val)}
                    code={`<DialogContent animation="${dialogVariant}" ... />`}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={neonMode ? "neon" : "default"} size="lg" className="rounded-full px-8">Launch Demo Pop-up</Button>
                      </DialogTrigger>
                      <DialogContent animation={dialogVariant as any} accentColor={accentColor}>
                        <DialogHeader>
                          <DialogTitle>Confirmation Required</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to proceed with this high-priority action?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild><Button variant="outline">Back</Button></DialogClose>
                          <Button style={{ backgroundColor: accentColor }}>Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </ComponentPlayground>

                  <ComponentPlayground
                    title="Intelligent Tooltips"
                    description="Popovers that follow the layout."
                    neonMode={neonMode}
                    controls={[{ name: "side", type: "select", value: tooltipSide, options: ["top", "bottom", "left", "right"] }]}
                    onControlChange={(name, val) => setTooltipSide(val)}
                    code={`<Tooltip side="${tooltipSide}" ... />`}
                  >
                    <div className="py-20">
                      <Tooltip content="Helper text is here" side={tooltipSide} variant={neonMode ? "neon" : "default"}>
                        <Button variant="outline" className="border-dashed border-2">Hover to Inspect</Button>
                      </Tooltip>
                    </div>
                  </ComponentPlayground>

                  <ComponentPlayground
                    title="Loading Skeletons"
                    description="Vibrant placeholders for asynchronous content."
                    neonMode={neonMode}
                    controls={[{ name: "variant", type: "select", value: skeletonVariant, options: ["default", "circular", "text", "neon"] }]}
                    onControlChange={(name, val) => setSkeletonVariant(val)}
                    code={`<Skeleton variant="${skeletonVariant}" ... />`}
                  >
                    <div className="w-full max-w-sm space-y-6">
                      <div className="flex items-center gap-4">
                        <Skeleton variant="circular" className="w-14 h-14 shrink-0" accentColor={accentColor} />
                        <div className="space-y-3 flex-1">
                          <Skeleton variant="text" className="w-3/4 h-5" accentColor={accentColor} />
                          <Skeleton variant="text" className="w-1/2 h-3 opacity-50" accentColor={accentColor} />
                        </div>
                      </div>
                      <Skeleton variant={skeletonVariant} className="w-full h-32" accentColor={accentColor} />
                    </div>
                  </ComponentPlayground>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );


      case "premium":
        return (
          <div className="space-y-16 flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <TextReveal
                text="PREMIUM EFFECTS"
                variant={neonMode ? "neon" : "default"}
                className="text-5xl font-black tracking-tighter justify-center mb-4"
              />
              <p className="text-muted-foreground text-lg">High-end interactions for special moments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              <ComponentPlayground
                title="Glassmorphism"
                description="Ultra-smooth frosted glass with dynamic scaling."
                neonMode={neonMode}
                controls={[
                  { name: "blur", type: "number", value: glassBlur, min: 0, max: 40 },
                  { name: "opacity", type: "number", value: glassOpacity * 100, min: 0, max: 100, description: "Opacity %" }
                ]}
                onControlChange={(name, val) => {
                  if (name === "blur") setGlassBlur(val);
                  if (name === "opacity") setGlassOpacity(val / 100);
                }}
                code={`<GlassCard \n  blur={${glassBlur}} \n  opacity={${glassOpacity.toFixed(2)}} \n>\n  Content\n</GlassCard>`}
              >
                <div className="relative p-10 flex items-center justify-center min-h-[300px] w-full bg-gradient-to-tr from-rose-500/20 via-indigo-500/20 to-cyan-500/20 rounded-3xl overflow-hidden">
                  <div className="absolute top-4 left-4 w-20 h-20 bg-rose-500 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-cyan-500 rounded-full blur-2xl animate-pulse" />
                  <GlassCard blur={glassBlur} opacity={glassOpacity} className="w-full max-w-xs text-center border-white/10">
                    <div className="h-12 w-12 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white">
                      <Icon name="diamond" />
                    </div>
                    <h4 className="font-bold text-white mb-2">Frosted Glass</h4>
                    <p className="text-xs text-white/60">Dynamic background blur that responds to movement.</p>
                  </GlassCard>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Text Entrance"
                description="Character-by-character reveal with rotateX physics."
                neonMode={neonMode}
                controls={[
                  { name: "text", type: "text", value: textRevealText },
                  { name: "stagger", type: "number", value: textRevealStagger * 100, min: 1, max: 20, description: "Delay (ms)" }
                ]}
                onControlChange={(name, val) => {
                  if (name === "text") setTextRevealText(val);
                  if (name === "stagger") setTextRevealStagger(val / 100);
                }}
                code={`<TextReveal \n  text="${textRevealText}" \n  stagger={${textRevealStagger.toFixed(2)}} \n/>`}
              >
                <div className="p-10 flex flex-col items-center justify-center min-h-[300px] w-full bg-slate-950 rounded-3xl">
                  <TextReveal
                    text={textRevealText}
                    variant={neonMode ? "neon" : "default"}
                    stagger={textRevealStagger}
                    className="text-5xl font-black tracking-tighter text-center"
                  />
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Boundary Beam"
                description="Futuristic border glow that rotates around the card."
                neonMode={neonMode}
                controls={[
                  { name: "color", type: "color", value: beamColorState }
                ]}
                onControlChange={(name, val) => {
                  if (name === "color") setBeamColorState(val);
                }}
                code={`<BeamCard beamColor="${beamColorState}">\n  Content\n</BeamCard>`}
              >
                <div className="p-10 flex items-center justify-center w-full">
                  <BeamCard beamColor={beamColorState} className="w-full max-w-xs">
                    <div className="space-y-4">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${beamColorState}20`, color: beamColorState }}>
                        <Icon name="bolt" />
                      </div>
                      <h4 className="font-bold text-lg text-white">Quantum Speed</h4>
                      <p className="text-sm text-zinc-400">Optimized for interaction latency.</p>
                      <Button variant={neonMode ? "neon" : "default"} size="sm" className="w-full" style={neonMode ? {} : { backgroundColor: beamColorState }}>Activate</Button>
                    </div>
                  </BeamCard>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Tracing Beam"
                description="Scroll-activated vertical indicator for storytelling layouts."
                neonMode={neonMode}
                controls={[
                  { name: "color", type: "color", value: beamColorState }
                ]}
                onControlChange={(name, val) => {
                  if (name === "color") setBeamColorState(val);
                }}
                code={`<TracingBeam>\n  <div className="space-y-10">\n    <section>Layer 1</section>\n    <section>Layer 2</section>\n  </div>\n</TracingBeam>`}
              >
                <div className="h-[400px] w-full overflow-y-auto p-10 bg-zinc-900/5 rounded-3xl border border-dashed relative">
                  <TracingBeam style={{ color: beamColorState }}>
                    <div className="space-y-12 py-10">
                      <div className="space-y-4">
                        <div className="h-6 w-24 rounded-full border flex items-center justify-center text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${beamColorState}20`, borderColor: `${beamColorState}30`, color: beamColorState }}>Phase 01</div>
                        <h3 className="text-2xl font-bold">Foundation Design</h3>
                        <p className="text-zinc-500 leading-relaxed">Establish the core design tokens and physical constant for the motion engine.</p>
                      </div>
                      <div className="space-y-4 opacity-70">
                        <div className="h-6 w-24 rounded-full border flex items-center justify-center text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${beamColorState}20`, borderColor: `${beamColorState}30`, color: beamColorState }}>Phase 02</div>
                        <h3 className="text-2xl font-bold text-zinc-400">Physics Implementation</h3>
                        <p className="text-zinc-500 leading-relaxed">Inject spring-based mechanics into the rendering pipeline.</p>
                      </div>
                    </div>
                  </TracingBeam>
                  <div className="absolute bottom-4 right-4 text-[10px] opacity-30 italic">Try scrolling inside ↑</div>
                </div>
              </ComponentPlayground>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
              <ComponentPlayground
                title="3D Perspective"
                description="Advanced mouse tracking for realistic depth and tilt."
                neonMode={neonMode}
                className="max-w-3xl mx-auto"
                previewHeight="min-h-[250px]"
                controls={[
                  { name: "maxTilt", type: "number", value: tiltMax, min: 5, max: 45 }
                ]}
                onControlChange={(name, val) => {
                  if (name === "maxTilt") setTiltMax(val);
                }}
                code={`<TiltCard maxTilt={${tiltMax}}>\n  3D Perspective\n</TiltCard>`}
              >
                <div className="p-10 flex items-center justify-center w-full">
                  <TiltCard maxTilt={tiltMax} className="flex items-center justify-center w-full max-w-xs h-[200px] bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xl shadow-2xl border-2 border-white/10 rounded-2xl">
                    3D Perspective
                  </TiltCard>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Physics Float"
                description="Simulated gravity and atmosphere for elements."
                neonMode={neonMode}
                className="max-w-3xl mx-auto"
                previewHeight="min-h-[250px]"
                controls={[
                  { name: "intensity", type: "select", value: floatingIntensity, options: ["subtle", "medium", "strong"] }
                ]}
                onControlChange={(name, val) => {
                  if (name === "intensity") setFloatingIntensity(val);
                }}
                code={`<FloatingCard intensity="${floatingIntensity}">\n  Physics Float\n</FloatingCard>`}
              >
                <div className="p-10 flex items-center justify-center w-full">
                  <FloatingCard intensity={floatingIntensity} className="flex items-center justify-center w-full max-w-xs h-[200px] font-bold text-xl bg-card border shadow-2xl rounded-2xl">
                    Physics Float
                  </FloatingCard>
                </div>
              </ComponentPlayground>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              <ComponentPlayground
                title="Dynamic Spotlight"
                description="Interactive light source that follows mouse movement."
                neonMode={neonMode}
                controls={[
                  { name: "color", type: "color", value: spotlightColorState }
                ]}
                onControlChange={(name, val) => {
                  if (name === "color") setSpotlightColorState(val);
                }}
                code={`<Spotlight spotlightColor="${spotlightColorState}">\n  Spotlight\n</Spotlight>`}
              >
                <div className="p-10 flex items-center justify-center w-full">
                  <Spotlight className="flex items-center justify-center w-full max-w-xs h-[200px] border cursor-default font-bold text-xl bg-zinc-900 text-white rounded-2xl" spotlightColor={spotlightColorState}>
                    Dynamic Spotlight
                  </Spotlight>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Magnetic Force"
                description="Attracts elements toward the pointer within a radius."
                neonMode={neonMode}
                controls={[
                  { name: "strength", type: "number", value: magneticStrength * 100, min: 10, max: 100 }
                ]}
                onControlChange={(name, val) => {
                  if (name === "strength") setMagneticStrength(val / 100);
                }}
                code={`<MagneticButton strength={${magneticStrength}}>\n  Magnetic\n</MagneticButton>`}
              >
                <div className="p-10 flex items-center justify-center w-full">
                  <MagneticButton strength={magneticStrength} className="px-10 py-5 bg-black text-white rounded-full shadow-2xl hover:shadow-cyan-500/20 transition-shadow border border-white/10 font-bold text-lg">
                    Magnetic Force
                  </MagneticButton>
                </div>
              </ComponentPlayground>
            </div>

            <div className="w-full mt-10">
              <ComponentPlayground
                title="Glitch Transformation"
                description="High-frequency displacement for cyberpunk aesthetics."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: glitchVariantState, options: ["default", "neon"] }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setGlitchVariantState(val);
                }}
                code={`<GlitchText variant="${glitchVariantState}">\n  TRANSFORM\n</GlitchText>`}
              >
                <div className="p-16 flex items-center justify-center w-full bg-slate-950 rounded-3xl min-h-[200px] overflow-hidden">
                  <GlitchText variant={glitchVariantState} className="text-6xl font-black font-mono tracking-tighter">
                    CYBERPUNK
                  </GlitchText>
                </div>
              </ComponentPlayground>
            </div>
          </div>
        );

      case "icons":
        return (
          <div className="space-y-16 flex flex-col items-center">
            <div className="max-w-2xl text-center">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Icons & Assets</h2>
              <p className="text-muted-foreground text-lg">Custom curated SVG icons optimized for motion interactions.</p>
            </div>

            <ComponentPlayground
              title="Interactive Icon"
              description="Test any icon with dynamic scaling and Neon Mode integration."
              neonMode={neonMode}
              className="max-w-3xl mx-auto"
              previewHeight="min-h-[250px]"
              controls={[
                { name: "name", type: "select", value: selectedIcon, options: ["shopping", "education", "premium", "diamond", "bolt", "layer", "home", "compass", "book", "star", "clock", "trophy", "user", "info"] },
                { name: "size", type: "number", value: iconSize, min: 16, max: 200 },
                { name: "color", type: "color", value: iconColor },
                { name: "variant", type: "select", value: iconVariant, options: ["default", "neon"] }
              ]}
              onControlChange={(name, val) => {
                if (name === "name") setSelectedIcon(val);
                if (name === "size") setIconSize(val);
                if (name === "color") setIconColor(val);
                if (name === "variant") setIconVariant(val);
              }}
              code={`<Icon \n  name="${selectedIcon}" \n  size={${iconSize}} \n  variant="${iconVariant}" \n  style={{ color: "${iconColor}" }} \n/>`}
            >
              <div className="p-12 flex items-center justify-center">
                <Icon
                  name={selectedIcon}
                  size={iconSize}
                  variant={iconVariant}
                  style={{ color: iconColor }}
                  className="transition-all duration-300"
                />
              </div>
            </ComponentPlayground>

            <div className="w-full h-px bg-border/50" />

            <div className="w-full">
              <h3 className="text-2xl font-bold mb-8">Glyph Library</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                {[
                  "shopping", "education", "premium", "diamond", "bolt",
                  "layer", "home", "compass", "book", "star",
                  "clock", "trophy", "user", "info"
                ].map((name) => (
                  <div key={name} className="group relative">
                    <div className={cn(
                      "h-32 border rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300",
                      neonMode ? "bg-zinc-900 border-zinc-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]" : "bg-white border-zinc-100 hover:shadow-xl"
                    )}>
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        <Icon name={name as any} variant={neonMode ? "neon" : "default"} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl p-10 rounded-3xl border border-dashed border-border/50 bg-muted/5 mt-10">
              <h4 className="text-xl font-bold mb-6">Usage in Motion Content</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-70">
                <div className="space-y-2">
                  <p className="font-bold text-foreground">1. Scalable SVG Primitives</p>
                  <p>All icons are built as pure React SVGs, allowing the Motion engine to inject transformations directly into the paths.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-foreground">2. Dynamic Theming</p>
                  <p>Icons inherit current stroke and fill properties, making them automatically compatible with Neon Mode.</p>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={cn(
                "p-8 rounded-3xl border space-y-4",
                neonMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-100"
              )}>
                <div className="flex items-center gap-3">
                  <Icon name="home" size={20} className="text-primary" />
                  <h5 className="font-bold">Navigation</h5>
                </div>
                <p className="text-sm opacity-60">Optimized line weights for sidebar and header menu systems at small scales (16-20px).</p>
              </div>

              <div className={cn(
                "p-8 rounded-3xl border space-y-4",
                neonMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-100"
              )}>
                <div className="flex items-center gap-3">
                  <Icon name="bolt" size={20} className="text-primary" />
                  <h5 className="font-bold">Interactions</h5>
                </div>
                <p className="text-sm opacity-60">Designed with clear paths to trigger entrance animations or magnetic attraction effects.</p>
              </div>

              <div className={cn(
                "p-8 rounded-3xl border space-y-4",
                neonMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-100"
              )}>
                <div className="flex items-center gap-3">
                  <Icon name="info" size={20} className="text-primary" />
                  <h5 className="font-bold">System Status</h5>
                </div>
                <p className="text-sm opacity-60">High-visibility metaphors for alerts, tooltips, and real-time system feedback loops.</p>
              </div>
            </div>

            <div className="w-full h-px bg-border/50" />

            <ComponentPlayground
              title="Iconic Buttons"
              description="Seamlessly integrate icons into action elements."
              neonMode={neonMode}
              className="max-w-3xl mx-auto"
              previewHeight="min-h-[250px]"
              code={`<Button variant="neon" className="gap-2">\n  <Icon name="bolt" />\n  Launch Protocol\n</Button>`}
            >
              <div className="flex flex-wrap gap-6 items-center justify-center p-12">
                <Button variant={neonMode ? "neon" : "default"} className="gap-3 px-8 py-6 rounded-2xl h-auto">
                  <Icon name="bolt" size={20} />
                  <span className="text-lg font-bold">Fast Activation</span>
                </Button>

                <Button variant="outline" className="gap-3 px-8 py-6 rounded-2xl h-auto border-2">
                  <Icon name="education" size={20} />
                  <span className="text-lg font-bold">Start Learning</span>
                </Button>

                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                      <Icon name="user" size={20} />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    +12
                  </div>
                </div>
              </div>
            </ComponentPlayground>
          </div>
        );

      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${neonMode ? 'bg-zinc-950 text-cyan-50' : 'bg-slate-50 text-slate-900'}`}>
      <div className="flex min-h-screen">
        <Sidebar
          variant={neonMode ? "neon" : "default"}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "h-screen shrink-0 border-r",
            sidebarCollapsed ? "w-20" : "w-72"
          )}
          logo={
            <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
              <img
                src="/logo.png"
                alt="BugzxMotion"
                className="w-10 h-10"
              />
              <span className={neonMode ? "text-cyan-400" : "text-slate-900"}>BugzxMotion</span>
            </div>
          }
          items={[
            {
              label: "Overview",
              icon: <Icon name="home" size={18} />,
              active: activeCategory === "overview",
              onClick: () => setActiveCategory("overview")
            },
            {
              label: "Navigation & Feedback",
              icon: <Icon name="compass" size={18} />,
              active: activeCategory === "navigation",
              onClick: () => setActiveCategory("navigation")
            },
            {
              label: "E-Commerce",
              icon: <Icon name="shopping" size={18} />,
              active: activeCategory === "ecommerce",
              onClick: () => setActiveCategory("ecommerce")
            },
            {
              label: "Education",
              icon: <Icon name="book" size={18} />,
              active: activeCategory === "education",
              onClick: () => setActiveCategory("education")
            },
            {
              label: "Premium Effects",
              icon: <Icon name="premium" size={18} />,
              active: activeCategory === "premium",
              onClick: () => setActiveCategory("premium")
            },
            {
              label: "Icons & Assets",
              icon: <Icon name="layer" size={18} />,
              active: activeCategory === "icons",
              onClick: () => setActiveCategory("icons")
            },
          ]}
          footer={null}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto h-screen relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          <header className={`sticky top-0 z-30 px-10 py-6 border-b backdrop-blur-md transition-colors duration-300 ${neonMode
            ? 'bg-zinc-950/80 border-zinc-800/50'
            : 'bg-white/80 border-slate-200/50'
            }`}>
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div>
                <p className="text-xs font-bold tracking-wider opacity-50 mb-1 uppercase">Documentation</p>
                <h2 className="text-2xl font-bold capitalize tracking-tight">{activeCategory.replace('-', ' ')}</h2>
              </div>
              <div className="flex gap-4 items-center">
                <Link href="/" className="text-xs font-bold text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-widest mr-4">
                  ← Back to site
                </Link>
                <Button variant="ghost" size="sm" className="gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  GitHub
                </Button>
                <Button variant={neonMode ? "neon" : "default"} size="sm" className="shadow-lg shadow-primary/25">
                  Download Package
                </Button>
              </div>
            </div>
          </header>

          <main className="p-10 max-w-6xl mx-auto pb-40">
            <Motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </Motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
