import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeckCard from "../Components/DeckCard";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function InvoicePage()
{
    const token = useSelector(state => state.token.value);
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(isLoading && token)
        {
            axios.get(import.meta.env.VITE_SERVER_API + "/Order/GetOrder/" + id, {headers: {Authorization: token}})
                .then((res) => setOrder(res.data))
                .finally(() => setIsLoading(false));
        }
    },[isLoading, token])

    return(
        <div className='mt-4 d-flex flex-column align-items-center text-light'>
            <h1 className="display-1">Order Confirm</h1>
            {
                isLoading
                ?   <h1 className="display-1 text-warning">Loading...</h1>
                :   <>
                        <a className="btn btn-light" href={order.invoice} target="_blank">Open Invoice</a>
                        <hr />
                        <div className="d-flex row col-12 col-md-8">
                            {
                                order.cart.map((c) => <DeckCard key={c} id={c}/>)
                            }
                        </div>
                    </>
            }
        </div>
    )
}

export default InvoicePage;