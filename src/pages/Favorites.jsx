import Card from "../components/Card/Card";
import { useSelector } from "react-redux";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  if (!favorites.length) {
    return (
      <main role="main">
        <section role="alert" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3>No favorite books yet</h3>
          <p>Add books to your favorites to see them here.</p>
        </section>
      </main>
    );
  }

  return (
    <main role="main">
      <div className="container">
        <section className="grid-class favoritespage" aria-label="Favorites List">
          {favorites.map((book) => (
            <Card key={book.id} book={book} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Favorites;
