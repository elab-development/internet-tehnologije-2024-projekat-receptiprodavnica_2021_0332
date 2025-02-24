import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";

const MojiSastojci = ({azurirajKorpu}) => {
  const [sastojci, setSastojci] = useState([]);
  const [noviSastojak, setNoviSastojak] = useState("");
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [korpa, setKorpa] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  const handleDodajSastojak = () => {
    if (noviSastojak.trim() && !sastojci.includes(noviSastojak.trim())) {
      setSastojci([...sastojci, noviSastojak.trim()]);
      setNoviSastojak("");
    }
  };

  const handleDodajUKorpu = async (idRecepta) => {
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
            alert("Došlo je do greške pri dodavanju sastojaka u korpu.");
            return;
        }

        const noviSastojci = response.data.noviSastojci;

        // Update the cart state based on the response
        setKorpa((prevKorpa) => {
            const updatedKorpa = [...prevKorpa];

            noviSastojci.forEach((noviSastojak) => {
                const existingItem = updatedKorpa.find(item => item.idProizvoda === noviSastojak.idProizvoda);

                if (existingItem) {
                    // If the item already exists in the cart, increase the quantity
                    existingItem.kolicina += noviSastojak.kolicina || 1;
                } else {
                    // Otherwise, add the new item to the cart
                    updatedKorpa.push({ ...noviSastojak, kolicina: noviSastojak.kolicina || 1 });
                }
            });

            return updatedKorpa;
        });

        console.log("Ažurirana korpa:", korpa); // Ensure you're logging after state is updated

        if (azurirajKorpu) {
            await azurirajKorpu(); // Refresh cart display
        } else {
            console.warn("azurirajKorpu nije definisana!");
        }

        alert(response.data.message);
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
      <h2>Unesite sastojke koje imate kod kuće i pretražujte recepte</h2>

      <div className="input-container">
        <input
          type="text"
          value={noviSastojak}
          onChange={(e) => setNoviSastojak(e.target.value)}
          placeholder="Unesite sastojak..."
        />
        <button className= "dodaj-sastojak" onClick={handleDodajSastojak}>Dodaj</button>
      <button className="pretrazi-recepte" onClick={handlePretraziRecepte} disabled={loading}>

        {loading ? "Pretražujem..." : "Prikaži recepte"}
      </button>
      </div>

      <ul>
        {sastojci.map((sastojak, index) => (
          <li key={sastojak + index}>
            {sastojak} <button onClick={() => handleObrisiSastojak(index)}>X</button>
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}


      {recepti.length > 0 && (
        <div>
          <h3 className="pronadjeni-recepti">Pronađeni recepti:</h3>
          <ul>
            <div className="recipes-container">
            {recepti.map((recept) => (
              <div
              key={recept.idRecepta}
              className="recepti-box"
              onClick={() => navigate(`/recepti/${recept.idRecepta}`, { state: { from: location.pathname, imageUrl: recept.slika } })}
            ><img src={`http://127.0.0.1:8000/storage/${recept.slika}`} alt={recept.naziv} className="recipe-list-image" />
              <h3>{recept.naziv}</h3>
              <p><i class="fa-regular fa-clock"></i>  {recept.vremePripreme} min</p>
              <button onClick={() => handleDodajUKorpu(recept.idRecepta)}>Dodaj nedostajuće u korpu</button>
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
