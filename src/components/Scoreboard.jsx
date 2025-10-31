export { Scoreboard };
import "../styles/Scoreboard.css";

function Scoreboard({ score, bestScore }) {
  return (
    <div id="scoreboard">
      <h2>Don't click the same pokemon twice</h2>
      <h2>Best Score: {bestScore}</h2>
      <h2>Current Score: {score}</h2>
    </div>
  );
}
