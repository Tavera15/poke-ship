import React, {useState} from "react";
import LoginForm from "../../Forms/LoginForm";
import SignUpForm from "../../Forms/SignUpForm";

import "./HomePage.css";

function HomePage()
{
    const [showLogin, setShowLogin] = useState(false);

    return(
        <div className='col-12 p-4'>
            <img className="col-12 col-md-6 mt-2 mb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/2560px-International_Pokémon_logo.svg.png" alt="pokemon-logo"/>
        
            <div className="col-12 col-md-4 justify-content-center align-items-center d-flwex m-auto">
                <div className="">
                    {
                        showLogin ? <LoginForm setShowLogin={setShowLogin}/> : <SignUpForm setShowLogin={setShowLogin} />
                    }
                </div>
            </div>    
        </div>
    );
}

export default HomePage;