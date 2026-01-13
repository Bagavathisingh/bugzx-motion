import React, { forwardRef, useMemo, useState } from 'react';
import { MotionProps, MotionComponentProps, Target } from './types';
import { splitMotionProps } from './utils';

const transformKeys = ['x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY'];

// Helper to generate unique IDs for keyframes
// React.useId will be used for stable IDs


function convertTargetToStyles(target: any, isInitial: boolean = false): React.CSSProperties {
  if (!target) return {};
  const styles: any = {};

  // Pick suitable value for initial vs current
  const getVal = (val: any) => Array.isArray(val) ? (isInitial ? val[0] : val[val.length - 1]) : val;

  // Process all keys, handling arrays to prevent CSSStyleDeclaration errors
  Object.keys(target).forEach(key => {
    if (!transformKeys.includes(key) && key !== 'pathLength' && key !== 'pathOffset') {
      const val = getVal(target[key]);
      styles[key] = val;
    }
  });

  // Verify styles object before returning
  Object.keys(styles).forEach(k => {
    // Drop numeric keys (indices) which cause the CSSStyleDeclaration error
    if (!isNaN(Number(k))) {
      delete styles[k];
      return;
    }


  });

  const transforms: string[] = [];

  if (target.x !== undefined) transforms.push(`translateX(${typeof getVal(target.x) === 'number' ? `${getVal(target.x)}px` : getVal(target.x)})`);
  if (target.y !== undefined) transforms.push(`translateY(${typeof getVal(target.y) === 'number' ? `${getVal(target.y)}px` : getVal(target.y)})`);
  if (target.scale !== undefined) transforms.push(`scale(${getVal(target.scale)})`);
  if (target.rotate !== undefined) transforms.push(`rotate(${getVal(target.rotate)}deg)`);
  if (target.rotateX !== undefined) transforms.push(`rotateX(${getVal(target.rotateX)}deg)`);
  if (target.rotateY !== undefined) transforms.push(`rotateY(${getVal(target.rotateY)}deg)`);
  if (target.rotateZ !== undefined) transforms.push(`rotateZ(${getVal(target.rotateZ)}deg)`);
  if (target.skewX !== undefined) transforms.push(`skewX(${getVal(target.skewX)}deg)`);
  if (target.skewY !== undefined) transforms.push(`skewY(${getVal(target.skewY)}deg)`);

  if (transforms.length > 0) {
    const is3D = target.rotateX !== undefined || target.rotateY !== undefined;
    styles.transform = (is3D ? 'perspective(1000px) ' : '') + transforms.join(' ');
  }

  // Handle SVG specific properties
  if (target.pathLength !== undefined) {
    styles.strokeDasharray = `${getVal(target.pathLength)} 1`;
  }
  if (target.pathOffset !== undefined) {
    styles.strokeDashoffset = `-${getVal(target.pathOffset)}`;
  }

  // Final sanitization to absolutely guarantee no arrays exist
  const safeStyles: any = {};
  Object.keys(styles).forEach(k => {
    const val = styles[k];
    if (Array.isArray(val)) {
      safeStyles[k] = val[isInitial ? 0 : val.length - 1]; // Last-ditch flatten
    } else {
      safeStyles[k] = val;
    }
  });

  return safeStyles;
}

const componentCache = new Map<string, React.ForwardRefExoticComponent<any>>();

// Inject global keyframes once
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.id = 'bugzx-motion-keyframes';
  style.innerHTML = `
    @keyframes bugzx-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes bugzx-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `;
  document.head.appendChild(style);
}

const createMotionComponent = (tagName: string) => {
  if (componentCache.has(tagName)) {
    return componentCache.get(tagName)!;
  }

  const Component = forwardRef<any, any>((props, ref) => {
    const { motionProps, otherProps } = splitMotionProps(props);
    const {
      animate,
      transition,
      variants,
      whileHover,
      whileTap,
    } = motionProps;

    const {
      style,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    } = otherProps;

    const [isHovered, setIsHovered] = useState(false);
    const [isTapped, setIsTapped] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const reactId = React.useId();
    const animationId = useMemo(() => `anim-${reactId.replace(/:/g, '')}`, [reactId]);


    React.useEffect(() => {
      setHasMounted(true);
    }, []);

    const { initial } = motionProps;

    const currentTarget = useMemo(() => {
      let target: Target = {};

      const resolveVariant = (prop: any) => {
        if (!prop) return {};
        if (typeof prop === 'string') return variants ? variants[prop] : {};
        if (Array.isArray(prop)) {
          // Merge all variants in the array
          let merged = {};
          prop.forEach(p => {
            const v = resolveVariant(p);
            merged = { ...merged, ...v };
          });
          return merged;
        }
        return prop;
      };

      const initialBase = resolveVariant(initial);
      const animateBase = resolveVariant(animate);

      if (!hasMounted && initial) {
        target = { ...initialBase };
      } else {
        target = { ...animateBase };
      }

      if (isHovered && whileHover) {
        target = { ...target, ...resolveVariant(whileHover) };
      }

      if (isTapped && whileTap) {
        target = { ...target, ...resolveVariant(whileTap) };
      }

      return target;
    }, [animate, initial, variants, isHovered, whileHover, isTapped, whileTap, hasMounted]);

    const animatedStyles = useMemo(() => {
      const baseStyles = convertTargetToStyles(currentTarget, !hasMounted);

      const isInfinite = transition?.repeat === Infinity;

      const target = currentTarget as any;
      const hasKeyframes = Object.values(target).some(v => Array.isArray(v));

      if (hasKeyframes || (isInfinite && target.rotate)) {
        let keyframes = '';
        const animKeys = Object.keys(target).filter(k => Array.isArray(target[k]));

        if (animKeys.length > 0) {

          const steps = (target[animKeys[0]] as any[]).length;
          keyframes = `@keyframes ${animationId} {`;
          for (let i = 0; i < steps; i++) {
            const percentage = Math.round((i / (steps - 1)) * 100);
            keyframes += `${percentage}% {`;
            animKeys.forEach(k => {
              const val = (target[k] as any[])[i];
              if (k === 'pathLength') keyframes += `stroke-dasharray: ${val} 1;`;
              else if (k === 'pathOffset') keyframes += `stroke-dashoffset: -${val};`;
              else if (k === 'opacity') keyframes += `opacity: ${val};`;
              else if (k === 'rotate') keyframes += `transform: rotate(${val}deg);`;
              else keyframes += `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val};`;
            });
            keyframes += `}`;
          }
          keyframes += `}`;

          if (typeof document !== 'undefined') {
            const styleTag = document.getElementById('bugzx-motion-dynamic-keyframes') || (() => {
              const s = document.createElement('style');
              s.id = 'bugzx-motion-dynamic-keyframes';
              document.head.appendChild(s);
              return s;
            })();
            styleTag.innerHTML += keyframes;
          }

          return {
            ...baseStyles,
            animation: `${animationId} ${transition?.duration || 1}s ${transition?.ease || 'linear'} ${isInfinite ? 'infinite' : 'forwards'}`
          };
        } else if (isInfinite && target.rotate) {
          return {
            ...baseStyles,
            animation: `bugzx-spin ${transition?.duration || 1}s linear infinite`
          };
        }
      }


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
    }, [currentTarget, transition, animationId]);

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
