import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import FavoriteIcon from "../svg/FavoriteIcon";
import React, { useMemo } from "react";

const Card = React.memo(({ book }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFav = useMemo(() => book && book.volumeInfo ? favorites.some((fav) => fav.id === book.id) : false, [favorites, book]);
  if (!book || !book.volumeInfo) return null;

  const handleFavClick = () => {
    if (isFav) dispatch(removeFavorite(book.id));
    else dispatch(addFavorite(book));
  };

  // Keyboard accessibility for favorite icon
  const handleFavKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleFavClick();
    }
  };

  const { title = "No Title", authors = ["Unknown"], imageLinks } = book.volumeInfo;

  return (
    <div className={styles.card}>
      <div
        className={styles.icon}
        onClick={handleFavClick}
        onKeyDown={handleFavKeyDown}
        style={{ cursor: "pointer" }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        tabIndex={0}
        role="button"
        aria-pressed={isFav}
      >
        <FavoriteIcon filled={isFav} />
      </div>
      <div className={styles.imgbox}>
        <img
          src={imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'}
          alt={title}
        />
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.author}>{authors?.join(', ')}</h4>
        <div className={styles.btnbox}>
          <Link
            to={`/books/${book.id}`}
            className="btn"
            aria-label={`View details for ${title}`}
            tabIndex={0}
          >
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Card;
