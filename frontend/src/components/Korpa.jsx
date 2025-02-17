import React, { useEffect, useState } from "react";
import Checkout from './Checkout'; // Uvozi Checkout komponentu


const Korpa = ({ korpa, setKorpa, resetKorpa }) => {
  
  // Funkcija za uklanjanje proizvoda iz korpe
  const removeProduct = (idProizvoda) => {
    const novaKorpa = korpa.filter(stavka => stavka.idProizvoda !== idProizvoda);
    setKorpa(novaKorpa); // Ažuriraj korpu sa novim stanjem
  };

  // Funkcija za ažuriranje količine proizvoda
  const updateQuantity = (idProizvoda, action) => {
    setKorpa((prevKorpa) => 
      prevKorpa.map((stavka) => 
        stavka.idProizvoda === idProizvoda
          ? {
              ...stavka,
              kolicina: action === "increment" ? stavka.kolicina + 1 : stavka.kolicina > 1 ? stavka.kolicina - 1 : stavka.kolicina
            }
          : stavka
      )
    );
  };

  // Funkcija za čuvanje korpe u localStorage
  useEffect(() => {
    localStorage.setItem("korpa", JSON.stringify(korpa));
  }, [korpa]);


 // Skrolovanje ka delu za unos podataka
 const scrollToCheckout = () => {
  const checkoutSection = document.getElementById('checkout');
  if (checkoutSection) {
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <div>
    <div className="korpa">
      <h2>Vaša korpa</h2>
      
      {!localStorage.getItem("token") ? (
        <p>Morate biti ulogovani da biste videli korpu.</p>
      ) : korpa === null || korpa.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        <>
          <ul>
            {korpa.map((stavka) => (
              <li key={stavka.idProizvoda}>
                <div className="dugme-kolicina-container">
                <button className = "dugme-kolicina" onClick={() => updateQuantity(stavka.idProizvoda, "decrement")}>-</button>
                <button className = "dugme-kolicina"  onClick={() => updateQuantity(stavka.idProizvoda, "increment")}>+</button>
                </div>
                <div className="proizvod-info">
                {stavka.proizvod.naziv}: {stavka.kolicina} x {stavka.cena} RSD
                </div>
                <div className="remove-icon" onClick={() => removeProduct(stavka.idProizvoda)}>
                <i class="fa-solid fa-trash-can"></i>
                </div>
              </li>
            ))}
          </ul>
          <div className="ukupno">
            <strong>Ukupno:</strong> {(korpa.reduce((sum, stavka) => sum + stavka.kolicina * stavka.cena, 0)).toFixed(2)} RSD
          </div>
        </>
          
      )}
    </div>
    {/* Dugme za skrolovanje na checkout */}
    <div className="dugme-ispod-korpe">
    <button className="idi-na-placanje" onClick={scrollToCheckout}>
      <h2>Idi na plaćanje</h2>
    </button>
  </div>
  <Checkout resetKorpa={resetKorpa} />
</div>
);
};

export default Korpa;