// Carrusel con soporte para imágenes y video (con sonido al hacer clic)
document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carrusel');
  carousels.forEach(initCarousel);
});

function initCarousel(el) {
  const items = Array.from(el.querySelectorAll('img, video'));
  if (items.length === 0) return;

  let idx = 0;
  items.forEach(it => it.classList.remove('active'));
  items[idx].classList.add('active');

  const next = el.querySelector('.next');
  const prev = el.querySelector('.prev');

  function show(i) {
    // Oculta el elemento actual
    items[idx].classList.remove('active');

    // Si es video, lo pausa y reinicia
    if (items[idx].tagName.toLowerCase() === 'video') {
      items[idx].pause();
      items[idx].currentTime = 0;
    }

    // Muestra el siguiente
    idx = (i + items.length) % items.length;
    items[idx].classList.add('active');

    // Si es video, lo reproduce (silenciado)
    if (items[idx].tagName.toLowerCase() === 'video') {
      items[idx].muted = true;
      items[idx].play();

      // Permitir activar sonido con clic
      items[idx].addEventListener('click', () => {
        items[idx].muted = false;
        items[idx].play();
      });
    }
  }

  // Botones de navegación manual
  if (next) next.addEventListener('click', () => show(idx + 1));
  if (prev) prev.addEventListener('click', () => show(idx - 1));

  // Cambio automático
  let timer = setInterval(() => show(idx + 1), 5000);

  // Detener al pasar el mouse
  el.addEventListener('mouseover', () => {
    clearInterval(timer);
    // Pausar video si está activo
    const activeItem = items[idx];
    if (activeItem.tagName.toLowerCase() === 'video') activeItem.pause();
  });

  // Reanudar al salir el mouse
  el.addEventListener('mouseleave', () => {
    const activeItem = items[idx];
    if (activeItem.tagName.toLowerCase() === 'video') activeItem.play();
    timer = setInterval(() => show(idx + 1), 5000);
  });
}

// ==============================
// Activar sonido manual al cargar
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.carrusel video');
  if (!video) return;

  // Reproduce sin sonido al inicio (para evitar bloqueo del navegador)
  video.muted = true;
  video.play();

  // Al hacer clic, activa el sonido
  video.addEventListener('click', () => {
    video.muted = false;
    video.play();
  });
});
