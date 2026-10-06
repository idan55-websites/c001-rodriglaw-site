import { motionDisabled } from "./accessibilityPreferences";

// Safari-friendly opacity/transform transitions, with content visible if motion is unavailable.
export function setupMobileMotion(main) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const selector = [
    ".uui-heroheader01_image-wrapper", ".uui-heroheader01_content",
    ".header-medium", ".header-small", ".section-title", ".section-copy", ".eyebrow",
    ".about-richtext > *", ".about-image-wrapper", ".about-portrait-card",
    ".service-cell", ".feature-cell", ".content-card", ".services-hero-media",
    ".press-feature-card", ".press-link-card", ".contact-list",
    ".contact-action-link", ".privacy-card", ".contact-map-wrapper",
  ].join(",");
  const targets = new Set();
  let observer;
  let heroObserver;
  let mutations;
  let firstFrame;
  let secondFrame;

  const register = (changed = []) => {
    const candidates = Array.from(main.querySelectorAll(selector));
    candidates.filter(element =>
      !candidates.some(parent => parent !== element && parent.contains(element))
    ).forEach(element => {
      const updated = changed.some(node => element.contains(node));
      if (targets.has(element) && !updated) return;
      targets.add(element);
      element.classList.add("mobile-reveal");
      element.classList.remove("mobile-visible");
      observer.observe(element);
    });
    targets.forEach(element => {
      if (!main.contains(element)) {
        observer.unobserve(element);
        targets.delete(element);
      }
    });
  };
  const stop = () => {
    cancelAnimationFrame(firstFrame);
    cancelAnimationFrame(secondFrame);
    observer?.disconnect();
    heroObserver?.disconnect();
    mutations?.disconnect();
    main.classList.remove("mobile-motion-enabled", "mobile-hero-in-view");
    targets.forEach(element => {
      element.classList.remove("mobile-reveal", "mobile-visible");
      element.style.removeProperty("--mobile-reveal-delay");
    });
    targets.clear();
  };
  const start = () => {
    stop();
    if (motionDisabled() || typeof IntersectionObserver !== "function") return;
    main.classList.add("mobile-motion-enabled");
    observer = new IntersectionObserver(entries => {
      let revealIndex = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--mobile-reveal-delay", `${Math.min(revealIndex++, 2) * 70}ms`);
        entry.target.classList.add("mobile-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0,
      // Include the page above the viewport so a fast swipe cannot skip a reveal.
      rootMargin: `${main.scrollHeight + window.innerHeight}px 0px -32px 0px`,
    });
    // Establish the starting styles before observing the first screen.
    const candidates = main.querySelectorAll(selector);
    candidates.forEach(element => {
      if (![...candidates].some(parent => parent !== element && parent.contains(element))) {
        targets.add(element);
        element.classList.add("mobile-reveal");
      }
    });
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        targets.forEach(element => observer.observe(element));
        mutations = new MutationObserver(records => register(records.map(record => record.target)));
        mutations.observe(main, { childList: true, characterData: true, subtree: true });
      });
    });
    const hero = main.querySelector(".section_hero");
    if (hero) {
      heroObserver = new IntersectionObserver(([entry]) => {
        main.classList.toggle("mobile-hero-in-view", entry.isIntersecting);
      });
      heroObserver.observe(hero);
    }
  };
  reducedMotion.addEventListener("change", start);
  window.addEventListener("accessibilitychange", start);
  start();
  return () => {
    stop();
    reducedMotion.removeEventListener("change", start);
    window.removeEventListener("accessibilitychange", start);
  };
}
