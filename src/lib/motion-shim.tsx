// Shim for motion/react - replaces framer-motion with simple React wrappers
import React, { useEffect, useRef, forwardRef } from 'react';

type MotionProps = {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileInView?: any;
  viewport?: any;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
};

function createMotionComponent(Tag: keyof JSX.IntrinsicElements) {
  return forwardRef<HTMLElement, MotionProps>(({ 
    initial, animate, exit, transition, whileHover, whileInView, viewport,
    children, className, style, ...rest 
  }, ref) => {
    return React.createElement(Tag as any, { ref, className, style, ...rest }, children);
  });
}

export const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  span: createMotionComponent('span'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  ul: createMotionComponent('ul'),
  li: createMotionComponent('li'),
  img: createMotionComponent('img'),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  form: createMotionComponent('form'),
};

export const AnimatePresence = ({ children }: { children?: React.ReactNode; mode?: string }) => {
  return <>{children}</>;
};
