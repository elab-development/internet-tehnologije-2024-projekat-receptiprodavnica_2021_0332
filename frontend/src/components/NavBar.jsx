import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = ({ korpa, setKorpa, setRecipes}) => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(""); // Praćenje trenutnog menija
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Prati stanje korisnika
  const navigate = useNavigate();

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

  const handleCategoryClick = (kategorija) => {
    navigate(`/proizvodi?kategorija=${kategorija}`);  // Navigacija do odgovarajuće kategorije
    setIsSidebarOpen(false);  // Zatvori sidebar nakon što se odabere kategorija
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Ako postoji token, korisnik je ulogovan
  }, []);

  const handleLogout = () => {
    const userId = localStorage.getItem("user_id"); // Prvo uzmemo ID korisnika
    if (userId) {
      localStorage.setItem(`korpa_${userId}`, JSON.stringify(korpa)); // Sačuvamo korpu pre brisanja
    }
    localStorage.removeItem("token"); 
    localStorage.removeItem("user_id"); // Brišemo ID korisnika
    setKorpa([]); // Praznimo stanje korpe u aplikaciji
    setIsLoggedIn(false);
    navigate("/login");
  };

return (
<>
  <nav className="navbar">
    {/* <div className="logo">CookMate</div> */}
    <Link to="/" className="logo">CookMate</Link>
      <ul className="nav-links">
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/moji-sastojci">Moji sastojci</Link></li>
        <li className="dropdown">
        <button
          className="dropdown-button"
          onClick={() => {
          setTimeout(() => {
          navigate("/recepti"); // Navigiraj na stranicu sa svim receptima
          }, 300); // Kratko kašnjenje da sidebar prvo reaguje
          }}
          >
          Recepti
      </button>
        </li>
        <li className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => toggleSidebar("products")}
            >Proizvodi</button>
        </li>
        {isLoggedIn && (
          <li><Link to="/korpa">Korpa ({korpa && korpa.length ? korpa.length : 0})</Link></li>
        )}
        <li>
        {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
        </li>
                  </ul>
                </nav>
                {/* Bočni meni */}
                {isSidebarOpen && (
                  <div className={`sidebar open`}>
                    <button className="close-btn" onClick={handleBackClick}>×</button>
          
                    {/* Kategorije proizvoda */}
                    {currentMenu === "products" && (
                      <><h3>Kategorije proizvoda</h3>
                        <ul>
                          <li><button onClick={() => handleCategoryClick("voce")}>Voće</button></li>
                          <li><button onClick={() =>  handleCategoryClick("mlecni-proizvodi")}>Mlečni proizvodi</button></li>
                          <li><button onClick={() =>  handleCategoryClick("meso")}>Meso</button></li>
                          <li><button onClick={() =>  handleCategoryClick("povrce")}>Povrće</button></li>
                          <li><button onClick={() =>  handleCategoryClick("zitarice")}>Žitarice</button></li>
                          <li><button onClick={() =>  handleCategoryClick("testenina")}>Testenine</button></li>
                          <li><button onClick={() =>  handleCategoryClick("ulje-zacin")}>Ulja i začini</button></li>
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </>
            );
          };
export default NavBar