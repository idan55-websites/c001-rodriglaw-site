// Animate individual reading blocks once they are visibly inside the phone viewport.
// Content remains readable if observers or motion are unavailable.
export function setupMobileMotion(main) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const selector = [
    ".uui-heroheader01_image-wrapper", ".uui-heroheader01_content",
    ".header-medium", ".header-small", ".section-title", ".section-copy",
    ".about-richtext > *", ".about-image-wrapper", ".about-portrait-card",
    ".service-cell", ".feature-cell", ".content-card", ".services-hero-media",
    ".press-feature-card", ".press-link-card", ".contact-list",
    ".contact-action-link", ".privacy-card",
  ].join(",");
  const targets = new Set();
  let observer;
  let mutations;

  const register = (changed = []) => {
    const candidates = Array.from(main.querySelectorAll(selector));
    candidates.filter(element =>
      !candidates.some(parent => parent !== element && parent.contains(element))
    ).forEach(element => {
      // React can reuse the same service-card nodes when a category changes.
      const updated = changed.some(node => element.contains(node));
      if (targets.has(element) && !updated) return;
      targets.add(element);
      if (updated) element.classList.remove("mobile-reveal-enter");
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
    observer?.disconnect();
    mutations?.disconnect();
    main.classList.remove("mobile-motion-enabled");
    targets.forEach(element => {
      element.classList.remove("mobile-reveal-enter");
      element.style.removeProperty("--mobile-reveal-delay");
    });
    targets.clear();
  };
  const start = () => {
    stop();
    if (reducedMotion.matches || typeof IntersectionObserver !== "function") return;
    main.classList.add("mobile-motion-enabled");
    // Pixel margins use viewport height explicitly (IO percentage margins use width).
    const inset = Math.round(Math.min(150, Math.max(90, window.innerHeight * 0.18)));
    observer = new IntersectionObserver(entries => {
      let revealIndex = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty("--mobile-reveal-delay", `${Math.min(revealIndex++, 2) * 65}ms`);
        entry.target.classList.add("mobile-reveal-enter");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: `0px 0px -${inset}px 0px` });
    register();
    mutations = new MutationObserver(records => register(records.map(record => record.target)));
    mutations.observe(main, { childList: true, characterData: true, subtree: true });
  };
  const finish = event => {
    if (event.animationName === "mobile-reveal") {
      event.target.classList.remove("mobile-reveal-enter");
    }
  };
  main.addEventListener("animationend", finish);
  reducedMotion.addEventListener("change", start);
  start();
  return () => {
    stop();
    main.removeEventListener("animationend", finish);
    reducedMotion.removeEventListener("change", start);
  };
}
