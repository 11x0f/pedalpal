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
import Hub from './Components/HubList/Hub';
import Checkout from './Components/Checkout/Checkout';
import ReturnForm from './Components/ReturnForm/ReturnForm'
import Return from './Components/Return/Return';

function initialize()
{
  const cycles = [
    { id: 1, model: "Mountain Bike", price: 10, isBooked: false, position: "Railway", watingTime:0, unqId:"abc123" },
    { id: 2, model: "City Bike", price: 8, isBooked: false, position:"Airport", watitingTime:0, unqId:"def456" },
    { id: 3, model: "Road Bike", price: 12, isBooked: false, position:"LuLu Mall", waitingTime:0, unqId:"ghi789"},
    { id: 4, model: "Mountain Bike", price: 10, isBooked: false, position: "Railway", watingTime:0,unqId:"jkl012"},
    { id: 5, model: "City Bike", price: 8, isBooked: false, position:"Airport", watitingTime:0, unqId:"mno345"},
    { id: 6, model: "Road Bike", price: 12, isBooked: false, position:"Lulu Mall", waitingTime:0, unqId:"pqr678"},
    { id: 7, model: "Mountain Bike", price: 10, isBooked: false, position: "Railway", watingTime:0, unqId:"stu901" },
    { id: 8, model: "City Bike", price: 8, isBooked: false, position:"Airport", watitingTime:0, unqId:"vwx234" },
    { id: 9, model: "Road Bike", price: 12, isBooked: false, position:"Lulu Mall", waitingTime:0, unqId:"yza567" },
    { id: 10, model: "Mountain Bike", price: 10, isBooked: false, position: "Railway", watingTime:0, unqId:"bcd890"},
    { id: 11, model: "City Bike", price: 8, isBooked: false, position:"Airport", watitingTime:0, unqId:"efg123"},
    { id: 12, model: "Road Bike", price: 12, isBooked: false, position:"Lulu Mall", waitingTime:0, unqId:"hij456"},
    { id: 13,model: "Mountain Bike", price: 10, isBooked: false, position: "Railway", watingTime:0, unqId:"klm789"},
    { id: 14, model: "City Bike", price: 8, isBooked: false, position:"Airport", watitingTime:0, unqId:"nop012"},
    { id: 15, model: "Road Bike", price: 12, isBooked: false, position:"Lulu Mall", waitingTime:0, unqId:"qrs345"},
  ];
  
  localStorage.setItem('cycles', JSON.stringify(cycles));
}

function App() {

  initialize();
  return (
    <div>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/map" element={<Location/>} />
        <Route path="/hub" element={<Hub/>} />
        <Route path="/cyclelist/:id" element={<CycleList/>} />
        <Route path="/userdetails/:id" element={<UserForm/>} />
        <Route path='/payment/:Bid/:name/:paramPhone/:hours/:minutes/:paymentMethod' element={<Payment/>} />
        <Route path="/checkout/:Bid/:paramPhone" element={<Checkout/>} />
        <Route path="/returnForm" element={<ReturnForm/>} />
        <Route path="/return/:phoneNumber/:uniqueId/:rlocation" element={<Return/>} />

    </Routes>
    
    </div>

    
  );
}

export default App;
