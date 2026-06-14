import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("phoneNumber")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Home;