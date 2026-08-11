/* Image slots hold their shape before the real artwork exists.
   When a file is missing we hide the broken image and let the
   slot render its alt text as a label instead. */
(function () {
  "use strict";

  function markMissing(img) {
    var slot = img.closest(".ph, .tile, .brand") || img.parentElement;
    if (!slot) return;

    img.hidden = true;
    slot.classList.add("is-missing");

    if (!slot.getAttribute("data-label") && img.alt) {
      slot.setAttribute("data-label", img.alt);
    }
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      markMissing(img);
    });

    // Covers images that already failed before this script ran.
    if (img.complete && img.naturalWidth === 0) markMissing(img);
  });
})();


const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


/* Set Project Title to 10% of banner height */

function sizeProjectHeroElements() {
  const hero = document.querySelector(".project-hero");

  if (!hero) return;

  const heroHeight = hero.offsetHeight;

  // Title = 10% of banner height
  const title = hero.querySelector(".project-hero-content h1");
  if (title) {
    title.style.fontSize = `${heroHeight * 0.10}px`;
  }

  // Bottom metadata text = 3% of banner height
  const meta = hero.querySelector(".project-hero-meta");
  if (meta) {
    meta.style.fontSize = `${heroHeight * 0.03}px`;
  }

  // Tool icons = 5% of banner height
  const tools = hero.querySelectorAll(".tool");
  tools.forEach((tool) => {
    const size = heroHeight * 0.05;
    tool.style.width = `${size}px`;
    tool.style.height = `${size}px`;
  });
}

window.addEventListener("load", sizeProjectHeroElements);
window.addEventListener("resize", sizeProjectHeroElements);
