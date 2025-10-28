import { useDispatch, useSelector } from "react-redux";
import {
  selectAllBooks,
  selectBooksStatus,
  selectBooksError,
  selectBooksQuery,
} from "../../features/books/booksSelectors";
import { getBooks, setQuery } from "../../features/books/booksSlice";

import Card from "../Card/Card";
import styles from "./FormMain.module.css";
import { useState } from "react";

const FormMain = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const status = useSelector(selectBooksStatus);
  const error = useSelector(selectBooksError);
  const query = useSelector(selectBooksQuery);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg("Please enter a search term.");
      return;
    }
    setErrorMsg("");
    dispatch(getBooks(query));
  };

  return (
    <main className={styles.formWarp}>
      <form data-testid="search-form" onSubmit={handleSubmit} aria-label="Book Search Form" role="search">
        <input
          type="text"
          placeholder="Search Book Here...."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          aria-label="Search books by title, author, or keyword"
        />
        <button className="btn" aria-label="Submit search">Search</button>
      </form>

      <section className={styles.results} aria-live="polite">
        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && (
          <section className={styles.errorBox} role="alert">
            <p>Sorry, we couldn't fetch books. Please check your internet connection or try again later.</p>
            <p className={styles.errorDetail}>{error}</p>
          </section>
        )}
        {status === 'succeeded' && books.length === 0 && (
          <p>No books found for your search. Try a different keyword.</p>
        )}
        {status === 'succeeded' && books.length > 0 &&
          books.map((book) => <Card key={book.id} book={book} />)}
      </section>
    </main>
  );
};

export default FormMain;
