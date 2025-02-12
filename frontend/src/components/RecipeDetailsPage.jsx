
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Importuj useHistory za navigaciju
import axios from "axios"; // Importuj axios

const RecipeDetailsPage = () => {
  const { id } = useParams(); // Uzima ID recepta iz URL-a
  const { state } = useLocation(); // Uzima state iz URL-a (ako je poslat)
  const navigate = useNavigate(); // Korišćenje useNavigate za navigaciju
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    console.log(state);
    // Koristi axios za poziv API-ja
    axios.get(`http://127.0.0.1:8000/api/recepti/${id}`)
      .then((response) => {
        console.log(response);
        setRecipe(response.data); // Postavlja podatke recepta
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška:", error);
        setError("Neuspešno učitavanje recepta");
        setLoading(false);
      });
  }, [id,state]);

  const handleBack = () => {
    navigate("/"); // Vraća korisnika na početnu stranu (ili drugu stranicu po vašoj želji)
  };

  if (loading) return <p className="loading-text">Učitavanje recepta...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="recipe-details-container">
      <h1>{recipe.naziv}</h1>
      <div className="recipe-content-wrapper">
      <div className="recipe-image-container">
      <img src={state?.imageUrl || '/images/default.jpg'} alt={recipe?.naziv} className="recipe-image-details" />
      </div>
      <div className="recipe-content">
        
        <h3>Uputstvo:</h3>
        <p>{recipe.uputstvo}</p>
        <p><strong>Vreme pripreme:</strong> {recipe.vremePripreme} minuta</p>
        <p><strong>Broj porcija:</strong> {recipe.brojPorcija}</p>
        <p><strong>Kategorija jela:</strong> {recipe.kategorija}</p>
        <p><strong>Tip jela:</strong> {recipe.tip}</p>
        <p><strong>Broj kalorija:</strong> {recipe.broj_kalorija}</p>
      </div>
      </div>
      <button className="back-btn-details" onClick={handleBack}>Povratak</button>
    </div>
  );
};

export default RecipeDetailsPage;
