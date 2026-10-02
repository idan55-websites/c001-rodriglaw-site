// Phone effects run once per element, without scroll listeners or render loops.
export function setupMobileMotion(main) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = navigator.connection || navigator.mozConnection;
  const lowMemory =
    typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;

  if (reducedMotion.matches || connection?.saveData || lowMemory) return;

  main.classList.add("mobile-motion-enabled");
  const candidates = Array.from(main.querySelectorAll([
    ".uui-heroheader01_image-wrapper",
    ".uui-heroheader01_content",
    ".header-medium",
    ".section-title",
    ".about-richtext",
    ".about-image-wrapper",
    ".about-portrait-card",
    ".service-cell",
    ".feature-cell",
    ".content-card",
    ".services-hero-media",
    ".press-feature-card",
    ".press-link-card",
    ".contact-list",
    ".contact-action-link",
    ".privacy-card",
  ].join(",")));
  // Avoid animating a card and its children at the same time.
  const targets = candidates.filter(element =>
    !candidates.some(parent => parent !== element && parent.contains(element))
  );

  const finish = event => {
    if (event.animationName === "mobile-reveal") {
      event.target.classList.remove("mobile-reveal-enter");
    }
  };
  main.addEventListener("animationend", finish);

  const observer = typeof IntersectionObserver === "function"
    ? new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("mobile-reveal-enter");
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: 0.01, rootMargin: "0px 0px -24px 0px" })
    : null;
  targets.forEach(element => observer?.observe(element));

  const stop = () => {
    observer?.disconnect();
    main.classList.remove("mobile-motion-enabled");
    targets.forEach(element => element.classList.remove("mobile-reveal-enter"));
  };
  reducedMotion.addEventListener("change", stop);
  connection?.addEventListener?.("change", stop);

  return () => {
    stop();
    main.removeEventListener("animationend", finish);
    reducedMotion.removeEventListener("change", stop);
    connection?.removeEventListener?.("change", stop);
  };
}
