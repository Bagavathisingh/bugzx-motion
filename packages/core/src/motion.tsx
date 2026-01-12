import React, { forwardRef, useMemo, useState } from 'react';
import { MotionProps, MotionComponentProps, Target } from './types';

const transformKeys = ['x', 'y', 'scale', 'rotate'];

function convertTargetToStyles(target: any): React.CSSProperties {
  if (!target) return {};
  const styles: React.CSSProperties = { ...target };
  const transforms: string[] = [];

  if (target.x !== undefined) transforms.push(`translateX(${typeof target.x === 'number' ? `${target.x}px` : target.x})`);
  if (target.y !== undefined) transforms.push(`translateY(${typeof target.y === 'number' ? `${target.y}px` : target.y})`);
  if (target.scale !== undefined) transforms.push(`scale(${target.scale})`);
  if (target.rotate !== undefined) transforms.push(`rotate(${target.rotate}deg)`);

  if (transforms.length > 0) {
    styles.transform = transforms.join(' ');
    transformKeys.forEach(key => delete (styles as any)[key]);
  }

  return styles;
}

const componentCache = new Map<string, React.ForwardRefExoticComponent<any>>();

const createMotionComponent = (tagName: string) => {
  if (componentCache.has(tagName)) {
    return componentCache.get(tagName)!;
  }

  const Component = forwardRef<any, any>((props, ref) => {
    const {
      initial,
      animate,
      exit,
      layout,
      transition,
      variants,
      whileHover,
      whileTap,
      onAnimationStart,
      onAnimationComplete,
      style,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    } = props as any;

    const [isHovered, setIsHovered] = useState(false);
    const [isTapped, setIsTapped] = useState(false);

    // Orchestrate target based on state
    const currentTarget = useMemo(() => {
      let target: Target = {};

      // 1. Initial/Animate
      const base = typeof animate === 'string' && variants ? variants[animate] : (animate as any);
      target = { ...target, ...base };

      // 2. Hover
      if (isHovered && whileHover) {
        const hover = typeof whileHover === 'string' && variants ? variants[whileHover] : (whileHover as any);
        target = { ...target, ...hover };
      }

      // 3. Tap
      if (isTapped && whileTap) {
        const tap = typeof whileTap === 'string' && variants ? variants[whileTap] : (whileTap as any);
        target = { ...target, ...tap };
      }

      return target;
    }, [animate, variants, isHovered, whileHover, isTapped, whileTap]);

    const animatedStyles = useMemo(() => {
      const baseStyles = convertTargetToStyles(currentTarget);

      const transitionStyle = transition ? {
        transitionProperty: 'all',
        transitionDuration: `${transition.duration || 0.3}s`,
        transitionDelay: `${transition.delay || 0}s`,
        transitionTimingFunction: typeof transition.ease === 'string' ? transition.ease : 'ease-in-out',
      } : {
        transition: 'all 0.3s ease-in-out'
      };

      return {
        ...baseStyles,
        ...transitionStyle,
      };
    }, [currentTarget, transition]);

    return React.createElement(tagName, {
      ...rest,
      ref,
      onMouseEnter: (e: any) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e: any) => {
        setIsHovered(false);
        setIsTapped(false);
        onMouseLeave?.(e);
      },
      onMouseDown: (e: any) => {
        setIsTapped(true);
        onMouseDown?.(e);
      },
      onMouseUp: (e: any) => {
        setIsTapped(false);
        onMouseUp?.(e);
      },
      style: {
        ...style,
        ...animatedStyles,
      },
    });
  });

  Component.displayName = `Motion.${tagName}`;
  componentCache.set(tagName, Component);
  return Component;
};

type MotionComponents = {
  [K in keyof HTMLElementTagNameMap]: any;
} & {
  [K in keyof SVGElementTagNameMap]: any;
};

export const Motion = new Proxy({} as any, {
  get: (_target, prop: string) => {
    return createMotionComponent(prop);
  },
}) as unknown as MotionComponents;
