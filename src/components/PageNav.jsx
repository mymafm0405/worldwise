import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from './PageNav.module.css'
import { useAuth } from "../contexts/FakeAuthContext";

export default function PageNav() {
  const { isAuthnticated } = useAuth()

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          {!isAuthnticated && <NavLink to='/login' className={styles.ctaLink}>Login</NavLink>}
        </li>
      </ul>
    </nav>
  );
}
