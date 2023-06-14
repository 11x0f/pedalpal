import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home()
{
    let navigate = useNavigate();

    const phoneNumber = sessionStorage.getItem("phoneNumber");



    useEffect( ()=>{
        if(phoneNumber === null)
    {
        navigate("/");
        
        return ;
    }
    },[])

  /* if (!phoneNumber) {
    navigate('/');
    return null; // or you can render a loading spinner or a message instead
  } */

    return (
        <div>
            <Header/>
            <Main/>
            {/* <Footer/> */}
        </div>
        
    );
    
}

export default Home;