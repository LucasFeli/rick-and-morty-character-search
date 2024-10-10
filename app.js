// Variables del DOM
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const characterGrid = document.getElementById("characterGrid");
const loadMoreButton = document.getElementById("loadMoreButton");

let currentPage = 1; // Página actual de la API
let currentQuery = ""; // Almacena el término de búsqueda actual

// Función para obtener personajes de la API con paginación
async function fetchCharacters(page = 1, query = "") {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results) {
      displayCharacters(data.results);
    } else {
      loadMoreButton.style.display = "none";
      if (page === 1) {
        characterGrid.innerHTML = `<p>No se encontraron personajes.</p>`;
      }
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
    characterGrid.innerHTML = `<p>Error al cargar personajes.</p>`;
  }
}

// Función para mostrar personajes en el contenedor
function displayCharacters(characters) {
  characters.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");
    characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Estado: ${character.status}</p>
            <p>Especie: ${character.species}</p>
        `;
    characterGrid.appendChild(characterCard);
  });
}

// Cargar personajes iniciales al cargar la página
fetchCharacters(currentPage);

// Event listener para el botón de búsqueda
searchButton.addEventListener("click", () => {
  currentQuery = searchInput.value.trim();
  currentPage = 1;
  characterGrid.innerHTML = ""; // Limpiar el grid de personajes
  fetchCharacters(currentPage, currentQuery);
});

// Buscar personajes automáticamente al presionar Enter
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    characterGrid.innerHTML = ""; // Limpiar el grid de personajes
    fetchCharacters(currentPage, currentQuery);
  }
});

// Event listener para el botón "Ver Más"
loadMoreButton.addEventListener("click", () => {
  currentPage++;
  fetchCharacters(currentPage, currentQuery);
});
