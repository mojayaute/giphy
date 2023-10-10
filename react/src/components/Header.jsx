import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              GIPHY Demo
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav me-3">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    GIPHY Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/history"} className="nav-link">
                    History
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
