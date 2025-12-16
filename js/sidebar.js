document.addEventListener("DOMContentLoaded", () => {
  // ALINEACIÓN DE IDS: Usamos los IDs del HTML corregido
  const openBtn = document.getElementById("sidebarToggle"); // Corregido: ID del botón de apertura
  const sideFrame = document.getElementById("mySidebar"); // Corregido: ID del aside (contenedor del sidebar)
  const sideOverlay = document.getElementById("myOverlay"); // Corregido: ID del overlay

  if (!openBtn || !sideFrame || !sideOverlay) {
    console.warn("[Sidebar] Faltan elementos:", {
      openBtn: !!openBtn,
      sideFrame: !!sideFrame,
      sideOverlay: !!sideOverlay,
    });
    return;
  }

  let busy = false;

  // Usamos el mismo nombre de clase definido en el CSS corregido
  const isOpen = () => sideFrame.classList.contains("is-open");

  const openSide = () => {
    sideFrame.classList.add("is-open");
    sideFrame.setAttribute("aria-hidden", "false");

    // El manejo de pointerEvents lo hace el CSS, pero los dejamos como fallback si quieres:
    // sideFrame.style.pointerEvents = "auto";
    // sideOverlay.style.pointerEvents = "auto";

    // lock scroll (mobile)
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const closeSide = () => {
    sideFrame.classList.remove("is-open");
    sideFrame.setAttribute("aria-hidden", "true");

    // unlock scroll
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  const toggleSide = () => (isOpen() ? closeSide() : openSide());

  // --- ABRIR desde el logo (El botón) ---
  // openBtn es el <a> con ID="sidebarToggle" en el header
  openBtn.addEventListener(
    "pointerdown",
    (e) => {
      e.preventDefault();
      if (busy) return;
      busy = true;
      toggleSide();
      setTimeout(() => (busy = false), 150);
    },
    { capture: true }
  );

  // --- CERRAR tocando overlay ---
  // sideOverlay es el <div class="side-overlay" id="myOverlay">
  sideOverlay.addEventListener(
    "pointerdown",
    (e) => {
      e.preventDefault();
      if (!isOpen()) return;
      closeSide();
    },
    { capture: true }
  );

  // --- CERRAR al tocar una opción (y navegar normal) ---
  // En el HTML corregido agregamos 'data-close-side' a los enlaces del menú
  sideFrame.addEventListener(
    "pointerdown",
    (e) => {
      const link = e.target.closest("[data-close-side]");
      if (!link) return;
      // No hacemos preventDefault() aquí para que el navegador ejecute el href=""
      closeSide();
    },
    { capture: true }
  );

  // --- ESC cierra ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSide();
  });
});
