export { Card };

function Card({ name, picture }) {
  return (
    <button>
      <img src={picture} alt={name} />
      <p>{name}</p>
    </button>
  );
}
