import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Proizvodi = () => {
  const [searchParams] = useSearchParams();
  const kategorija = searchParams.get("kategorija");
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/proizvodi/pretraga?kategorija=${kategorija}`);
        if (!response.ok) {
          throw new Error("Nema proizvoda za ovu kategoriju!");
        }
        const data = await response.json();
        setProizvodi(data.proizvodi.data);
      } catch (error) {
        setGreska(error.message);
      }
    };

    if (kategorija) {
      fetchData();
    }
  }, [kategorija]);

  return (
    <section className="proizvodi-section">
      <h2 className="proizvodi-title">Proizvodi</h2>
      {greska ? (
        <p>{greska}</p>
      ) : (
        <div className="proizvodi-list">
          {proizvodi.map(proizvod => (
            <div className="proizvodi-card" key={proizvod.id}>
              <img src={proizvod.slika} alt={proizvod.naziv} className="proizvodi-image" />
              <h3 className="proizvodi-name">{proizvod.naziv}</h3>
              <p className="proizvodi-description">Cena: {proizvod.cena} RSD</p>
              <button
                className="buy-button"
                /*onClick={() => kupiProizvod(proizvod.id)}*/
              >
                Kupi
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Proizvodi;
