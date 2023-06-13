import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from '../Header/Header';
import { useEffect } from 'react';

const cycles = [
  { id: 1, name: "amith", model: "Mountain Bike", price: 10, isBooked: false, position: "Front Gate" },
  { id: 2, name: "unni", model: "City Bike", price: 8, isBooked: false, position:"CCF" },
  { id: 3, name: "farzeen", model: "Road Bike", price: 12, isBooked: false, position:"Computer Lab" },
];

function CycleList() {
  const navigate = useNavigate();
  const [cyclesData, setCyclesData] = useState(cycles);

  const handleRentClick = (id) => {
    const updatedCycles = cyclesData.map((cycle) => {
      if (cycle.id === id) {
        return { ...cycle, isBooked: true };
      }
      return cycle;
    });
    setCyclesData(updatedCycles);

    /* navigate('/userdetails/:id'); */

    navigate(`/userdetails/${id}`);
  };


  const phonenum = sessionStorage.getItem("phoneNumber");


  useEffect( ()=>{
      if(phonenum === null)
  {
      navigate("/");
      
      return ;
  }
  },[])

  return (
    <div>
      <Header/>  
      {cyclesData.map((cycle) => (
        <Card className="text-center" key={cycle.id}>
          <Card.Header>{cycle.name}</Card.Header>
          <Card.Body>
            <Card.Title>{cycle.model}</Card.Title>
            <Card.Text>PRICE/hr = {cycle.price}</Card.Text>
            <button onClick={() => handleRentClick(cycle.id)}>RENT</button>
          </Card.Body>
          <Card.Footer className="text-muted">{cycle.isAvail}</Card.Footer>
        </Card>
      ))}
    </div>
  );
}

export default CycleList;






/* import React from "react";
import SingleCycle from "../SingleCycle/SingleCycle";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Header from "../Header/Header";
const cycles = [
    { id: 1, name: 'amith', model: 'Mountain Bike', price: 10 },
    { id: 2, name: 'unni', model: 'City Bike', price: 8 },
    { id: 3, name: 'farzeen', model: 'Road Bike', price: 12 },
  ];


  function foo()
{
    return(
      <div>
        <Header/>
        {cycles.map((cycle)=>(
            <Card className="text-center">
            <Card.Header> {cycle.name }</Card.Header>
            <Card.Body>
              <Card.Title> {cycle.model} </Card.Title>
              <Card.Text>
                PRICE/hr = {cycle.price}
              </Card.Text>  
              <Button variant="primary"> RENT </Button>
            </Card.Body>
            <Card.Footer className="text-muted"> {cycles.isAvail} </Card.Footer>
          </Card>
        ))}
        
      </div>
    
  );
}


  function CycleList()
  {
      return foo();
  }

  export default CycleList; */