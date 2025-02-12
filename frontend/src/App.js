import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RecipeDetailsPage from './components/RecipeDetailsPage';
import Proizvodi from './components/Proizvodi';
import Korpa from './components/Korpa';
;

function App() {
  const [korpa, setKorpa] = useState([]);

  // Funkcija za osvežavanje korpe (poziva se nakon dodavanja u korpu)
  const azurirajKorpu = async () => {
    const response = await fetch("http://localhost:8000/api/korpa", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    if (response.ok) {
      setKorpa(data.stavke || []);
    } else {
      console.error("Greška pri osvežavanju korpe", data.message);
    }
  };
  
  useEffect(() => {
    azurirajKorpu(); // Učitavamo korpu pri pokretanju aplikacije
  }, []);

  return (
    <BrowserRouter className="App">
      <NavBar /> {/* Navigacioni bar */}
      <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/recepti/:id" element={<RecipeDetailsPage />} />
      <Route path="/proizvodi" element={<Proizvodi azurirajKorpu={azurirajKorpu} />} />
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/korpa" element={<Korpa korpa={korpa} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
