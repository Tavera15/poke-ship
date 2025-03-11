import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./PokeCard.css";

function DeckCard({id})
{
    const [pokemon, setPokemon] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if(!isLoaded)
        {
            axios.get(`https://api.pokemontcg.io/v2/cards/${id}`)
            .then((res) => setPokemon(res.data.data))
            .finally(() => setIsLoaded(true));
        }
    }, [isLoaded])

    return(
        <div className="col-6 p-2 col-sm-3" role="button">
            {
                !isLoaded
                    ? ""
                    : <Card className={`p-2 m-0 p-0 poke-card`} >
                        <Card.Img className="" variant="top" src={pokemon.images.large} />
                      </Card>
            }
        </div>
    );
}

export default DeckCard;