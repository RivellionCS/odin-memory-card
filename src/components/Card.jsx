export { Card };

function Card({ name, id, picture }) {
  return (
    <button key={id}>
      <img src={picture} alt={name} />
      <p>{name}</p>
    </button>
  );
}
