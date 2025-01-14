import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

function PokeNav()
{
    return(
        <Navbar bg="dark" data-bs-theme="dark" className="col-12 d-flex">
            <Container>
                <Nav className="me-auto">
                    <Link className="navbar-brand" to="/Pokemon">Home</Link>
                </Nav>
                <Nav className="">
                    <Link className="nav-link" to="/Deck">Deck</Link>
                    <Link className="nav-link" to="/Deck">Logout</Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default PokeNav;