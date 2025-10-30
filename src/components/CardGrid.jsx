import { useState, useEffect } from "react";
import { Card } from "./Card";
import { Scoreboard } from "./Scoreboard";
export { CardGrid };

function CardGrid() {
  const [cardArray, setCardArray] = useState([]);
  const [score, setScore] = useState({ score: 0, bestScore: 0 });
  const [clickedArray, setClickedArray] = useState([]);

  function shuffleArray() {
    setCardArray((prev) => {
      const newArray = [...prev];
      let lastIndex = newArray.length - 1;
      while (lastIndex > 0) {
        let randomIndex = Math.floor(Math.random() * (lastIndex + 1));
        let temporaryValue = newArray[lastIndex];
        newArray[lastIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
        lastIndex -= 1;
      }
      return newArray;
    });
  }

  function increaseScore() {
    setScore((prev) => ({
      score: prev.score + 1,
      bestScore: Math.max(prev.bestScore, prev.score + 1),
    }));
  }

  function resetScore() {
    setScore((prev) => ({ score: 0, bestScore: prev.bestScore }));
  }

  function gameLogic(cardId) {
    shuffleArray();
    if (clickedArray.includes(cardId)) {
      setClickedArray([]);
      resetScore();
    } else {
      setClickedArray([...clickedArray, cardId]);
      increaseScore();
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
          localStorage.setItem("pokemonArray", JSON.stringify(filteredData));
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
      <Scoreboard score={score.score} bestScore={score.bestScore} />
      {cardArray.map((obj) => (
        <Card
          key={obj.id}
          name={obj.name}
          picture={obj.sprite}
          onClick={() => gameLogic(obj.id)}
        />
      ))}
    </>
  );
}
