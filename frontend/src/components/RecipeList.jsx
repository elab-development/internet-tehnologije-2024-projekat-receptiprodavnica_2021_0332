import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; 

const RecipesList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
  const { kategorija } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/recepti") // API poziv za sve recepte
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška:", error);
        setError("Neuspešno učitavanje recepata");
        setLoading(false);
      });
  }, []);

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
    navigate(`/recepti/${kategorija}`); // Navigacija do odgovarajuće kategorije
    setIsSidebarOpen(false); // Zatvori sidebar nakon što se odabere kategorija
  };

  if (loading) return <p>Učitavanje recepata...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipes-container">
      {/* Ikona za otvaranje sidebar-a */}
      <div className="filter-icon" onClick={() => toggleSidebar("recipes")}>
        <i className="fa-solid fa-filter"></i>    
      </div>

      {/* Sidebar sa filtrima */}
      {isSidebarOpen && (
        <div className="sidebar-recipeList open">
          <button className="close-btn" onClick={handleBackClick}>×</button>

          {/* Kategorije za recepte */}
          {currentMenu === "recipes" && (
            <>
              <ul>
                <li><button onClick={() => setCurrentMenu("kategorija-jela")}>Kategorija jela </button></li>
                <li><button onClick={() => setCurrentMenu("vreme-pripreme")}> Vreme pripreme</button></li>
                <li><button onClick={() => setCurrentMenu("broj-kalorija")}>Broj kalorija</button></li>
              </ul>
            </>
          )}

          {/* Podkategorije za "Kategorija jela" */}
          {currentMenu === "kategorija-jela" && (
            <>
              <button className="back-btn" onClick={() => setCurrentMenu("recipes")}> ←</button>
              <h3>Kategorija jela</h3>
              <ul>
              <li><Link to="/recepti/predjela">Hladna predjela</Link></li>
                <li><Link to="/recepti/salate">Salate</Link></li>
                <li><Link to="/recepti/paste-rizoto">Paste i rižota</Link> </li>
                <li><Link to="/recepti/glavna-jela">Glavna jela</Link></li>
                <li><Link to="/recepti/kolaci">Kolači</Link> </li>
                <li><Link to="/recepti/torte">Torte</Link></li>
              </ul>
            </>
          )}

          {/* Podkategorije za "Vreme pripreme" */}
          {currentMenu === "vreme-pripreme" && (
            <>
              <button className="back-btn" onClick={() => setCurrentMenu("recipes")}> ←</button>
              <h3>Vreme pripreme</h3>
              <ul>
                <li><Link to="/recepti/30">Do 30 minuta</Link></li>
                <li> <Link to="/recepti/30-60">Između 30 i 60 minuta</Link></li>
                <li><Link to="/recepti/60">Preko 60 minuta</Link></li>
              </ul>
            </>
          )}

          {/* Podkategorije za "Broj kalorija" */}
          {currentMenu === "broj-kalorija" && (
            <>
              <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>←</button>
              <h3>Broj kalorija</h3>
              <ul>
                <li><Link to="/recepti/niskokaloricni">Niskokalorični</Link></li>
                <li><Link to="/recepti/srednjekaloricni">Srednjekalorični</Link></li>
                <li><Link to="/recepti/visokokaloricni">Visokokalorični</Link></li>
              </ul>
            </>
          )}
        </div>
      )}
      {recipes.map((recipe) => (
        <div
          key={recipe.idRecepta}
          className="recipe-box"
          onClick={() => navigate(`/recepti/${recipe.idRecepta}`, { state: { from: location.pathname, imageUrl: recipe.slika } })}
        ><img src={`http://127.0.0.1:8000/storage/${recipe.slika}`} alt={recipe.naziv} className="recipe-list-image" />
          <h3>{recipe.naziv}</h3>
          <p><i class="fa-regular fa-clock"></i>  {recipe.vremePripreme} min</p>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;