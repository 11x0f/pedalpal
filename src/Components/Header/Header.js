import React from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom';


function onLogOut(navigate)
{
  
  sessionStorage.removeItem("phoneNumber");
  console.log(sessionStorage.getItem("phoneNumber"))
  navigate("/")
}
function Header()
{
  let navigate=useNavigate();

    return (<Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand ><strong> HAPPY CYCLING ! </strong></Navbar.Brand>
    <Nav className="me-auto">
      <Link style={{margin:"5px"}} to="/users"> <Nav > Home </Nav> </Link>
      <Link  style={{margin:"5px"}} to="/returnForm"> <Nav > Return </Nav> </Link>
      <Link style={{margin:"5px"}} to="/pricing"> <Nav> Pricing </Nav> </Link>
      <Link style={{margin:"5px"}} to="/pricing"> <Nav> Help </Nav> </Link>
      <Link style={{margin:"5px"}} to="/locate"> <Nav> Locate Bikes </Nav> </Link>
    </Nav>
    </Container>
    <button onClick={()=>onLogOut(navigate)}>Log out</button>
  </Navbar>);
    
}

export default Header ;



/* import React from 'react';

const Header = () => {
  return (
        <ul className='Navbar'>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
  );
};

export default Header;
 */