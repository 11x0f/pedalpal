import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Location from './Components/Location/Location'
import SingleCycle from './Components/SingleCycle/SingleCycle';
import Login from './Components/Login/Login';
import CycleList from './Components/CycleList/CycleList';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Home from './Components/Home/Home';
import Payment from './Components/Payment/Payment';
import UserForm from './Components/UserForm/UserForm';

function App() {
  return (
    <div>
      {/* <Login/>
      <Header/>
      <Main/>
      <Footer/>
    <Location/>
    <SingleCycle/>  */}
    {/* <CycleList/> */}
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/map" element={<Location/>} />
        <Route path="/cyclelist" element={<CycleList/>} />
        <Route path="/userdetails/:id" element={<UserForm/>} />
        <Route path='/payment/:id/:name/:phoneNumber/:hours/:minutes/:paymentMethod' element={<Payment/>} />
       
    </Routes>


    
    </div>

    
  );
}

export default App;
