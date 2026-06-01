import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function Home() {

    const navigate = useNavigate();

    const phoneNumber =
        sessionStorage.getItem("phoneNumber");

    useEffect(() => {

        if (!phoneNumber) {
            navigate("/");
        }

    }, [navigate, phoneNumber]);

    return (
        <div className="home-page">

            <Header />

            <Main />
            <Footer/>

        </div>
    );
}

export default Home;