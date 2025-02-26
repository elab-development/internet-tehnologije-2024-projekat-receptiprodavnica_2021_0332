import React, { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

const RecipesList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [error, setError] = useState(null);
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
  }, [location.pathname]);

  const fetchFilteredRecipes = (filterType, value) => {
    let queryParam = "";
    
    if (filterType === "kategorija") {
      queryParam = `kategorija=${value}`;
    } else if (filterType === "vreme_pripreme") {
      queryParam = `vreme_pripreme=${value}`;
    } else if (filterType === "broj_kalorija") {
      queryParam = `broj_kalorija=${value}`;
    }

    console.log("API URL:", `http://127.0.0.1:8000/api/recepti/pretraga?${queryParam}`);
  
    console.log(queryParam);
    axios.get(`http://127.0.0.1:8000/api/recepti/pretraga?${queryParam}`)
    
      .then((response) => {
        console.log("API Response:", response.data); // Proveri šta se dobija kao odgovor
        setRecipes(response.data);
        setLoading(false);
        setIsSidebarOpen(false); // Zatvori sidebar nakon filtriranja
      })
      .catch((error) => {
        console.error("Greška:", error);
        setError("Neuspešno učitavanje recepata");
        setLoading(false);
      });
  };
  
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

  if (loading) return <p className="loading-text">Učitavanje recepta...</p>;
  if (error) return <p>Greška: {error}</p>;

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
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Hladna predjela")}>Hladna predjela</button></li>
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Salate")}>Salate</button></li>
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Paste i rižota")}>Paste i rižota</button></li>
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Glavna jela")}>Glavna jela</button></li>
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Kolači")}>Kolači</button></li>
              <li><button onClick={() => fetchFilteredRecipes("kategorija", "Torte")}>Torte</button></li>
              </ul>
            </>
          )}

          {/* Podkategorije za "Vreme pripreme" */}
          {currentMenu === "vreme-pripreme" && (
            <>
              <button className="back-btn" onClick={() => setCurrentMenu("recipes")}> ←</button>
              <h3>Vreme pripreme</h3>
              <ul>
              <li><button onClick={() => fetchFilteredRecipes("vreme_pripreme", "do_30")}>Do 30 minuta</button></li>
              <li><button onClick={() => fetchFilteredRecipes("vreme_pripreme", "30_60")}>Između 30 i 60 minuta</button></li>
              <li><button onClick={() => fetchFilteredRecipes("vreme_pripreme", "preko_60")}>Preko 60 minuta</button></li>
              </ul>
            </>
          )}

          {/* Podkategorije za "Broj kalorija" */}
          {currentMenu === "broj-kalorija" && (
            <>
              <button className="back-btn" onClick={() => setCurrentMenu("recipes")}>←</button>
              <h3>Broj kalorija</h3>
              <ul>
              <li><button onClick={() => fetchFilteredRecipes("broj_kalorija", "Niskokalorični")}>Niskokalorični</button></li>
              <li><button onClick={() => fetchFilteredRecipes("broj_kalorija", "Srednjekalorični")}>Srednjekalorični</button></li>
              <li><button onClick={() => fetchFilteredRecipes("broj_kalorija", "Visokokalorični")}>Visokokalorični</button></li>
              </ul>
            </>
          )}
        </div>
      )}
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map((recipe) => (
        <div
        key={recipe.idRecepta}
        className="recipe-box"
        onClick={() => navigate(`/recepti/${recipe.idRecepta}`, { state: { from: location.pathname, imageUrl: recipe.slika } })}
        >
        <img src={`http://127.0.0.1:8000/storage/${recipe.slika}`} alt={recipe.naziv} className="recipe-list-image" />
        <h3>{recipe.naziv}</h3>
        <p><i className="fa-regular fa-clock"></i> {recipe.vremePripreme} min</p>
       </div>
       ))
        ) : (
       <p className="no-recipes-message">Nema recepata za ovu kategoriju.</p>
      )}

      </div>
      );
      };

export default RecipesList;