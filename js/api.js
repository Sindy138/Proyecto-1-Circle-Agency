// URL de la API
const API_URL =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects";

// Configuración del caché
const CACHE_KEY = "circle_projects";
const CACHE_TIME_KEY = "circle_projects_time";
const CACHE_EXPIRY = 3600000; // 1 hora en milisegundos

// Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

// ===== FUNCIONES DE CACHÉ =====
function getFromCache() {
  const cached = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cached && cachedTime) {
    const elapsed = Date.now() - parseInt(cachedTime);
    if (elapsed < CACHE_EXPIRY) {
      console.log("📦 Usando datos del caché");
      return JSON.parse(cached);
    }
  }
  return null;
}

function saveToCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
  console.log("💾 Datos guardados en caché");
}

// ===== FUNCIÓN PRINCIPAL =====
async function fetchProjectData() {
  try {
    // 1. Mostrar skeleton loader mientras se cargan datos
    showSkeletonLoader();

    // 2. Intentar obtener del caché
    let projects = getFromCache();

    // 3. Si no está en caché, traer de la API
    if (!projects) {
      console.log("🌐 Descargando datos de la API...");
      const response = await fetch(API_URL);
      projects = await response.json();
      saveToCache(projects);
    }

    // 4. Encontrar y renderizar el proyecto actual
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

// ===== MOSTRAR SKELETON LOADER =====
function showSkeletonLoader() {
  const contentBlog = document.querySelector(".content-blog");
  if (contentBlog) {
    contentBlog.innerHTML = `
      <div class="skeleton-loader">
        <div class="skeleton-img"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text skeleton-text-short"></div>
      </div>
    `;
  }
}

// 4. Renderizar el proyecto principal
function renderMainProject(project) {
  document.querySelector(".info-project h1").textContent = project.name;
  document.getElementById("subtitle").textContent = project.description;
  document.getElementById("date").textContent = project.completed_on;

  const contentBlog = document.querySelector(".content-blog");
  contentBlog.innerHTML = `
    <img 
      src="${project.image}" 
      alt="${project.name}" 
      class="project-image"
    />
    <p>${project.content}</p>
  `;
}

// 5. Renderizar "Other Projects" excluyendo el actual
function renderOtherProjects(allProjects, currentId) {
  const container = document.querySelector(".other-projects .container");
  container.innerHTML = "";

  const filteredProjects = allProjects.filter((p) => p.uuid !== currentId);

  filteredProjects.slice(0, 3).forEach((project) => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = `projects.html?id=${project.uuid}`;
    card.innerHTML = `
      <img 
        src="${project.image}" 
        alt="${project.name}" 
        loading="lazy"
        class="project-image"
      />
      <h4>${project.name}</h4>
      <p>${project.description}</p>
      <span>Learn More</span>
    `;
    container.appendChild(card);
  });
}

// Ejecutar la función al cargar la página
window.addEventListener("DOMContentLoaded", fetchProjectData);
