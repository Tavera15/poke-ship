import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeckCard from "../../Components/DeckCard";

function DeckPage()
{
    const token = useSelector(state => state.token.value);
    const [deck, setDeck] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!isLoaded && token)
        {
            axios.get(import.meta.env.VITE_SERVER_API + "/Order/GetDeck", {headers: {Authorization: token}})
            .then((res) => setDeck(res.data))
            .finally(() => setIsLoaded(true))
        }
    }, [isLoaded, token])

    return(
        <div className='mt-4 d-flex flex-column align-items-center'>
            {
                !isLoaded
                ? <h1 className='text-warning'>Loading...</h1>
                : <div className="d-flex row col-12 col-md-8">
                    <h1 className='text-warning'>Pokemon Deck</h1>
                    <div className="d-flex row">
                    {
                        deck.map((p, i) => {
                            return <DeckCard id={p} key={i} />
                        })
                    }
                    </div>
                  </div>
            }
        </div>
    );
}

export default DeckPage;