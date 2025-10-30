export { Card };

function Card({ name, picture, onClick }) {
  return (
    <button onClick={onClick}>
      <img src={picture} alt={name} />
      <p>{name}</p>
    </button>
  );
}
