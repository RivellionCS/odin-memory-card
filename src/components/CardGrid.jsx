import { useState, useEffect } from "react";

function CardGrid() {
  const [cardArray, setCardArray] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("pokemonArray")) {
      setCardArray(JSON.parse(localStorage.getItem("pokemonArray")));
      return;
    } else {
      async function fetchPokemonData() {
        try {
          const urls = [
            "https://pokeapi.co/api/v2/pokemon/727",
            "https://pokeapi.co/api/v2/pokemon/486",
            "https://pokeapi.co/api/v2/pokemon/644",
            "https://pokeapi.co/api/v2/pokemon/658",
            "https://pokeapi.co/api/v2/pokemon/254",
            "https://pokeapi.co/api/v2/pokemon/384",
            "https://pokeapi.co/api/v2/pokemon/1000",
            "https://pokeapi.co/api/v2/pokemon/445",
            "https://pokeapi.co/api/v2/pokemon/901",
            "https://pokeapi.co/api/v2/pokemon/800",
          ];

          const responses = await Promise.all(urls.map((url) => fetch(url)));
          const data = await Promise.all(
            responses.map((response) => response.json())
          );
          const filteredData = data.map((obj) => ({
            name: obj.forms[0].name,
            id: obj.id,
            sprite: obj.sprites.other["official-artwork"].front_default,
          }));
          setCardArray(filteredData);
        } catch (error) {
          console.log("Error fetching data: " + error);
        }
      }

      fetchPokemonData();
    }
  }, []);
}
