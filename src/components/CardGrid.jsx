import { useState, useEffect } from "react";
import { Card } from "./Card";
export { CardGrid };

function CardGrid() {
  const [cardArray, setCardArray] = useState([]);

  function shuffleArray(array) {
    const newArray = [...array];
    let lastIndex = newArray.length - 1;
    while (lastIndex > 0) {
      let randomIndex = Math.floor(Math.random() * (lastIndex + 1));
      let temporaryValue = newArray[lastIndex];
      newArray[lastIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
      lastIndex -= 1;
    }
  }

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

  return (
    <>
      {cardArray.map((obj) => (
        <Card
          key={obj.id}
          name={obj.name}
          picture={obj.sprite}
          onClick={() => shuffleArray(cardArray)}
        />
      ))}
    </>
  );
}
