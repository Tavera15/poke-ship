import { useEffect, useState } from 'react'
import axios from 'axios';
import PokeCard from "../../Components/PokeCard";
import CheckoutModal from '../../Forms/CheckoutModal';

function PokemonPage()
{
    const [deck, setDeck] = useState([]);
    const [isDeckLoaded, setCardLoaded] = useState(false);
    const [hand, setHand] = useState([]);

    useEffect(() => {
        if(!isDeckLoaded)
        {
          axios.get("http://localhost:4000/api/pokemon")
          .then((res) => setDeck(res.data.data))
          .finally(() => setCardLoaded(true));
        }
      }, [])

    function handleSelect(cardId)
    {
        if(!hand.includes(cardId))
        {
            setHand((prev) => [...prev, cardId]);
        }
        else
        {
            const res = hand.filter((c) => c !== cardId);
            setHand(res);
        }
    }

    return(
        <div className='mt-4 d-flex flex-column align-items-center'>
            {
                !isDeckLoaded
                ? <h1>Loading...</h1>
                : <div className="d-flex row col-12 col-md-8">
                    <h1 className='text-warning'>Pokemon</h1>
                    {
                        deck.map((p) => {
                            return <PokeCard pokemon={p} id={p.id} key={p.id} handleSelect={(cardId) => handleSelect(cardId)} />
                        })
                    }
                  </div>
            }
            {
                hand.length < 1 
                ? ""
                : <CheckoutModal />
            }
        </div>
    );
}

export default PokemonPage;