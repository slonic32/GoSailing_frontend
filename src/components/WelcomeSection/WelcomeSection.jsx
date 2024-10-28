import { NavLink } from "react-router-dom";

import css from "./WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <>
      <div>
        <div>
          <p>Buy or Sell Your Boat!</p>
          <h1>GoSailing</h1>
          <div>
            <NavLink to="/signup">Register</NavLink>
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/vehicles">All Vehicles</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
