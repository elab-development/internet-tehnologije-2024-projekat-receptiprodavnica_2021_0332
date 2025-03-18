import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Proizvodi = ({ azurirajKorpu }) => {
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");
  const [modal, setModal] = useState(null); // Drži proizvod koji korisnik dodaje
  const [kolicina, setKolicina] = useState(1); // Početna količina
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const [ukupnoStranica, setUkupnoStranica] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  
  // Koristi useSearchParams da pročitaš query parametre
  const [searchParams] = useSearchParams();
  const kategorija = searchParams.get("kategorija");

  useEffect(() => {
    setProizvodi([]); // Resetuje proizvode pre novog učitavanja
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const url = kategorija
          ? `http://127.0.0.1:8000/api/proizvodi/pretraga?kategorija=${kategorija}&page=${trenutnaStranica}`
          : `http://127.0.0.1:8000/api/proizvodi?page=${trenutnaStranica}`;
  
        const response = await axios.get(url);
        setProizvodi(response.data?.data || []);
        setUkupnoStranica(response.data.last_page);
      } catch (error) {
        console.error("Greška:", error);
        setGreska("Neuspešno učitavanje proizvoda");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [kategorija, trenutnaStranica]);
  

  const promeniStranicu = (novaStranica) => {
    if (novaStranica >= 1 && novaStranica <= ukupnoStranica) {
      setTrenutnaStranica(novaStranica);
    }
  };

  const toggleSidebar = (menu = "") => {
    if (isSidebarOpen && currentMenu === menu) {
      setIsSidebarOpen(false); // Zatvori sidebar ako je isti meni već otvoren
      setCurrentMenu("");
    } else {
      setIsSidebarOpen(true); // Otvori sidebar i postavi trenutni meni
      setCurrentMenu(menu);
    }
  };

  const handleBackClick = () => {
    setCurrentMenu(""); // Povratak na glavni meni
    setIsSidebarOpen(false); // Zatvori sidebar
  };

  const handleCategoryClick = (kategorija) => {
    setTrenutnaStranica(1); 
    navigate(`/proizvodi/pretraga?kategorija=${kategorija}`);  // Navigacija do odgovarajuće kategorije
    setIsSidebarOpen(false);  // Zatvori sidebar nakon što se odabere kategorija
  };

  const handleOpenModal = (proizvod) => {
    setModal(proizvod);
  };
  const handleSearch = async () => {
    // if (trenutnaStranica !== 1) {
    //   setTrenutnaStranica(1); // Resetujemo paginaciju samo ako smo na drugoj stranici
    // }
  
    setLoading(true);
    setGreska("");
  
    try {
      const url = `http://127.0.0.1:8000/api/proizvodi/pretraga?naziv=${searchTerm}&page=1`;
  
      const response = await axios.get(url);
      setProizvodi(response.data?.data || []);
      setUkupnoStranica(response.data.last_page || 1);
      
      if (response.data.data.length === 0) {
        setGreska("Nema rezultata pretrage!");
      }
    } catch (error) {
      console.error("Greška:", error);
      setGreska("Došlo je do greške prilikom pretrage.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const dodajUKorpu = async () => {
    if (!localStorage.getItem("token")) {
      setGreska("Morate biti ulogovani da biste dodali proizvod u korpu!");
      return;
    }
    if (!modal) return;
  
    try {
  
      const response = await fetch(`http://localhost:8000/api/korpa/${modal.idProizvoda}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ kolicina })
      });
  
      const data = await response.json();
      if (response.ok) {
        azurirajKorpu(); // Ažuriraj korpu odmah
        setModal(null);
        setKolicina(1);
        setGreska(""); // Resetuj grešku
      } else {
        setGreska(data.message || "Greška pri dodavanju u korpu");
      }
    } catch (error) {
      console.error("Greška pri dodavanju u korpu:", error);
      setGreska("Greška pri dodavanju u korpu");
    }
  };
  
  if (loading) return <p className="loading-text">Učitavanje proizvoda...</p>;

  return (
    <section className="proizvodi-section">
      <h2 className="proizvodi-title">Proizvodi</h2>
      {greska && <p className="error-korpa">{greska}</p>}
      <div className="filter-container">
 
          {/* Polje za pretragu */}
          <input
            type="text"
            className="search-input"
            placeholder="Pretraži proizvode"
            value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
            />
          {/* Dugme za pretragu */}
          <button className = "search-button" onClick={handleSearch}>Pretraži</button>
        </div>

      <div className="proizvodi-list">
        <div className="filter-icon" onClick={() => toggleSidebar("products")}>
          <i className="fa-solid fa-filter"></i>  
          {/* Bočni meni */}
          {isSidebarOpen && (
            <div className={`sidebar open`}>
              <button className="close-btn" onClick={handleBackClick}>×</button>
              {/* Kategorije proizvoda */}
              {currentMenu === "products" && (
                <>
                  <h3>Kategorije proizvoda</h3>
                  <ul>
                    <li><button onClick={() => handleCategoryClick("voce")}>Voće</button></li>
                    <li><button onClick={() => handleCategoryClick("mlecni-proizvodi")}>Mlečni proizvodi</button></li>
                    <li><button onClick={() => handleCategoryClick("meso")}>Meso</button></li>
                    <li><button onClick={() => handleCategoryClick("povrce")}>Povrće</button></li>
                    <li><button onClick={() => handleCategoryClick("zitarice")}>Žitarice</button></li>
                    <li><button onClick={() => handleCategoryClick("testenina")}>Testenine</button></li>
                    <li><button onClick={() => handleCategoryClick("ulje-zacin")}>Ulja i začini</button></li>
                  </ul>
                </>
              )}
            </div>
          )}
        </div>

        {proizvodi && proizvodi.length > 0 ? (
    proizvodi.map(proizvod => (
      <div className="proizvodi-card" key={proizvod.idProizvoda}>
        <img
          src={`http://127.0.0.1:8000/storage/${proizvod.slika}`}
          alt={proizvod.naziv}
          className="proizvodi-image"
        />
        <h3 className="proizvodi-name">{proizvod.naziv}</h3>
        <p className="proizvodi-description">{proizvod.cena} RSD/{proizvod.mernaJedinica}</p>
        <button className="buy-button" onClick={() => handleOpenModal(proizvod)}>
          Dodaj u korpu
        </button>
      </div>
    ))
  ) : (
    <p>Nema proizvoda za prikazivanje</p>
  )}
      </div>

      {/* Dugmad za paginaciju */}
      <div className="paginacija">
        <button onClick={() => promeniStranicu(trenutnaStranica - 1)} disabled={trenutnaStranica === 1}>
          Prethodna
        </button>
        <span> Stranica {trenutnaStranica} od {ukupnoStranica}</span>
        <button onClick={() => promeniStranicu(trenutnaStranica + 1)} disabled={trenutnaStranica === ukupnoStranica}>
          Sledeća
        </button>
      </div>
 
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Dodaj {modal.naziv} u korpu</h3>
            <input 
              className="input-kolicina"
              type="number"
              min="1"
              value={kolicina}
              onChange={(e) => setKolicina(parseInt(e.target.value))}
            />
            <button className="potvrdi-button" onClick={dodajUKorpu}>Potvrdi</button>
            <button className="otkazi-button" onClick={() => setModal(null)}>Otkaži</button>
          </div>
        </div>
      )}
    </section>
  );
};
 
export default Proizvodi;