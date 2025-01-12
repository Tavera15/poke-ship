import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./PokeCard.css";

function PokeCard({pokemon, handleSelect})
{
    const [isSelected, setSelected] = useState(false);

    function onCardClick()
    {
        setSelected(!isSelected);
        handleSelect(pokemon.id);
    }

    return(
        <div className="col-6 p-2 col-sm-3" onClick={(e) => onCardClick(pokemon.id)} role="button">
            <Card className={`p-2 m-0 p-0 poke-card ${isSelected ? "poke-card-selected" : ""}`} >
                <Card.Img className="" variant="top" src={pokemon.images.large} />
            </Card>
        </div>
    );
}

export default PokeCard;