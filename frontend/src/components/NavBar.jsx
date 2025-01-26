import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">CookMate</div>
      <ul className="nav-links">
        <li><Link to="/">Početna</Link></li>
        <li className="dropdown">
          <button className="dropdown-button">Recepti</button>
          <div className="dropdown-content">
            <div className="dropdown-submenu">
              <button className="submenu-button">Kategorija jela</button>
              <div className="submenu-content">
                <Link to="/recepti/slatko">Slatko</Link>
                <Link to="/recepti/slano">Slano</Link>
                <Link to="/recepti/posno">Posno</Link>
                <Link to="/recepti/vegansko">Vegansko</Link>
              </div>
            </div>
            <div className="dropdown-submenu">
              <button className="submenu-button">Tip jela</button>
              <div className="submenu-content">
                <Link to="/recepti/predjelo">Predjelo</Link>
                <Link to="/recepti/glavno-jelo">Glavno jelo</Link>
                <Link to="/recepti/desert">Desert</Link>
              </div>
            </div>
            <div className="dropdown-submenu">
              <button className="submenu-button">Vreme pripreme</button>
              <div className="submenu-content">
                <Link to="/recepti/brzi">Brzi</Link>
                <Link to="/recepti/srednje-brzi">Srednje brzi</Link>
                <Link to="/recepti/dugi">Dugi</Link>
              </div>
            </div>
            <div className="dropdown-submenu">
              <button className="submenu-button">Broj kalorija</button>
              <div className="submenu-content">
                <Link to="/recepti/niskokalorično">Niskokalorično</Link>
                <Link to="/recepti/srednjekalorično">Srednjekalorično</Link>
                <Link to="/recepti/visokokalorično">Visokokalorično</Link>
              </div>
            </div>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropdown-button">Proizvodi</button>
          <div className="dropdown-content">
            <Link to="/proizvodi/voce">Voće</Link>
            <Link to="/proizvodi/mlecni-proizvodi">Mlečni proizvodi</Link>
            <Link to="/proizvodi/meso">Meso</Link>
            <Link to="/proizvodi/povrce">Povrće</Link>
          </div>
        </li>
        <li><Link to="/cart">Korpa</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}  
export default NavBar