import { useEffect, useRef, type RefObject } from 'react';

export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const seen = new WeakSet<Element>();

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                (entry.target as HTMLElement).setAttribute('data-reveal', 'shown');
                observer?.unobserve(entry.target);
              });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
          )
        : null;

    const register = () => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(target => {
        if (seen.has(target) || target.getAttribute('data-reveal') === 'shown') return;
        seen.add(target);

        if (observer) {
          observer.observe(target);
        } else {
          target.setAttribute('data-reveal', 'shown');
        }
      });
    };

    register();

    // Elemen yang muncul belakangan (misalnya kartu dari API) ikut didata.
    const mutation = new MutationObserver(register);
    mutation.observe(root, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer?.disconnect();
    };
  }, []);

  return ref;
}
