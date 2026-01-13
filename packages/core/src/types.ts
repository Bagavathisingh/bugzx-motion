import { CSSProperties } from 'react';

export type TargetValue = number | string | (number | string)[];

export type Target = {
  [K in keyof CSSProperties]: TargetValue;
} & {
  x?: TargetValue;
  y?: TargetValue;
  scale?: TargetValue;
  rotate?: TargetValue;
  opacity?: TargetValue;
};

export type Transition = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  type?: 'spring' | 'tween';
  stiffness?: number;
  damping?: number;
  mass?: number;
  repeat?: number | typeof Infinity;
  repeatType?: 'loop' | 'reverse' | 'mirror';
};

export interface MotionProps {
  initial?: Target | string | boolean;
  animate?: Target | string | boolean;
  exit?: Target | string | boolean;
  layout?: boolean | string;
  transition?: Transition;
  variants?: Record<string, Target>;
  whileHover?: Target | string | Target;
  whileTap?: Target | string | Target;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export type MotionComponentProps<T extends keyof HTMLElementTagNameMap> =
  Omit<React.ComponentPropsWithRef<T>, keyof MotionProps> & MotionProps;
