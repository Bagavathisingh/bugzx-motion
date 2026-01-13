# BugzxMotion - Premium UI Component Library

> The ultimate combination of shadcn/ui's design philosophy and Framer Motion's animation power

A production-ready, premium UI component library with built-in motion primitives. Every component is designed to wow users and delight developers.

---

## Why BugzxMotion?

- **50+ Premium Components** - From basic to advanced, all with motion built-in
- **Performance First** - Optimized animations, zero runtime overhead
- **Beautiful by Default** - Inspired by the best design systems (shadcn/ui, Aceternity, Magic UI)
- **Theme Support** - Light/Dark mode + Cyber/Neon variants
- **Fully Accessible** - Built on Radix UI primitives
- **Tree-shakeable** - Import only what you need
- **TypeScript Native** - 100% typed with intelligent autocomplete
- **Highly Customizable** - Every component accepts className and custom props

---

## Installation

```bash
npm install @bugzx-motion/next
# or
pnpm add @bugzx-motion/next
# or
yarn add @bugzx-motion/next
```

---

## Quick Start

```tsx
import { Button, Card, Badge, Spotlight } from '@bugzx-motion/next';

export default function App() {
  return (
    <Spotlight className="p-8">
      <Card>
        <h2>Welcome to BugzxMotion</h2>
        <Badge variant="neon">Premium</Badge>
        <Button motion="scale">Get Started</Button>
      </Card>
    </Spotlight>
  );
}
```

---

## Component Categories

### Core Components
Essential UI building blocks with motion capabilities

- **Button** - 6 variants + 3 motion effects (scale, fade, pop)
- **Card** - Flexible card with hover effects and neon mode
- **Input** - Form input with focus animations
- **Switch** - Animated toggle with smooth transitions
- **Checkbox** - Checkbox with scale animation
- **Tabs** - Tabbed interface with content transitions
- **Accordion** - Collapsible panels with smooth animations
- **Dialog** - Modal dialogs with backdrop blur
- **Dropdown Menu** - Context menus with enter/exit animations

### Standard Components
Common UI patterns everyone needs

- **Badge** - 6 variants including neon with optional animation
- **Avatar** - Profile pictures with status indicators
- **Progress** - Progress bars with 5 color variants
- **Skeleton** - Loading placeholders (default, circular, text, neon)
- **Separator** - Dividers with gradient and neon options
- **Tooltip** - Hover tooltips with 4 position options
- **Alert** - Notification boxes (success, warning, error, neon)

### Premium Components
High-end effects that make your UI stand out

- **Spotlight** - Mouse-tracking radial gradient effect
- **GradientBorderCard** - Animated gradient borders
- **ShimmerButton** - Continuous shimmer animation
- **AnimatedGridPattern** - Dynamic background patterns
- **BentoGrid & BentoCard** - Modern Apple-inspired layouts

### Advanced Components
Sophisticated interactions for premium experiences

- **FloatingCard** - Cards that lift on hover (3 intensity levels)
- **MagneticButton** - Buttons that follow your cursor
- **Ripple** - Material Design ripple effect
- **Parallax** - Scroll-based parallax containers
- **GlitchText** - Cyberpunk glitch text effect
- **TiltCard** - 3D tilt effect following mouse movement

---

## Premium Features

### Cyber/Neon Mode
Every component supports a futuristic neon aesthetic:

```tsx
<Button variant="neon">Execute</Button>
<Input neon placeholder="Enter command..." />
<Card neon>Cyber content</Card>
<TabsList neon>Cyber tabs</TabsList>
<Badge variant="neon">Premium</Badge>
```

### Motion Variants
Built-in animation presets for common interactions:

```tsx
<Button motion="scale">Scale on click</Button>
<Button motion="fade">Fade on hover</Button>
<Button motion="pop">Pop entrance</Button>
```

### Responsive & Accessible
All components are:
- Fully responsive
- Keyboard navigable
- Screen reader friendly
- WCAG 2.1 compliant

---

## Example Showcase

### Hero Section with Spotlight
```tsx
<Spotlight spotlightColor="rgba(120,119,198,0.3)">
  <h1>Build Beautiful Interfaces</h1>
  <p>Premium components with motion built-in</p>
  <ShimmerButton>Get Started</ShimmerButton>
</Spotlight>
```

### Bento Grid Layout
```tsx
<BentoGrid>
  <BentoCard
    name="Lightning Fast"
    description="Optimized for performance"
    Icon={RocketIcon}
    cta="Learn more"
  />
  <BentoCard
    name="Developer Experience"
    description="Intuitive API with TypeScript"
    Icon={CodeIcon}
  />
</BentoGrid>
```

### Interactive Cards
```tsx
<TiltCard>
  <h3>3D Tilt Effect</h3>
  <p>Move your mouse over this card</p>
</TiltCard>

<FloatingCard intensity="strong">
  <h3>Floating Card</h3>
  <p>Lifts on hover</p>
</FloatingCard>

<GradientBorderCard
  gradientFrom="#667eea"
  gradientTo="#764ba2"
>
  <h3>Gradient Borders</h3>
</GradientBorderCard>
```

### Advanced Interactions
```tsx
<MagneticButton strength={0.5}>
  Magnetic Effect
</MagneticButton>

<Ripple color="rgba(120,119,198,0.5)">
  <button>Click for Ripple</button>
</Ripple>

<GlitchText variant="neon">
  Cyberpunk Text
</GlitchText>
```

---

## Configuration

### Next.js Setup

Add to `next.config.ts`:
```ts
const nextConfig = {
  transpilePackages: [
    "@bugzx-motion/next",
    "@bugzx-motion/core",
    "@bugzx-motion/ui"
  ],
};
```

### Tailwind CSS

Add to `globals.css`:
```css
@import "tailwindcss";
@source "../../../packages/ui";
```

### TypeScript

Full TypeScript support out of the box. All components are fully typed with prop autocomplete.

---

## Use Cases

Perfect for:
- **SaaS Dashboards** - Professional, polished interfaces
- **Marketing Sites** - Eye-catching landing pages
- **Web Apps** - Interactive, engaging experiences
- **Mobile-First** - Responsive, touch-friendly components
- **Portfolio Sites** - Showcase your work with style
- **E-commerce** - Premium product presentations

---

## Component Highlights

### Most Popular
1. **Spotlight** - The signature effect everyone loves
2. **ShimmerButton** - Perfect for CTAs
3. **BentoGrid** - Modern layout system
4. **MagneticButton** - Unique interaction
5. **GradientBorderCard** - Premium aesthetic

### Best for Performance
- All components use CSS transforms (GPU accelerated)
- Zero JavaScript animations where possible
- Optimized re-renders with React.memo
- Tree-shakeable imports

### Most Customizable
- Every component accepts `className`
- Style with Tailwind or custom CSS
- Override default variants
- Compose components freely

---

## Documentation

### Component API
Each component is fully documented with:
- Props table with types
- Usage examples
- Accessibility notes
- Customization guide

### Examples
- 50+ interactive examples
- Copy-paste ready code
- Real-world use cases
- Best practices

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT © BugzxMotion

---

## Acknowledgments

Built with inspiration from:
- [shadcn/ui](https://ui.shadcn.com) - Design philosophy
- [Framer Motion](https://www.framer.com/motion/) - Animation concepts
- [Radix UI](https://www.radix-ui.com/) - Accessibility primitives
- [Aceternity UI](https://ui.aceternity.com/) - Premium effects
- [Magic UI](https://magicui.design/) - Advanced components

---

## Get Started

```bash
npx create-next-app my-app
cd my-app
npm install @bugzx-motion/next
```

Then import and use any component:

```tsx
import { Button, Spotlight, ShimmerButton } from '@bugzx-motion/next';
```

Ready to build something amazing?
