
export const MOTION_PROPS = [
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileHover",
    "whileTap",
    "whileDrag",
    "whileFocus",
    "whileInView",
    "layout",
    "layoutId",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "onDragStart",
    "onDragEnd",
    "onDrag",
    "onDirectionLock",
    "onDragTransitionEnd",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "viewport",
    "custom",
    "inherit"
];

export function splitMotionProps<T extends Record<string, any>>(props: T) {
    const motionProps: Record<string, any> = {};
    const otherProps: Record<string, any> = {};

    for (const key in props) {
        if (MOTION_PROPS.includes(key)) {
            motionProps[key] = props[key];
        } else {
            otherProps[key] = props[key];
        }
    }

    return { motionProps, otherProps };
}
