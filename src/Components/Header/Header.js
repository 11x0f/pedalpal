import React from "react";

import {
    Navbar,
    Container,
    Nav,
} from "react-bootstrap";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import "./Header.css";

function Header() {

    const navigate =
        useNavigate();

    const navLinks = [
        {
            label: "Home",
            path: "/home",
        },
        {
            label: "Locate Bikes",
            path: "/map",
        },
        {
            label: "Return",
            path: "/returnForm",
        },
    ];

    const handleLogout = () => {

        sessionStorage.removeItem(
            "phoneNumber"
        );

        navigate("/");
    };

    return (

        <Navbar
            expand="lg"
            className="pedal-navbar"
        >

            <Container fluid>

                <Navbar.Brand
                    className="brand"
                >
                    🚲 PEDALPAL
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="main-nav"
                />

                <Navbar.Collapse
                    id="main-nav"
                >

                    <Nav className="nav-links">

                        {navLinks.map(
                            (link) => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>

                            )
                        )}

                    </Nav>

                    <button
                        className="logout-btn"
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );
}

export default Header;