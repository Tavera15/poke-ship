import React from "react";
import { Card, Button } from "react-bootstrap";

function PokeCard({pokemon})
{
    return(
        <div className="col-6 p-0 col-sm-3">
            <Card className="p-2 m-0" style={{"border": "none", "backgroundColor": "transparent"}}>
                <Card.Img variant="top" className="" src={pokemon.images.large} />
            </Card>
        </div>
    );
}

export default PokeCard;