const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const selectors = [
    ".section-header",
    ".project-card",
    ".github-copy",
    ".language-chart",
    ".services-layout > div",
    ".contact-content",
  ];
  const revealItems = document.querySelectorAll(selectors.join(","));

  document.documentElement.classList.add("has-motion");

  revealItems.forEach((item) => item.classList.add("reveal-item"));

  document.querySelectorAll(".project-grid, .metric-grid").forEach((group) => {
    group.querySelectorAll(":scope > .reveal-item").forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}
