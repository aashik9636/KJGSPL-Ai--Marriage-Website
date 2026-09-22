'use client';
import React, { forwardRef, useEffect, useRef, createContext, useContext } from 'react';

// Self-contained Lenis Smooth Scroll Engine & Provider for high-performance React smooth scrolling
interface LenisContextType {
  lenis: any;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export interface ReactLenisProps {
  children: React.ReactNode;
  root?: boolean;
  options?: any;
}

export const ReactLenis: React.FC<ReactLenisProps> = ({ children, root = true }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isRunning = true;
    let rafId: number | null = null;

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      isRunning = false;
      window.removeEventListener('wheel', onWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [root]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};

export interface SmoothScrollProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  root?: boolean;
}

const Component = forwardRef<HTMLElement, SmoothScrollProps>(({ children, root = true, ...props }, ref) => {
  if (children) {
    return (
      <ReactLenis root={root}>
        <main ref={ref} {...props}>
          {children}
        </main>
      </ReactLenis>
    );
  }

  return (
    <ReactLenis root={root}>
      <main ref={ref} {...props}>
        <article className="parallax-stack-wrapper">
          <section className="parallax-stack-layer bg-slate-950 text-white">
            <div className="parallax-grid-bg" />
            <h1 className="parallax-hero-title">
              I Know What Exactly you&apos;re <br /> Looking For! Scroll Please 👇
            </h1>
          </section>

          <section className="parallax-stack-layer bg-gray-200 text-slate-900">
            <div className="parallax-grid-bg" />
            <h1 className="parallax-hero-title">
              here is it<br /> enjoy it!
            </h1>
          </section>

          <section className="parallax-stack-layer bg-slate-950 text-white">
            <div className="parallax-grid-bg" />
            <h1 className="parallax-hero-title">
              Thanks To Scroll.
              <br /> Now Scroll Up Again☝️
            </h1>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;
export { Component as SmoothScroll };

// Demo Export as specified in prompt
export function ComponentDemo() {
  return <Component />;
}

export { ComponentDemo as DemoOne };
