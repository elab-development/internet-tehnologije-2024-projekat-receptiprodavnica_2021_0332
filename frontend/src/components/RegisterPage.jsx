import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Za preusmeravanje na HomePage pri registraciji

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        korisnickoIme: "",
        lozinka: "",
        potvrdaLozinke: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleInput(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    function handleRegister(e) {
        e.preventDefault();

        if (userData.lozinka !== userData.potvrdaLozinke) {
            setError("Lozinke se ne podudaraju.");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/register", {
            korisnickoIme: userData.korisnickoIme,
            lozinka: userData.lozinka,
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.access_token);
            localStorage.removeItem('korpa');
            navigate("/");
            window.location.reload(); // Osvežavamo stranicu nakon prijave
        })
        .catch((e) => {
            console.log(e);
        });
    }

    return (
        <div className="register-container">
            <h1 className="register-title">Registracija</h1>
            <p className="register-subtitle">Kreirajte nalog da biste pristupili personalizovanim receptima i namirnicama</p>
            <form onSubmit={handleRegister}>
                <div className="register-form">
                    <input 
                        type="text" 
                        placeholder="Korisničko ime" 
                        className="register-input"
                        name="korisnickoIme"
                        onInput={handleInput}
                    />
                    <input 
                        type="password" 
                        placeholder="Lozinka" 
                        className="register-input"
                        name="lozinka"
                        onInput={handleInput}
                    />
                    <input 
                        type="password" 
                        placeholder="Potvrdi lozinku" 
                        className="register-input"
                        name="potvrdaLozinke"
                        onInput={handleInput}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="register-button">Registrujte se</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
