'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';

type LazySectionProps = {
  id: string;
  loader: () => Promise<{ default: ComponentType }>;
};

export default function LazySection({ id, loader }: LazySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [Section, setSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void loader().then((module) => setSection(() => module.default));
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loader]);

  return <div ref={sectionRef} id={id} className="min-h-[640px]">{Section ? <Section /> : null}</div>;
}
