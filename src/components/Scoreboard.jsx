export { Scoreboard };

function Scoreboard({ score, bestScore }) {
  return (
    <div>
      <h2>Best Score: {bestScore}</h2>
      <h2>Current Score: {score}</h2>
    </div>
  );
}
