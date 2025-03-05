import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const navigate = useNavigate();

  // Funkcija koja nasumično bira 4 recepta iz liste
  const getRandomRecipes = (recipes) => {
    // Nasumično mešanje liste recepata
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // Uzima samo prva 4 recepta nakon mešanja
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch svih recepata sa API-a (pretpostavljam da postoji endpoint za to)
        const response = await axios.get('http://127.0.0.1:8000/api/recepti');
        const fetchedRecipes = response.data;

        // Dobijanje nasumičnih recepata
        const randomFourRecipes = getRandomRecipes(fetchedRecipes);

        // Setovanje nasumičnih recepata u stanje
        setRandomRecipes(randomFourRecipes);
      } catch (error) {
        console.error('Greška pri učitavanju recepata:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">COOKMATE</h1>
        <button 
          className="sastojci-button"
          onClick={() => navigate("/moji-sastojci")}
        >
          MOJI SASTOJCI
        </button>
      </header>

      <section className="popular-recipes">
        <h2 className="section-title">POPULARNI RECEPTI</h2>
        <div className="recipes-list">
          {randomRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.idRecepta}>
              <img src={`http://127.0.0.1:8000/storage/${recipe.slika}`} alt={recipe.naziv} className="recipe-image" />
              <h3 className="recipe-name">{recipe.naziv}</h3>
              <button
                className="details-button"
                onClick={() => navigate(`/recepti/${recipe.idRecepta}`, { state: { imageUrl: recipe.slika } })}
              >
                Vidi detalje
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;