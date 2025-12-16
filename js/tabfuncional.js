// Función para las pestañas principales (Todos, Ilustraciones, etc.)
function tabsFunction(evt, tabNum) {
  let i, tabcontent, tablinks;

  // Ocultar todos los contenidos principales
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active-tab");
  }

  // Desactivar todos los botones de pestaña principales
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("tab-pill-active");
  }

  // Mostrar el contenido de la pestaña seleccionada
  document.getElementById(tabNum).classList.add("active-tab");
  // Activar el botón de pestaña seleccionado
  evt.currentTarget.classList.add("tab-pill-active");
}

// Función NUEVA para los filtros de perfiles (Ilustrador, Animador, etc.)
function profileTabsFunction(evt, tabNum) {
  let i, tabcontent, tablinks;

  // Ocultar todos los contenidos de perfil
  tabcontent = document.getElementsByClassName("profile-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active-tab");
  }

  // Desactivar todos los botones de filtro de perfil
  tablinks = document.getElementsByClassName("profile-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("chip-active");
  }

  // Mostrar el contenido de perfil seleccionado
  document.getElementById(tabNum).classList.add("active-tab");
  // Activar el botón de filtro de perfil seleccionado
  evt.currentTarget.classList.add("chip-active");
}

// Abrir la pestaña 'Todos' por defecto al cargar
document.getElementById("defaultOpen").click();

// Abrir el filtro 'Ilustrador' por defecto al cargar
document.getElementById("defaultProfileOpen").click();
