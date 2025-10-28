import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "../svg/FavoriteIcon";
import styles from "./BookDtl.module.css";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { selectAllBooks } from "../../features/books/booksSelectors";

import React from "react";
const BookDtl = React.memo(({ bookId }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const favorites = useSelector((state) => state.favorites);

  const book = books.find((b) => b.id === bookId);

  const isFav = book && favorites.some((fav) => fav.id === book.id);

  const handleFavClick = () => {
    if (!book) return;
    if (isFav) dispatch(removeFavorite(book.id));
    else dispatch(addFavorite(book));
  };

  if (!book) {
    return (
      <div className={styles.errorBox} role="alert" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3>Book not found</h3>
        <p>Sorry, we couldn't find this book. It may have been removed or your search returned no results.</p>
        <p>Please try searching again or check your internet connection.</p>
      </div>
    );
  }

  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <div className={styles.bookMain}>
      <div className={styles.top}>
        <div
          className={styles.icon}
          onClick={handleFavClick}
          style={{ cursor: "pointer" }}
        >
          <FavoriteIcon filled={isFav} />
        </div>

        <div className={styles.imgbox}>
          <img
            loading="lazy"
            src={imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
            alt={title}
          />
        </div>

        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <h4 className={styles.author}>{authors?.join(", ")}</h4>
        </div>
      </div>

      <div className={styles.description}>
        <p>{description || "No description available."}</p>
      </div>
    </div>
  );
});

export default BookDtl;
