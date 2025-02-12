import React from 'react'
import axios from 'axios';
import{useState} from "react";
import {useNavigate} from 'react-router-dom'; //za preusmeravanje na HomePage pri loginovanju

const LoginPage = () => {
    const [userData, setUserData] = useState({korisnickoIme:"", lozinka:""});
    const navigate = useNavigate();

    function handleInput (e){
        //console.log(e);
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        //console.log(newUserData);
        setUserData(newUserData);
    }

    function handleLogin(e){ 
      e.preventDefault();
        axios.post(
          "http://127.0.0.1:8000/api/login", userData)
          .then((res)=>{
           console.log(res.data);
           localStorage.setItem('token', res.data.access_token);
           navigate("/");
          })
          .catch((e)=>{console.log(e);
          });
    }

  return (
    <div className="login-container">
    <h1 className="login-title">Dobrodošli u našu prodavnicu</h1>
    <p className="login-subtitle">Prijavite se kako biste istražili recepte i namirnice!</p>

    <form onSubmit = {handleLogin}>
    <div  className="login-form">
      <input 
        type="text" 
        placeholder="Korisničko ime" 
        className="login-input"
        name="korisnickoIme"
        onInput = {handleInput}
        />
      <input 
        type="password" 
        placeholder="Lozinka" 
        className="login-input"
        name="lozinka"
        onInput = {handleInput}
        />
      <button type="submit" className="login-button">Prijavi se</button>
        </div>
    </form>
    <p className="register-prompt">Nemate nalog? <a href="/register" className="register-link">Registrujte se</a></p>
  </div>
  )
}
export default LoginPage