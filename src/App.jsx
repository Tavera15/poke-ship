import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from "./Pages/PrivateRoute";
import PokemonPage from './Pages/PokemonPage/PokemonPage';
import HomePage from "./Pages/HomePage/HomePage";
import './App.css'

function App() {

  return (
    <div className=''>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />

          <Route exact path="/Pokemon" 
            element={
              <PrivateRoute>
                <PokemonPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
