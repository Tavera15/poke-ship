import { useEffect, useState } from 'react'
import axios from 'axios';
import PokeCard from "../../Components/PokeCard";
import CheckoutModal from '../../Forms/CheckoutModal';
import { useSelector } from 'react-redux';

function PokemonPage()
{
    const [deck, setDeck] = useState([]);
    const [isDeckLoaded, setCardLoaded] = useState(false);
    const [hand, setHand] = useState([]);
    const token = useSelector(state => state.token.value);

    useEffect(() => {
        if(!isDeckLoaded)
        {
          axios.get(import.meta.env.VITE_SERVER_API + "/pokemon")
          .then((res) => setDeck(res.data.data))
          .finally(() => setCardLoaded(true));
        }
    }, [])

    function handleCheckout(data)
    {
        data.cart = hand;

        axios.post(import.meta.env.VITE_SERVER_API + "/Order/PlaceOrder", data, {headers: {Authorization: token}})
        .catch((err) => console.log(err))
        .finally(() => setHand([]))
    }

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
                ? <h1 className='text-warning'>Loading...</h1>
                : <div className="d-flex row col-12 col-md-8">
                    <h1 className='text-warning'>Pokemon</h1>
                    <div className='d-flex row'>
                    {
                        deck.map((p) => {
                            return <PokeCard pokemon={p} key={p.id} isSelected={hand.includes(p.id)} handleSelect={(cardId) => handleSelect(cardId)} />
                        })
                    }
                    </div>
                  </div>
            }
            {
                hand.length < 1 
                ? ""
                : <CheckoutModal handleCheckout={(data) => handleCheckout(data)} />
            }
        </div>
    );
}

export default PokemonPage;