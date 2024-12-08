import css from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Suspense } from "react";

export default function SharedLayout() {
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <nav>
            <NavLink to="/" className={css.headerLink}>
              Home page
            </NavLink>

            <NavLink to="/signup" className={css.headerLink}>
              Register
            </NavLink>
            <NavLink to="/signin" className={css.headerLink}>
              Login
            </NavLink>
            <NavLink to="/logout" className={css.headerLink}>
              Logout
            </NavLink>
            <NavLink to="/add-trailer" className={css.headerLink}>
              Add Trailer
            </NavLink>
            <NavLink to="/add-sailboat" className={css.headerLink}>
              Add Sailboat
            </NavLink>
            <NavLink to="/add-powerboat" className={css.headerLink}>
              Add Powerboat
            </NavLink>
            <NavLink to="/add-smallboat" className={css.headerLink}>
              Add SmallBoat
            </NavLink>
            <NavLink to="/add-inflatable" className={css.headerLink}>
              Add Inflatable
            </NavLink>
            <NavLink to="/geolocation" className={css.headerLink}>
              Geolocation
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
