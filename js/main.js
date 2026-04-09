// MOBILE MENU TOGGLE
const menuToggle = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-content");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// INICIALIZAR FORMULARIO DE CONTACTO
/*
if (document.getElementById("contactForm")) {
  new ContactForm("contactForm");
}
*/
