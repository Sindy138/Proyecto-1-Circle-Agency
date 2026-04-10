// Función que se ejecuta sola al cargar el script
const createScrollButton = () => {
  // 1. Creamos la "pieza" de HTML en una variable
  const scrollBtn = document.createElement("button");

  // 2. Le damos su "identidad" (ID para el CSS) y contenido
  scrollBtn.id = "scrollToTop";
  scrollBtn.innerHTML = "<span>&uarr;</span>"; // La flecha

  // 3. ¡RENDERIZADO! Lo metemos físicamente en el cuerpo de la web
  document.body.appendChild(scrollBtn);

  // 4. Lógica de aparición (Scroll > 400px)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // 5. Lógica de clic (Scroll Suave)
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Ejecutamos la creación
createScrollButton();
