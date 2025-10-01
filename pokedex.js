let totalPokemon = 151;
let numPokemonDisplayed = 4;
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

let container = document.querySelector(".container");

// make 2 x 2 grid
// load 4 random pokemon
//display: name, sprite, type

for (let i = 0; i < numPokemonDisplayed; i++) {
  let randomId = Math.floor(Math.random() * totalPokemon) + 1;
  let url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  promises.push(fetch(url).then((res) => res.json()));
}

Promise.all(promises)
  .then((pokemonArray) => {
    pokemonArray.forEach((data) => {
      let pokemonContainer = document.createElement("div");
      pokemonContainer.classList.add("pokemon-container");
      container.appendChild(pokemonContainer);

      let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      let pokeNameEl = document.createElement("h2");
      pokeNameEl.classList.add("pokemon-name");
      pokeNameEl.textContent = pokeName;
      pokemonContainer.appendChild(pokeNameEl);

      let pokeType = data.types[0].type.name;
      let pokeTypeEl = document.createElement("p");
      pokeTypeEl.classList.add("pokemon-type");
      pokeTypeEl.textContent = `${pokeType} type`;
      pokemonContainer.appendChild(pokeTypeEl);

      let pokeSprite =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default ||
        "";
      let pokeSpriteEl = document.createElement("img");
      pokeSpriteEl.classList.add("pokemon-sprite");
      pokeSpriteEl.setAttribute("src", pokeSprite);
      pokemonContainer.appendChild(pokeSpriteEl);

      pokemonContainer.style.backgroundColor = typeColors[pokeType];

      console.log(data.abilities[0].ability.name);
    });
  })
  .catch((error) => console.log("An error occurred: " + error));
