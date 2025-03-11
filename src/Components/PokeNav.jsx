import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../Features/TokenSlice";

function PokeNav()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    async function handleLogout(e)
    {
        e.preventDefault();
        await dispatch(userLogout());
        navigate("/");
    }

    return(
        <Navbar bg="dark" data-bs-theme="dark" className="col-12 d-flex">
            <Container>
                <Nav className="me-auto">
                    <Link className="navbar-brand" to="/Pokemon">Home</Link>
                </Nav>
                <Nav>
                        <Link className="nav-link" to="/Deck">Deck</Link>
                        <div onClick={(e) => handleLogout(e)} role="button" className="d-flex align-items-center undeline-on-hover">
                            <p className="nav-link p-0 m-0">Logout</p>
                        </div>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default PokeNav;