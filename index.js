const pokeDato = async () => {
  const pokemones = [];

  for (let i = 1; i <= 151; i++) {
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemonJson = await resultado.json();
    pokemones.push(pokemonJson);
  }

  return pokemones;
};

const mapPokemons = (pokemonSinMapear) => {
  console.log(pokemonSinMapear);

  return pokemonSinMapear.map((pokemones) => ({
    name: pokemones.name,
    image: pokemones.sprites.front_default,
    image_back: pokemones.sprites.back_default,
    type: pokemones.types.map((type) => type.type.name),
    experience: pokemones.base_experience,
    abilities: pokemones.abilities.map((abDato) => abDato.ability.name),
    species: pokemones.species.name,
    moves: pokemones.moves.map((move) => move.move.name),
  }));
};

const pintar = (pokemones) => {
  const pokedex$$ = document.querySelector("#pokedex");
  pokedex$$.innerHTML = "";
  for (const pokemon of pokemones) {
    const pokemonCard$$ = document.createElement("div");
    pokemonCard$$.classList.add("card");
    if (pokemon.type[1] == undefined) {
      pokemonCard$$.innerHTML = `
        <div class ='card-front'>
            <h2 class ='card__title'>${pokemon.name}</h2>
            <img src='${pokemon.image}' alt= '${pokemon.image}'class='card__img'>
            <div class ='card__type'>
            <span class="${pokemon.type[0]}">
            <img src="./img/svg/${pokemon.type[0]}.svg"
            <p>${pokemon.type[0]}</p>
            </span>  
            </div>
        </div>
        `;
    } else {
      pokemonCard$$.innerHTML = `
        <div class ='card-front'>
            <h2 class ='card__title'>${pokemon.name}</h2>
            <img src='${pokemon.image}' alt= '${pokemon.image}'class='card__img'>
            <div class ='card__type'>
              <span class="${pokemon.type[0]}">
              <img src="./img/svg/${pokemon.type[0]}.svg"
                <p>${pokemon.type[0]}</p>
              </span>  
              <span class="${pokemon.type[1]}">
              <img src="./img/svg/${pokemon.type[1]}.svg"
              <p>${pokemon.type[1]}</p>
              </span> 
              
            </div>
        </div>
        `;
    }
    pokedex$$.appendChild(pokemonCard$$);
  }
};

const filtrarPok = (pokemones) => {
  const btns$$ = document.querySelectorAll(".type__item");
  for (const button of btns$$) {
    button.addEventListener("click", () => {
      if (button.id == "todos") {
        pintar(pokemones);
      } else {
        const pokFiltrados = pokemones.filter((pok) =>
          pok.type.includes(button.id)
        );
        pintar(pokFiltrados);
      }
    });
  }
};

const init = async () => {
  const pokemons = await pokeDato();
  const pokemonMapeados = await mapPokemons(pokemons);
  pintar(pokemonMapeados);
  filtrarPok(pokemonMapeados);
};

init();
