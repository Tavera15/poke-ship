import { useEffect, useState } from 'react'
import axios from 'axios';
import PokeCard from "../../Components/PokeCard";

function PokemonPage()
{
    const [deck, setDeck] = useState([]);
    const [isDeckLoaded, setCardLoaded] = useState(false);

    useEffect(() => {
        if(!isDeckLoaded)
        {
          axios.get("http://localhost:4000/api/pokemon")
          .then((res) => setDeck(res.data.data))
          .finally(() => setCardLoaded(true));
        }
      }, [])

    return(
        <div className='d-flex justify-content-center'>
            {
                !isDeckLoaded
                ? <h1>Loading...</h1>
                : <div className="d-flex row col-12 col-sm-8">
                    {
                        deck.map((p, i) => {
                            return <PokeCard pokemon={p} id={p.id} />
                        })
                    }
                    </div>
            }
        </div>
    );
}

export default PokemonPage;