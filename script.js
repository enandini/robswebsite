const links = Array.from(document.querySelectorAll(".toc-link"));
const sections = Array.from(document.querySelectorAll("main .section"));

const setActive = (id) => {
  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-30% 0px -45% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => observer.observe(section));

const syncBottomState = () => {
  const bottomOffset = 6;
  const atBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - bottomOffset;
  if (atBottom) {
    setActive("contact");
  }
};

window.addEventListener("scroll", syncBottomState, { passive: true });
window.addEventListener("resize", syncBottomState);
syncBottomState();

links.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    setActive(id);
  });
});
