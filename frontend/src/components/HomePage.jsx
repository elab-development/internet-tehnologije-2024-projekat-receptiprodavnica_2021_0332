import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const popularRecipes = [
    { 
      id: 1, 
      name: "Alfredo Chicken Pasta", 
      image: "/images/Chicken-alfredo.jpg"
    },
    { 
      id: 89, 
      name: "Grčka salata", 
      image: "/images/Grcka-salata.jpeg", 
    },
    { 
      id: 90, 
      name: "Biftek sa maslacem od belog luka", 
      image: "/images/Garlic-butter-steak.jpg",
    },
    { 
      id: 91, 
      name: "Čokoladni sufle", 
      image: "/images/Souffle.jpg", 
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">COOKMATE</h1>
      </header>

      <section className="popular-recipes">
        <h2 className="section-title">POPULARNI RECEPTI</h2>
        <div className="recipes-list">
          {popularRecipes.map(recipe => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <button
              className="details-button"
              onClick={() => {
              // Proverite sliku pre nego što je pošaljete
              navigate(`/recepti/${recipe.id}`, { state: { imageUrl: recipe.image } });
               }}
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
