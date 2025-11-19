import { RefObject, useEffect, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
};

export const useInView = (
  ref: RefObject<Element>,
  options: Options = {}
): boolean => {
  const { threshold = 0.25, rootMargin = "0px" } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return isInView;
};

