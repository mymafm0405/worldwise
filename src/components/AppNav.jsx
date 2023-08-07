import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
