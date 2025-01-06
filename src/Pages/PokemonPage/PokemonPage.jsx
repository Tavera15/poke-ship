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
        <div className='mt-4 d-flex flex-column align-items-center'>
            <h1 className='text-warning'>Pokemon</h1>
            {
                !isDeckLoaded
                ? <h1>Loading...</h1>
                : <div className="d-flex row col-12 col-md-8">
                    {
                        deck.map((p, i) => {
                            return <PokeCard pokemon={p} id={p.id} key={p.id} />
                        })
                    }
                  </div>
            }
        </div>
    );
}

export default PokemonPage;