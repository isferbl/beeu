const pullToRefresh = document.querySelector(".pull-to-refresh");
const scrollContainer = document.querySelector(".home-main");

const PULL_THRESHOLD = 80; // píxeles que hay que jalar hacia abajo

let startY = 0;
let startScrollTop = 0;
let isTracking = false;
let hasPulledEnough = false;
let isRefreshing = false;

if (pullToRefresh && scrollContainer) {
  scrollContainer.addEventListener("touchstart", (e) => {
    // Guardamos en qué posición de scroll comienza el gesto
    startScrollTop = scrollContainer.scrollTop;

    // Solo queremos trackear si el gesto EMPIEZA en el top del scroll
    if (startScrollTop <= 0 && !isRefreshing) {
      isTracking = true;
      hasPulledEnough = false;
      startY = e.touches[0].clientY;
    } else {
      isTracking = false;
      pullToRefresh.classList.remove("seen");
    }
  });

  scrollContainer.addEventListener("touchmove", (e) => {
    if (!isTracking || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY; // positivo = dedo hacia abajo

    // Si el usuario mueve el dedo hacia arriba (diff <= 0), cancelamos
    if (diff <= 0) {
      isTracking = false;
      pullToRefresh.classList.remove("seen");
      return;
    }

    // Solo cuando realmente se jala "bastante" hacia abajo desde el top
    if (diff > PULL_THRESHOLD && scrollContainer.scrollTop <= 0) {
      pullToRefresh.classList.add("seen");
      hasPulledEnough = true;
      e.preventDefault(); // evita el rebote nativo
    }
  });

  scrollContainer.addEventListener("touchend", () => {
    if (hasPulledEnough && !isRefreshing) {
      isRefreshing = true;

      // Aquí podrías poner tu lógica de "recargar datos"
      // Ahora solo mostramos el spinner un ratito
      setTimeout(() => {
        pullToRefresh.classList.remove("seen");
        isRefreshing = false;
      }, 800);
    }

    // En cualquier caso, terminamos el tracking del gesto
    isTracking = false;
    hasPulledEnough = false;
  });
}
