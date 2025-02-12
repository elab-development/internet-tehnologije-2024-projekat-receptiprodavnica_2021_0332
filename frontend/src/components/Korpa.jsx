import React, { useEffect, useState } from "react";

const Korpa = ({korpa}) => {
  
  return (
    <div className="korpa">
      <h2>Vaša korpa</h2>
      
      {!localStorage.getItem("token") ? (
      <p>Morate biti ulogovani da biste videli korpu.</p>):
      korpa === null || korpa.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        <>
        <ul>
            {korpa.map((stavka) => (
              <li key={stavka.idProizvoda}>
                {stavka.proizvod.naziv}: {stavka.kolicina} x {stavka.cena} RSD
              </li>
            ))}
          </ul>
          <div className="ukupno">
          <strong>Ukupno:</strong> {(korpa.reduce((sum, stavka) => sum + stavka.kolicina * stavka.cena, 0)).toFixed(2)} RSD

          </div>
        </>
      )}
    </div>
  );
  
};

export default Korpa;
