import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import RecipeDetailsPage from './components/RecipeDetailsPage';


function App() {
  return (
    <BrowserRouter className="App">
      <NavBar /> {/* Navigacioni bar */}
      <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/recepti/:id" element={<RecipeDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
