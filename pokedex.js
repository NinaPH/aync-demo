let container = document.querySelector(".container");
let loadingEl = document.querySelector(".loading");
let errorEl = document.querySelector(".error");
let button = document.querySelector(".button");
let numPokemonEl = document.getElementById("num-pokemon");

loadingEl.style.display = "block";
errorEl.style.display = "none";

let maxPokeId = 151;
let promises = [];

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

generatePokemon(4);

function generatePokemon(numPokemon) {
  for (let i = 0; i < numPokemon; i++) {
    let randomId = Math.floor(Math.random() * maxPokeId) + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    promises.push(fetch(url).then((result) => result.json()));
  }

  Promise.all(promises)
    .then((data) => {
      loadingEl.style.display = "none";
      data.forEach((pokemon) => {
        //create container
        let pokemonContainer = document.createElement("div");
        pokemonContainer.classList.add("pokemon-container");
        container.appendChild(pokemonContainer);

        //display pokemon name
        let pokemonName =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        let pokemonNameEl = document.createElement("h2");
        pokemonNameEl.classList.add("pokemon-name");
        pokemonNameEl.textContent = pokemonName;
        pokemonContainer.appendChild(pokemonNameEl);

        //display pokemon type
        let pokemonType = pokemon.types[0].type.name;
        let pokemonTypeEl = document.createElement("p");
        pokemonTypeEl.classList.add("pokemon-type");
        pokemonTypeEl.textContent = `${pokemonType} type`;
        pokemonContainer.style.backgroundColor = typeColors[pokemonType];
        pokemonContainer.appendChild(pokemonTypeEl);

        //display pokemon sprite
        let pokemonSprite =
          pokemon.sprites.other["official-artwork"].front_default;
        let pokemonSpriteEl = document.createElement("img");
        pokemonSpriteEl.classList.add("pokemon-sprite");
        pokemonSpriteEl.src = pokemonSprite;
        pokemonContainer.appendChild(pokemonSpriteEl);
      });
    })
    .catch((error) => {
      loadingEl.style.display = "none";
      errorEl.style.display = "block";
      errorEl.innerHTML = `<b><i>An error occurred!</b><br>${error}</i>`;
    });
}

button.addEventListener("click", () => {
  let numPokemon = parseInt(numPokemonEl.value);
  loadingEl.style.display = "block";
  errorEl.style.display = "none";

  container.innerHTML = "";
  promises = [];
  generatePokemon(numPokemon);
});
