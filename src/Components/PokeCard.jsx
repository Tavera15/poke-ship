import React from "react";
import { Card } from "react-bootstrap";
import "./PokeCard.css";

function PokeCard({pokemon, handleSelect, isSelected})
{
    function onCardClick()
    {
        handleSelect(pokemon.id);
    }

    return(
        <div className="col-6 p-2 col-sm-3" onClick={() => onCardClick(pokemon.id)} role="button">
            <Card className={`p-2 m-0 p-0 poke-card ${isSelected ? "poke-card-selected" : ""}`} >
                <Card.Img className="" variant="top" src={pokemon.images.large} />
            </Card>
        </div>
    );
}

export default PokeCard;