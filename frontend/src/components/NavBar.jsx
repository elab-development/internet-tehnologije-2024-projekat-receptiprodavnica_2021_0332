import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="logo">ShopSmart</div>
        <ul className="nav-links">
          <li><Link to="/">Početna</Link></li>
          <li className="dropdown">
            <button className="dropdown-button">Proizvodi</button>
            <div className="dropdown-content">
              <Link to="/products/fruits">Voće</Link>
              <Link to="/products/dairy">Mlečni proizvodi</Link>
              <Link to="/products/meat">Meso</Link>
              <Link to="/products/cheese">Sirevi</Link>
              <Link to="/products/vegetables">Povrće</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="dropdown-button">Recepti</button>
            <div className="dropdown-content">
              <div className="dropdown-submenu">
                <button className="submenu-button">Kategorija jela</button>
                <div className="submenu-content">
                  <Link to="/recipes/sweet">Slatko</Link>
                  <Link to="/recipes/salty">Slano</Link>
                  <Link to="/recipes/fasting">Posno</Link>
                  <Link to="/recipes/vegan">Vegansko</Link>
                </div>
              </div>
              <div className="dropdown-submenu">
                <button className="submenu-button">Tip jela</button>
                <div className="submenu-content">
                  <Link to="/recipes/appetizer">Predjelo</Link>
                  <Link to="/recipes/main">Glavno jelo</Link>
                  <Link to="/recipes/dessert">Desert</Link>
                </div>
              </div>
              <div className="dropdown-submenu">
                <button className="submenu-button">Vreme pripreme</button>
                <div className="submenu-content">
                  <Link to="/recipes/quick">Brzi</Link>
                  <Link to="/recipes/medium">Srednje brzi</Link>
                  <Link to="/recipes/long">Dugi recepti</Link>
                </div>
              </div>
              <div className="dropdown-submenu">
                <button className="submenu-button">Broj kalorija</button>
                <div className="submenu-content">
                  <Link to="/recipes/low-calorie">Niskokalorično</Link>
                  <Link to="/recipes/medium-calorie">Srednjekalorično</Link>
                  <Link to="/recipes/high-calorie">Visokokalorično</Link>
                </div>
              </div>
            </div>
          </li>
          <li><Link to="/cart">Korpa</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    );
  };  

export default NavBar