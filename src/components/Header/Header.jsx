import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header role="banner">
      <div className="container">
        <div className={styles.headerMain}>
          <Link to="/" className={styles.logo} aria-label="Book Explorer Home">
            Book Explorer
          </Link>
          <nav role="navigation" aria-label="Main Navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
