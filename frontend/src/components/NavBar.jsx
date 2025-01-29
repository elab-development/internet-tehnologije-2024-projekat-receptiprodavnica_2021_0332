import React, { useState } from 'react'
import { Link } from "react-router-dom";
const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(""); // Praćenje trenutnog menija

  const toggleSidebar = (menu = "") => {
    if (isSidebarOpen && currentMenu === menu) {
      setIsSidebarOpen(false); // Zatvori sidebar ako je isti meni već otvoren
      setCurrentMenu("");
    } else {
      setIsSidebarOpen(true); // Otvori sidebar i postavi trenutni meni
      setCurrentMenu(menu);
    }
  };
  const handleBackClick = () => {
    setCurrentMenu(""); // Povratak na glavni meni
    setIsSidebarOpen(false); // Zatvori sidebar
  };

             {/* <div className="dropdown-content">
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
            </div> */}
return (
<>
  <nav className="navbar">
    <div className="logo">CookMate</div>
      <ul className="nav-links">
        <li>
           <Link to="/">Početna</Link>
        </li>
        <li>
            <Link to="/moji-sastojci">Moji sastojci</Link>
        </li>
        <li className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => toggleSidebar("recipes")}
            >Recepti</button>
        </li>
        <li className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => toggleSidebar("products")}
            >Proizvodi</button>
        </li>
        <li>
            <Link to="/cart">Korpa</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
                  </ul>
                </nav>
                {/* Bočni meni */}
                {isSidebarOpen && (
                  <div className={`sidebar open`}>
                    <button className="close-btn" onClick={handleBackClick}>
                      ×
                    </button>
          
                    {/* Kategorije proizvoda */}
                    {currentMenu === "products" && (
                      <>
                        <h3>Kategorije proizvoda</h3>
                        <ul>
                          <li>
                            <Link to="/proizvodi/voce">Voće</Link>
                          </li>
                          <li>
                            <Link to="/proizvodi/mlecni-proizvodi">Mlečni proizvodi</Link>
                          </li>
                          <li>
                            <Link to="/proizvodi/meso">Meso</Link>
                          </li>
                          <li>
                            <Link to="/proizvodi/povrce">Povrće</Link>
                          </li>
                        </ul>
                      </>
                    )}
          
                    {/* Kategorije recepata */}
                    {currentMenu === "recipes" && (
                      <>
                        <ul>
                          <li>
                            <button onClick={() => setCurrentMenu("kategorija-jela")}>
                              Kategorija jela
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setCurrentMenu("tip-jela")}>
                              Tip jela
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setCurrentMenu("vreme-pripreme")}>
                              Vreme pripreme
                            </button>
                          </li>
                          <li>
                            <button onClick={() => setCurrentMenu("broj-kalorija")}>
                              Broj kalorija
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
          
                    {/* Podkategorije za "Kategorija jela" */}
                    {currentMenu === "kategorija-jela" && (
                      <>
                        <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>
                          ←
                        </button>
                        <h3>Kategorija jela</h3>
                        <ul>
                          <li>
                            <Link to="/recepti/slatko">Slatko</Link>
                          </li>
                          <li>
                            <Link to="/recepti/slano">Slano</Link>
                          </li>
                          <li>
                            <Link to="/recepti/posno">Posno</Link>
                          </li>
                          <li>
                            <Link to="/recepti/vegansko">Vegansko</Link>
                          </li>
                        </ul>
                      </>
                    )}
          {/* Podkategorije za "Tip jela" */}
          
          {currentMenu === "tip-jela" && (
                      <>
                        <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>
                          ←
                        </button>
                        <h3>Tip jela</h3>
                        <ul>
                          <li>
                            <Link to="/recepti/predjelo">Predjelo</Link>
                          </li>
                          <li>
                            <Link to="/recepti/glavno-jelo">Glavno jelo</Link>
                          </li>
                          <li>
                            <Link to="/recepti/desert">Desert</Link>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentMenu === "vreme-pripreme" && (
                      <>
                        <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>
                          ←
                        </button>
                        <h3>Vreme pripreme</h3>
                        <ul>
                          <li>
                            <Link to="/recepti/30">Do 30 minuta</Link>
                          </li>
                          <li>
                            <Link to="/recepti/30-60">Između 30 i 60 minuta</Link>
                          </li>
                          <li>
                            <Link to="/recepti/60">Preko 60 minuta</Link>
                          </li>
                        </ul>
                      </>
                    )}
                    {currentMenu === "broj-kalorija" && (
                      <>
                        <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>
                          ←
                        </button>
                        <h3>Broj kalorija</h3>
                        <ul>
                          <li>
                            <Link to="/recepti/niskokaloricni">Niskokalorični</Link>
                          </li>
                          <li>
                            <Link to="/recepti/srednjekaloricni">Srednjekalorični</Link>
                          </li>
                          <li>
                            <Link to="/recepti/visokokaloricni">Visokokalorični</Link>
                          </li>
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </>
            );
          };
export default NavBar