import React, { useState } from "react";
import axios from "axios";

const MojiSastojci = () => {
  const [sastojci, setSastojci] = useState([]);
  const [noviSastojak, setNoviSastojak] = useState("");
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [korpa, setKorpa] = useState([]);
  const token = localStorage.getItem('token');
  const handleDodajSastojak = () => {
    if (noviSastojak.trim() && !sastojci.includes(noviSastojak.trim())) {
      setSastojci([...sastojci, noviSastojak.trim()]);
      setNoviSastojak("");
    }
  };

  const handleDodajUKorpu = async (idRecepta) => {
    try {
      const response = await axios.post("http://localhost:8000/api/korpa/dodaj", {
        idRecepta: idRecepta,
        sastojci: sastojci, // Lista sastojaka koje korisnik već ima
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Proveri da li već postoji proizvod u korpi
      setKorpa((prevKorpa) => {
        const noviSastojci = response.data.noviSastojci;
        let updatedKorpa = [...prevKorpa];  // Kopira prethodnu korpu
  
        // Prolazimo kroz nove sastojke i proveravamo da li su već u korpi
        noviSastojci.forEach((noviSastojak) => {
          const existingItemIndex = updatedKorpa.findIndex(item => item.idProizvoda === noviSastojak.idProizvoda);
  
          if (existingItemIndex !== -1) {
            // Ako postoji, samo povećaj količinu
            updatedKorpa[existingItemIndex] = {
              ...updatedKorpa[existingItemIndex],
              kolicina: updatedKorpa[existingItemIndex].kolicina + 1
            };
          } else {
            // Ako ne postoji, dodaj novi proizvod u korpu
            updatedKorpa.push(noviSastojak);
          }
        });
  
        return updatedKorpa;  // Vraćaš ažuriranu listu
      });
  
      console.log("Lista sastojaka: ", sastojci);
      console.log(response.data);
  
      alert(response.data.message); // Notifikacija korisniku
    } catch (error) {
      console.error("Greška pri dodavanju u korpu:", error);
      alert("Došlo je do greške pri dodavanju sastojaka u korpu.");
    }
  };
  
  
  const handleObrisiSastojak = (index) => {
    setSastojci(sastojci.filter((_, i) => i !== index));
  };

  const handlePretraziRecepte = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/pretraga-recepata", {
        sastojci,
      });

      setRecepti(response.data.data);
    } catch (error) {
      setError("Nema recepata za ove sastojke.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Moji sastojci</h2>

      <div className="input-container">
        <input
          type="text"
          value={noviSastojak}
          onChange={(e) => setNoviSastojak(e.target.value)}
          placeholder="Unesite sastojak..."
        />
        <button onClick={handleDodajSastojak}>Dodaj</button>
      </div>

      <ul>
        {sastojci.map((sastojak, index) => (
          <li key={index}>
            {sastojak} <button onClick={() => handleObrisiSastojak(index)}>X</button>
          </li>
        ))}
      </ul>

      <button onClick={handlePretraziRecepte} disabled={loading}>
        {loading ? "Pretražujem..." : "Prikaži recepte"}
      </button>

      {error && <p className="error">{error}</p>}

      {recepti.length > 0 && (
        <div>
          <h3>Pronađeni recepti:</h3>
          <ul>
            {recepti.map((recept) => (
              <li key={recept.idRecepta}>
                {recept.naziv}
                <button onClick={() => handleDodajUKorpu(recept.idRecepta)}>Dodaj nedostajuće u korpu</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MojiSastojci;
