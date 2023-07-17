import { RefObject, useEffect, useState } from "react";

export default function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      options ?? {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return entry;
}