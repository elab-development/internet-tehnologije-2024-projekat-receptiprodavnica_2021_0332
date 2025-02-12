import{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //za preusmeravanje na HomePage pri registraciji


const RegisterPage = () => {
    const [userData, setUserData] = useState({korisnickoIme:"", lozinka:""});
    const navigate = useNavigate();

    function handleInput (e){
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        setUserData(newUserData);
    }

    function handleRegister(e){ 
      e.preventDefault();
        axios.post(
          "http://127.0.0.1:8000/api/register", userData).then((res)=>{console.log(res.data);
            navigate("/");
          })
          .catch((e)=>{console.log(e);
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
                <button type="submit" className="register-button"> Registrujte se</button>
            </div>
        </form>
    </div>
    );
}
export default RegisterPage