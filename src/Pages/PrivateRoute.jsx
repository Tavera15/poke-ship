import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../Features/TokenSlice";
import { Navigate } from "react-router-dom";

function PrivateRoute({children})
{
    const isAuthorized = useSelector(state => !state.token.hasError);

    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(verifyToken());
    }, []);

    return(
        <div>
            {
                isAuthorized ? children : <Navigate to="/" /> 
            }
        </div>
    );
}

export default PrivateRoute;