import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Proizvodi = ({ azurirajKorpu }) => {
  const [searchParams] = useSearchParams();
  const kategorija = searchParams.get("kategorija");
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");
  const [modal, setModal] = useState(null); // Drži proizvod koji korisnik dodaje
  const [kolicina, setKolicina] = useState(1); // Početna količina
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const [ukupnoStranica, setUkupnoStranica] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/proizvodi/pretraga?kategorija=${kategorija}&page=${trenutnaStranica}`);
        if (!response.ok) {
          throw new Error("Nema proizvoda za ovu kategoriju!");
        }
        const data = await response.json();
        setProizvodi(data.proizvodi.data);
        setUkupnoStranica(data.proizvodi.last_page);
      } catch (error) {
        setGreska(error.message);
      }
    };

    if (kategorija) {
      fetchData();
    }
  }, [kategorija,trenutnaStranica]);

  const promeniStranicu = (novaStranica) => {
    if (novaStranica >= 1 && novaStranica <= ukupnoStranica) {
      setTrenutnaStranica(novaStranica);
    }
  };

  // Dodavanje proizvoda u korpu
  const dodajUKorpu = async () => {
    if (!localStorage.getItem("token")) {
      setGreska("Morate biti ulogovani da biste dodali proizvod u korpu!");
      return;
    }
    if (!modal) return;
    try {
      const response = await fetch(`http://localhost:8000/api/korpa/${modal.idProizvoda}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ kolicina }),
      });
  
      const data = await response.json(); // Pretvori odgovor u JSON
      if (response.ok) {
        azurirajKorpu(); // Ažuriraj korpu
        setModal(null);
        setKolicina(1); // Resetuj količinu na 1
      } else {
        console.error(data.message); // Ako nije ok, prikaži grešku
        setGreska(data.message);
      }
    } catch (error) {
      console.error("Greška pri dodavanju u korpu", error);
      setGreska("Greška pri dodavanju u korpu");
    }
  };

  return (
    <section className="proizvodi-section">
      <h2 className="proizvodi-title">Proizvodi</h2>
      {greska && <p className="error-korpa">{greska}</p>}

      
        <div className="proizvodi-list">
          {proizvodi.map(proizvod => (
            <div className="proizvodi-card" key={proizvod.idProizvoda}>
              <img src={proizvod.slika} alt={proizvod.naziv} className="proizvodi-image" />
              <h3 className="proizvodi-name">{proizvod.naziv}</h3>
              <p className="proizvodi-description">{proizvod.cena} RSD/{proizvod.mernaJedinica}</p>
              <button
                className="buy-button"
                onClick={() => setModal(proizvod)}
              >
                Dodaj u korpu
              </button>
            </div>
          ))}
        </div>

      {/* Dugmad za paginaciju */}
      <div className="paginacija">
        <button
          onClick={() => promeniStranicu(trenutnaStranica - 1)}
          disabled={trenutnaStranica === 1}
        >
          Prethodna
        </button>
        <span> Stranica {trenutnaStranica} od {ukupnoStranica}</span>
        <button
          onClick={() => promeniStranicu(trenutnaStranica + 1)}
          disabled={trenutnaStranica === ukupnoStranica}
        >
          Sledeća
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Dodaj {modal.naziv} u korpu</h3>
            <input className = "input-kolicina"
              type="number"
              min="1"
              value={kolicina}
              onChange={(e) => setKolicina(parseInt(e.target.value))}
            />
            <button className="potvrdi-button" onClick={dodajUKorpu}>Potvrdi</button>
            <button className="otkazi-button"onClick={() => setModal(null)}>Otkaži</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Proizvodi;
