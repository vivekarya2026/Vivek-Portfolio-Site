/* Services illustrations: play when 30% in view, hover/focus bonus moment. */
(function () {
  var cards = document.querySelectorAll(".home-service_card");
  if (!cards.length) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // CSS shows the static final frame

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          e.target.classList.toggle("is-playing", e.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    cards.forEach(function (c) {
      if (c.querySelector(".svc-art")) io.observe(c);
    });
  } else {
    cards.forEach(function (c) { c.classList.add("is-playing"); });
  }

  cards.forEach(function (card) {
    if (!card.querySelector(".svc-art")) return;
    // make the card focusable so keyboard users get the hover moment too
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    var timer;
    function start() {
      clearTimeout(timer);
      card.classList.remove("is-hover");
      void card.offsetWidth; // restart one shot animation
      card.classList.add("is-hover");
      timer = setTimeout(function () { card.classList.remove("is-hover"); }, 1200);
    }
    card.addEventListener("mouseenter", start);
    card.addEventListener("focusin", start);
  });
})();
