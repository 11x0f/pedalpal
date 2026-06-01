import React from "react";
import {Navbar,Container,Nav} from "react-bootstrap";
import {Link,useNavigate} from "react-router-dom";
import "./Header.css";

function Header(){

const navigate = useNavigate();

const logout = () => {
sessionStorage.removeItem("phoneNumber");
navigate("/");
};

return(

<Navbar expand="lg" className="pedal-navbar">

<Container>

<Navbar.Brand className="brand">
🚲 PEDALPAL
</Navbar.Brand>

<Navbar.Toggle />

<Navbar.Collapse>

<Nav className="mx-auto nav-links">

<Link to="/users">Home</Link>
<Link to="/returnForm">Return</Link>
<Link to="/pricing">Pricing</Link>
<Link to="/locate">Locate Bikes</Link>

</Nav>

<button
className="logout-btn"
onClick={logout}
>
Logout
</button>

</Navbar.Collapse>

</Container>

</Navbar>
);
}

export default Header;