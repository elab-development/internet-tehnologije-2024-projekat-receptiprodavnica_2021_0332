import React, { useEffect, useState } from "react";

const Korpa = ({pocetnaKorpa}) => {
  const [korpa, setKorpa] = useState([]);

  useEffect(() => {
    const fetchKorpa = async () => {
      const response = await fetch("http://localhost:8000/api/korpa", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) {
        setKorpa(data.stavke);
      }
    };

    fetchKorpa();
  }, []);

  return (
    <div className="korpa">
      <h2>Vaša korpa</h2>
      {korpa.length === 0 ? (
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
            <strong>Ukupno:</strong> {korpa.reduce((sum, stavka) => sum + stavka.kolicina * stavka.cena, 0)} RSD
          </div>
        </>
      )}
    </div>
  );
  
};

export default Korpa;
