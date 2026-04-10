// URL de la API (basada en tu captura)
const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

// 1. Obtener el ID desde la URL (ej: projects.html?id=1)
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

async function fetchProjectData() {
  try {
    const response = await fetch(API_URL);
    const projects = await response.json();

    // 2. Encontrar el proyecto actual
    const currentProject = projects.find((p) => p.uuid === projectId);

    if (currentProject) {
      renderMainProject(currentProject);
      renderOtherProjects(projects, projectId);
    } else {
      console.error("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error cargando la API:", error);
  }
}

// 3. Renderizar el proyecto principal
function renderMainProject(project) {
  document.querySelector(".info-project h1").textContent = project.name;
  document.getElementById("subtitle").textContent = project.description;
  document.getElementById("date").textContent = project.completed_on;

  const contentBlog = document.querySelector(".content-blog");
  // Inyectamos la imagen y el contenido (usando innerHTML para procesar los <br> del JSON)
  contentBlog.innerHTML = `
        <img src="${project.image}" alt="${project.name}" />
        <p>${project.content}</p>
    `;
}

// 4. Renderizar "Other Projects" excluyendo el actual
function renderOtherProjects(allProjects, currentId) {
  const container = document.querySelector(".other-projects .container");
  container.innerHTML = ""; // Limpiar el contenido estático de diseño

  // Filtramos para que no aparezca el mismo que estamos viendo
  const filteredProjects = allProjects.filter((p) => p.uuid !== currentId);

  // Tomamos solo los 3 primeros para mantener el diseño
  filteredProjects.slice(0, 3).forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
            <a href="projects.html?id=${project.uuid}">
                <img src="${project.image}" alt="${project.name}" />
            </a>
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <a href="projects.html?id=${project.uuid}">Learn More</a>
        `;
    container.appendChild(card);
  });
}

// Ejecutar la función al cargar la página
window.addEventListener("DOMContentLoaded", fetchProjectData);
