import React from "react";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../constants";

export default function Navbar(props: any): JSX.Element {
  const handleRoutes = (): Array<string> => {
    const hash: string = window.location.hash.split("#")[1];
    switch (hash.toString()) {
      case ROUTES.episodes:
        return [ROUTES.casts, "View Cast"];

      case ROUTES.casts:
        return [ROUTES.episodes, "View Episodes"];

      default:
        return [ROUTES.home, "Home"];
    }
  };

  return (
    <nav className="navbar sticky-top navbar-light app-navbar">
      <div>
        {props.toggler}
        <NavLink className="navbar-brand ml-4" to={ROUTES.home}>
          <FaHome />
        </NavLink>
      </div>
      <NavLink className="btn btn-success btn-flat" to={handleRoutes()[0]}>
        {handleRoutes()[1]}
      </NavLink>
    </nav>
  );
}
