import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let x = 0, y = 0;
    let currentX = 0, currentY = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(
        target.closest('a, button, input, textarea, select, label, [role="button"], .masonry-gallery__item, .hero__scroll-mouse, .navbar__logo, .navbar__links a')
      );
    };

    const onHover = (e: Event) => {
      if (isInteractive(e.target)) {
        glow.classList.add('cursor-glow--hover');
      }
    };

    const onLeave = (e: Event) => {
      if (isInteractive(e.target)) {
        glow.classList.remove('cursor-glow--hover');
      }
    };

    const animate = () => {
      currentX += (x - currentX) * 0.1;
      currentY += (y - currentY) * 0.1;
      glow.style.transform = `translate(${currentX - 120}px, ${currentY - 120}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onHover);
    window.addEventListener('mouseout', onLeave);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHover);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
