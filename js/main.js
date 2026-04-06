// MOBILE MENU TOGGLE
const menuToggle = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-content");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
