// Função para animar o scroll suave
function scrollToTarget(target, duration) {
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - 50;

  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const hash = this.getAttribute('href');
    const target = document.querySelector(hash);
    scrollToTarget(target, 500);
  });
});

new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 3,
  breakpoints: {
    800: {
      perView: 3
    }
  }
}).mount();
