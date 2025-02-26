import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const MojiSastojci = ({ azurirajKorpu }) => {
  const [sastojci, setSastojci] = useState(() => {
    return JSON.parse(sessionStorage.getItem("sastojci")) || [];
  });
  const [noviSastojak, setNoviSastojak] = useState("");
  const [recepti, setRecepti] = useState(() => {
    return JSON.parse(sessionStorage.getItem("recepti")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Za prikaz grešaka
  const [successMessage, setSuccessMessage] = useState(""); // Za prikaz uspešnih poruka
  const [korpa, setKorpa] = useState([]);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("sastojci", JSON.stringify(sastojci));
    sessionStorage.setItem("recepti", JSON.stringify(recepti));
  }, [sastojci, recepti]);

  const handleDodajSastojak = () => {
    if (noviSastojak.trim() && !sastojci.includes(noviSastojak.trim())) {
      setSastojci([...sastojci, noviSastojak.trim()]);
      setNoviSastojak("");
    }
  };

  const handleObrisiSastojak = (index) => {
    setSastojci(sastojci.filter((_, i) => i !== index));
  };

  const handlePretraziRecepte = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setRecepti([]); // Resetujemo listu recepata pre nove pretrage
  
    try {
      const response = await axios.post("http://localhost:8000/api/pretraga-recepata", { sastojci });
  
      setRecepti(response.data.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
  
      if (error.response && error.response.status === 404) {
        setErrorMessage("Nema recepata za ove sastojke.");
      } else {
        setErrorMessage("Došlo je do greške pri pretrazi recepata.");
      }
  
      setRecepti([]); // Brišemo stare rezultate
    }
  
    setLoading(false);
  };
  
  

  const handleDodajUKorpu = async (idRecepta) => {
    setErrorMessage("");
    setSuccessMessage(""); // Resetujemo poruke pre novog pokušaja

    try {
      const response = await axios.post(
        "http://localhost:8000/api/korpa/dodaj",
        { idRecepta: idRecepta, sastojci: sastojci },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.data || !response.data.noviSastojci) {
        console.error("Greška: Odgovor sa servera ne sadrži 'noviSastojci'.", response.data);
        setErrorMessage("Došlo je do greške pri dodavanju sastojaka u korpu.");
        return;
      }

      const noviSastojci = response.data.noviSastojci;

      setKorpa((prevKorpa) => {
        const updatedKorpa = [...prevKorpa];

        noviSastojci.forEach((noviSastojak) => {
          const existingItem = updatedKorpa.find((item) => item.idProizvoda === noviSastojak.idProizvoda);

          if (existingItem) {
            existingItem.kolicina += noviSastojak.kolicina || 1;
          } else {
            updatedKorpa.push({ ...noviSastojak, kolicina: noviSastojak.kolicina || 1 });
          }
        });

        return updatedKorpa;
      });

      if (azurirajKorpu) {
        await azurirajKorpu();
      } else {
        console.warn("azurirajKorpu nije definisana!");
      }

      // Postavljanje poruke o uspehu
      setSuccessMessage(response.data.message || "Sastojci su uspešno dodati u korpu!");

      // Automatsko uklanjanje poruke nakon 3 sekunde
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Greška pri dodavanju u korpu:", error);
      setErrorMessage("Došlo je do greške pri dodavanju sastojaka u korpu.");
    }
  };

  return (
    <div className="container-ms">
      <h2>Unesite sastojke koje imate kod kuće i pretražujte recepte</h2>

      <div className="input-container">
        <input
          type="text"
          value={noviSastojak}
          onChange={(e) => setNoviSastojak(e.target.value)}
          placeholder="Unesite sastojak..."
        />
        <button className="dodaj-sastojak" onClick={handleDodajSastojak}>Dodaj</button>
        <button className="pretrazi-recepte" onClick={handlePretraziRecepte} disabled={loading}>
          {loading ? "Pretražujem..." : "Prikaži recepte"}
        </button>
      </div>

      <ul>
        {sastojci.map((sastojak, index) => (
          <li className="imeSastojka" key={sastojak + index}>
            {sastojak}{" "}
            <button className="brisiSastojak" onClick={() => handleObrisiSastojak(index)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </li>
        ))}
      </ul>

      {/* Prikaz poruka */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {recepti.length > 0 && (
        <div>
          <h3 className="pronadjeni-recepti">Pronađeni recepti:</h3>
          <ul>
            <div className="recipes-container">
              {recepti.map((recept) => (
                <div
                  key={recept.idRecepta}
                  className="recepti-box"
                  onClick={() =>
                    navigate(`/recepti/${recept.idRecepta}`, {
                      state: { from: location.pathname, imageUrl: recept.slika },
                    })
                  }
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${recept.slika}`}
                    alt={recept.naziv}
                    className="recipe-list-image"
                  />
                  <h3>{recept.naziv}</h3>
                  <button
                    className="dugme-nedostajuci"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDodajUKorpu(recept.idRecepta);
                    }}
                  >
                    Dodaj nedostajuće u korpu
                  </button>
                </div>
              ))}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MojiSastojci;
