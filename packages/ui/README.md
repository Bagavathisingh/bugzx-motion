# BugzxMotion UI Components

A premium collection of beautifully designed, fully accessible UI components built with motion primitives.

## ✨ Features

- 🎨 **Premium Design** - Modern, beautiful components inspired by the best design systems
- ⚡ **Performance First** - Optimized animations with zero runtime overhead
- 🎭 **Motion Primitives** - Built-in animations for every component
- 🌗 **Theme Support** - Light/Dark mode + Cyber/Neon variants
- ♿ **Accessible** - Built on Radix UI primitives
- 📦 **Tree-shakeable** - Import only what you need
- 🔷 **TypeScript** - Fully typed with intelligent autocomplete
- 🎯 **Customizable** - Every component accepts className and custom props

## 🚀 Components

### Core Components
- **Button** - Multiple variants (default, outline, ghost, neon) with motion effects
- **Card** - Flexible card component with hover effects
- **Input** - Form input with focus animations and neon mode
- **Switch** - Animated toggle switch
- **Checkbox** - Checkbox with scale animation
- **Tabs** - Tabbed interface with content transitions
- **Accordion** - Collapsible content panels
- **Dialog** - Modal dialogs with backdrop blur
- **Dropdown Menu** - Context menus and dropdowns

### Premium Components
- **Spotlight** - Mouse-tracking gradient spotlight effect
- **GradientBorderCard** - Cards with animated gradient borders
- **ShimmerButton** - Buttons with shimmer animation effect
- **AnimatedGridPattern** - Animated background grid pattern
- **BentoGrid** - Modern grid layout system
- **BentoCard** - Feature cards for bento grids

## 📦 Installation

```bash
npm install @bugzx-motion/next
# or
pnpm add @bugzx-motion/next
```

## 🎯 Usage

### Basic Example

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@bugzx-motion/next';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button motion="scale" variant="default">
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Premium Components

```tsx
import { 
  Spotlight, 
  GradientBorderCard, 
  ShimmerButton,
  BentoGrid,
  BentoCard 
} from '@bugzx-motion/next';

export default function PremiumDemo() {
  return (
    <div>
      {/* Spotlight Effect */}
      <Spotlight 
        className="p-8"
        spotlightColor="rgba(120,119,198,0.3)"
      >
        <h2>Hover over me!</h2>
        <p>Watch the spotlight follow your cursor</p>
      </Spotlight>

      {/* Gradient Border Card */}
      <GradientBorderCard
        gradientFrom="#667eea"
        gradientTo="#764ba2"
      >
        <h3>Beautiful Gradient Borders</h3>
      </GradientBorderCard>

      {/* Shimmer Button */}
      <ShimmerButton
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        Get Started
      </ShimmerButton>

      {/* Bento Grid */}
      <BentoGrid>
        <BentoCard
          name="Feature 1"
          description="Amazing feature description"
          Icon={MyIcon}
          cta="Learn more"
        />
      </BentoGrid>
    </div>
  );
}
```

### Cyber/Neon Mode

All components support a neon/cyber aesthetic:

```tsx
import { Button, Input, Card, TabsList } from '@bugzx-motion/next';

export default function CyberMode() {
  return (
    <div className="bg-black">
      <Button variant="neon">Execute</Button>
      <Input neon placeholder="Enter command..." />
      <Card neon>Cyber content</Card>
      <TabsList neon>Cyber tabs</TabsList>
    </div>
  );
}
```

## 🎨 Customization

Every component is built with customization in mind:

```tsx
<Button 
  variant="default"
  motion="scale"
  className="custom-class"
  whileHover={{ scale: 1.1 }}
>
  Custom Button
</Button>
```

## 🔧 Configuration

Add to your `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: [
    "@bugzx-motion/next",
    "@bugzx-motion/core",
    "@bugzx-motion/ui"
  ],
};
```

Add to your `globals.css`:

```css
@import "tailwindcss";
@source "../../../packages/ui";
```

## 📚 Documentation

Visit our [documentation](https://bugzx-motion.dev) for:
- Component API reference
- Interactive examples
- Design guidelines
- Migration guides

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © BugzxMotion

## 🌟 Inspiration

Built with inspiration from:
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)
- [Aceternity UI](https://ui.aceternity.com/)
