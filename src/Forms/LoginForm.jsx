import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { userLogin } from "../Features/TokenSlice";
import { useNavigate } from "react-router-dom";

function LoginForm({setShowLogin})
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onLogin(e)
    {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }
        
        await dispatch(userLogin(data));
        
        navigate("/Pokemon");
    }

    return(
        <div className="col-md-12 p-4 border bg-dark text-warning" style={{"backgroundColor": "rgba(10, 40, 124, 0.84)"}}>
            <h1>Login</h1>
            <hr/>
            <Form onSubmit={(e) => onLogin(e)}>
                <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="login-email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="login-password" />
                </div>
                <Button type="submit" variant="outline-light">Login</Button>
            </Form>

            <p role="button" className="mt-4 pointer" onClick={(e) => setShowLogin(false)}>Create New Account</p>
        </div>
    );
}

export default LoginForm;