'use client';

import React, { useState } from "react";
import {
  Button, Card, Badge, ProductCard, PricingCard, CartItem, CategoryCard,
  CourseCard, LessonItem, Navbar, SearchBar, Sidebar,
  Input, Switch, Checkbox, Tabs, TabsList, TabsTrigger, TabsContent,
  Alert, Tooltip, Avatar, Progress, Skeleton, Separator,
  Spotlight, GradientBorderCard, ShimmerButton, AnimatedGridPattern, BentoGrid, BentoCard,
  FloatingCard, MagneticButton, Ripple, GlitchText, TiltCard, Motion,
  ProductSearchBar, FilterSidebar, OrderButton, RadioGroup, RadioGroupItem,
  cn
} from "@bugzx-motion/next";
// import { Motion } from "@bugzx-motion/core"; - Removing this incorrect import
import { ComponentPlayground } from "@/components/Playground";

// Define categories
type Category = "overview" | "ecommerce" | "education" | "auth" | "navigation" | "feedback" | "premium";

export default function DocsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("overview");
  const [neonMode, setNeonMode] = useState(true);

  // Playground States
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
  const [progressVariant, setProgressVariant] = useState<any>("default");
  const [textColor, setTextColor] = useState("#ffffff");

  const renderContent = () => {
    switch (activeCategory) {
      case "overview":
        return (
          <div className="space-y-12">
            <div className="relative overflow-hidden rounded-2xl p-10 min-h-[400px] flex flex-col items-center justify-center text-center border border-border/50 bg-gradient-to-br from-transparent to-muted/20">
              <AnimatedGridPattern
                className={neonMode ? "text-cyan-500" : "text-zinc-300"}
                maxOpacity={neonMode ? 0.3 : 0.15}
              />
              <div className="relative z-10 max-w-3xl flex flex-col items-center">
                <Badge variant={neonMode ? "neon" : "default"} className="mb-4">v1.0.0 Released</Badge>
                <h1 className="text-5xl font-bold mb-6 tracking-tight">
                  Build <span className={neonMode ? "text-cyan-400" : "text-primary"}>Better</span> Interfaces <br />
                  With Motion
                </h1>
                <p className="text-xl opacity-80 mb-8 max-w-xl">
                  A premium component library that combines the best design systems with powerful motion primitives.
                </p>
                <div className="flex gap-4">
                  <ShimmerButton background={neonMode ? "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}>
                    Browser Components
                  </ShimmerButton>
                  <Button variant={neonMode ? "outline" : "outline"} className={neonMode ? "border-cyan-500 text-cyan-400" : ""}>
                    Read the Docs
                  </Button>
                </div>
              </div>
            </div>

            <BentoGrid>
              <BentoCard
                name="E-Commerce Ready"
                description="Full suite of shop components available now."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("ecommerce")}
                Icon={() => <span>🛍️</span>}
              />
              <BentoCard
                name="Education Platform"
                description="LMS components built-in for courses."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("education")}
                Icon={() => <span>🎓</span>}
              />
              <BentoCard
                name="Premium Effects"
                description="Spotlights, tilt, and glitter effects."
                className="md:col-span-1 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActiveCategory("premium")}
                Icon={() => <span>✨</span>}
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
              title="Course Card"
              description="Rich course preview with progress tracking."
              neonMode={neonMode}
              code={`<CourseCard title="React Mastery" progress={65} />`}
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

            <div className="space-y-4 max-w-xl mx-auto border p-6 rounded-xl bg-card">
              <h3 className="font-bold text-lg mb-4">Course Content</h3>
              <LessonItem index={1} title="Introduction to React" duration="5:00" isCompleted />
              <LessonItem index={2} title="Hooks Deep Dive" duration="15:30" isActive />
              <LessonItem index={3} title="Performance Optimization" duration="20:00" isLocked />
            </div>
          </div>
        );

      case "navigation":
        return (
          <div className="space-y-10 flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Navigation Components</h2>
              <p className="text-muted-foreground text-lg">Responsive and accessible navigation patterns.</p>
            </div>

            <div className="relative h-[300px] border rounded-xl overflow-hidden bg-muted/20 shadow-inner">
              <Navbar
                logo={<span className="font-bold text-xl">Logo</span>}
                items={[
                  { label: "Home", href: "#home" },
                  { label: "Features", href: "#features" },
                  { label: "Pricing", href: "#pricing" }
                ]}
                actions={<Button size="sm">Get Started</Button>}
                className="absolute w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center pt-20">
                <SearchBar variant={neonMode ? "neon" : "default"} placeholder="Try searching..." />
              </div>
            </div>

            <div className="flex flex-col gap-10 w-full">
              <ComponentPlayground
                title="Sidebar"
                description="Collapsible sidebar navigation."
                neonMode={neonMode}
                code={`<Sidebar items={...} />`}
              >
                <div className={cn(
                  "flex items-center justify-center min-h-[400px] relative p-10 overflow-auto",
                  neonMode ? "bg-black" : "bg-zinc-50/50"
                )}>
                  <div className={`absolute inset-0 opacity-[0.4] pointer-events-none ${neonMode
                    ? "bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:24px_24px]"
                    : "bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px]"
                    }`} />
                  <div className="relative z-10 flex flex-col items-center justify-center w-full">
                    <div className="h-[400px] border rounded-lg overflow-hidden flex bg-card max-w-lg w-full">
                      <Sidebar
                        items={[
                          { icon: <span>🏠</span>, label: "Home", href: "#home-dash", active: true },
                          { icon: <span>📊</span>, label: "Analytics", href: "#analytics" },
                          { icon: <span>⚙️</span>, label: "Settings", href: "#settings" },
                        ]}
                        className="h-full border-r"
                      />
                      <div className="p-8 bg-muted/10 flex-1 flex items-center justify-center text-muted-foreground">
                        Content Area
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentPlayground>

              <ComponentPlayground
                title="Tabs"
                description="Animated content switching."
                neonMode={neonMode}
                code={`<Tabs defaultValue="account">...</Tabs>`}
              >
                <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList neon={neonMode} className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account Settings</TabsTrigger>
                    <TabsTrigger value="password">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Card className="p-6">Update your account preferences and profile information here.</Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card className="p-6">Secure your account by changing your password periodically.</Card>
                  </TabsContent>
                </Tabs>
              </ComponentPlayground>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-10 flex flex-col items-center text-center w-full">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Feedback & Status</h2>
              <p className="text-muted-foreground text-lg">Communicate information and status updates to users.</p>
            </div>

            <div className="flex flex-col gap-10 w-full">
              <ComponentPlayground
                title="Alert"
                description="Informational messages with different severity levels."
                neonMode={neonMode}
                controls={[
                  { name: "variant", type: "select", value: badgeVariant, options: ["default", "destructive", "success", "warning", "neon"] },
                  { name: "color", type: "color", value: accentColor },
                  { name: "textColor", type: "color", value: textColor }
                ]}
                onControlChange={(name, val) => {
                  if (name === "variant") setBadgeVariant(val);
                  if (name === "color") setAccentColor(val);
                  if (name === "textColor") setTextColor(val);
                }}
                code={`<Alert \n  variant="${badgeVariant}" \n  accentColor="${accentColor}"\n  textColor="${textColor}"\n  title="Attention Required"\n>\n  The requested action has been completed.\n</Alert>`}
              >
                <div className="w-full max-w-xl">
                  <Alert
                    variant={badgeVariant}
                    accentColor={accentColor}
                    textColor={textColor}
                    title="System Notification"
                  >
                    This is a highly customizable alert component with support for dynamic accent and text colors.
                  </Alert>
                </div>
              </ComponentPlayground>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <div className="p-6 border rounded-xl bg-card space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider opacity-50">Contextual Tooltips</h3>
                  <div className="flex justify-around py-8">
                    <Tooltip content="Main system action" variant={neonMode ? "neon" : "default"}>
                      <Button>Hover Me</Button>
                    </Tooltip>
                    <Tooltip content="Destructive action warning" variant="default" side="bottom">
                      <Button variant="destructive">Warning</Button>
                    </Tooltip>
                  </div>
                </div>

                <div className="p-6 border rounded-xl bg-card space-y-4 text-left">
                  <h3 className="font-bold text-sm uppercase tracking-wider opacity-50">Loading States</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Skeleton variant="circular" className="w-12 h-12" />
                      <div className="space-y-2">
                        <Skeleton variant="text" className="w-[150px]" />
                        <Skeleton variant="text" className="w-[100px]" />
                      </div>
                    </div>
                    <Skeleton variant="neon" className="w-full h-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "premium":
        return (
          <div className="space-y-10 flex flex-col items-center text-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Premium Effects</h2>
              <p className="text-muted-foreground text-lg">High-end interactions for special moments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TiltCard className="flex items-center justify-center h-[200px] bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xl shadow-lg">
                3D Tilt Effect
              </TiltCard>
              <FloatingCard intensity="strong" className="flex items-center justify-center h-[200px] font-bold text-xl bg-card border">
                Floating Card
              </FloatingCard>
              <Spotlight className="flex items-center justify-center h-[200px] border cursor-default font-bold text-xl bg-zinc-900 text-white" spotlightColor="rgba(0, 255, 255, 0.4)">
                Spotlight
              </Spotlight>
            </div>

            <div className="flex flex-wrap gap-8 justify-center p-12 bg-muted/10 rounded-xl border border-dashed border-border/50">
              <MagneticButton strength={0.5} className="px-8 py-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                Magnetic Button
              </MagneticButton>
              <Ripple className="inline-block rounded-md overflow-hidden">
                <Button size="lg" variant="outline">Ripple Effect</Button>
              </Ripple>
              <GlitchText variant={neonMode ? "neon" : "default"} className="text-4xl font-mono font-bold tracking-tighter">
                GLITCH TEXT
              </GlitchText>
            </div>
          </div>
        );

      default:
        return <div>Select a category</div>;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${neonMode ? 'bg-zinc-950 text-cyan-50' : 'bg-slate-50 text-slate-900'}`}>
      <div className="flex min-h-screen">
        {/* Main Sidebar Navigation */}
        <div className={`w-72 shrink-0 sticky top-0 h-screen overflow-y-auto border-r transition-colors duration-300 ${neonMode
          ? 'border-zinc-800 bg-zinc-950/50 backdrop-blur-xl'
          : 'border-slate-200 bg-white/80 backdrop-blur-xl'
          }`}>
          <div className="p-8">
            <div className="flex items-center gap-3 font-bold text-2xl mb-10 tracking-tight">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg ${neonMode
                ? 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/20'
                : 'from-slate-900 to-slate-700 text-white shadow-slate-900/20'
                }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              Bugzx
            </div>

            <nav className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: "grid" },
                { id: "ecommerce", label: "E-Commerce", icon: "shopping-cart" },
                { id: "education", label: "Education", icon: "book-open" },
                { id: "navigation", label: "Navigation", icon: "compass" },
                { id: "feedback", label: "Feedback", icon: "message-circle" },
                { id: "premium", label: "Premium Effects", icon: "sparkles" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id as Category)}
                  className={`w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === item.id
                    ? (neonMode
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-white text-slate-900 shadow-sm border border-slate-200")
                    : "text-muted-foreground hover:bg-muted/50 hover:translate-x-1"
                    }`}
                >
                  <span className={`opacity-70 group-hover:opacity-100 transition-opacity ${activeCategory === item.id ? 'opacity-100' : ''}`}>
                    {item.icon === 'grid' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>}
                    {item.icon === 'shopping-cart' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>}
                    {item.icon === 'book-open' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>}
                    {item.icon === 'compass' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>}
                    {item.icon === 'message-circle' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>}
                    {item.icon === 'sparkles' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>}
                  </span>
                  {item.label}
                  {activeCategory === item.id && (
                    <span className={`ml-auto w-1.5 h-1.5 rounded-full ${neonMode ? 'bg-cyan-400' : 'bg-slate-900'}`} />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 mt-auto border-t border-border/50">
            <Card className={`p-4 ${neonMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200 shadow-none'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  PRO
                </div>
                <div>
                  <p className="text-xs font-bold">Bugzx Pro</p>
                  <p className="text-[10px] opacity-70">Unlock all components</p>
                </div>
              </div>
              <Button size="sm" className="w-full text-xs" variant={neonMode ? "neon" : "default"}>
                Upgrade Now
              </Button>
            </Card>
          </div>
        </div>

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
              <div className="flex gap-4">
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
