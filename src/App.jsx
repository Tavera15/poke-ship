import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from "./Pages/PrivateRoute";
import PokemonPage from './Pages/PokemonPage/PokemonPage';
import HomePage from "./Pages/HomePage/HomePage";
import './App.css'
import DeckPage from "./Pages/DeckPage/DeckPage";
import PokeNav from "./Components/PokeNav";

function App() {

  return (
    <div className=''>
      <Router>
        <PokeNav />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
            <Route exact path="/Pokemon" 
              element={
                <PrivateRoute>
                  <PokemonPage />
                </PrivateRoute>
              } 
              />
            
            <Route exact path="/Deck" 
              element={
                <PrivateRoute>
                  <DeckPage />
                </PrivateRoute>
              } 
              />
        </Routes>
      </Router>
    </div>
  )
}

export default App
