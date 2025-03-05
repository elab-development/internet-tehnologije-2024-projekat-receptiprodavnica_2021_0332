import React, { useState } from 'react';

const Checkout = ({resetKorpa}) => {
  const [formData, setFormData] = useState({
    imeKupca: '',
    prezimeKupca: '',
    email: '',
    adresaIsporuke: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prvo proverite da li su podaci u formi
    console.log(formData); // Ako se podaci ne šalju pravilno, videće se u konzoli
  
    // Provera da li API poziv uspešno šalje podatke
    fetch('http://localhost:8000/api/kupovina/potvrdi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`, // Ako je potrebno, dodati token
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
            setMessage(data.message); 

            setFormData({
                imeKupca: '',
                prezimeKupca: '',
                email: '',
                adresaIsporuke: '',
              });

              // Očistite podatke o korpi u localStorage nakon uspešne kupovine
            localStorage.removeItem('korpa');
            resetKorpa();

       
          } else {
            setMessage('Kupovina uspešna!');
            resetKorpa();
             // Ako server ne vrati poruku, postavite fiksnu
          }
      })
      .catch((error) => {
        console.error("Greška:", error);
        alert("Greška prilikom potvrde kupovine.");
      });
  };

  return (
    <div id="checkout" className="checkout">
      <h2>Podaci za narudžbinu</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="imeKupca">Ime: </label>
          <input
            type="text"
            id="imeKupca"
            name="imeKupca"
            value={formData.imeKupca}
            onChange={handleChange}
            required/>
        </div>
        <div class="form-group">
          <label htmlFor="prezimeKupca">Prezime: </label>
          <input
            type="text"
            id="prezimeKupca"
            name="prezimeKupca"
            value={formData.prezimeKupca}
            onChange={handleChange}
            required />
        </div>
        <div class="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required />
        </div>
        <div class="form-group">
          <label htmlFor="adresaIsporuke">Adresa: </label>
          <input
            type="text"
            id="adresaIsporuke"
            name="adresaIsporuke"
            value={formData.adresaIsporuke}
            onChange={handleChange}
            required/>
        </div>
        <button type="submit">Potvrdi narudžbinu</button>
      </form>

      {message && <p class= "potvrda-kupovine">{message}</p>}
    </div>
  );
};

export default Checkout;