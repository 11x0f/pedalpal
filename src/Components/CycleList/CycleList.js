import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CycleList.css';

function CycleList() {
  const navigate = useNavigate();
  const [cyclesData, setCyclesData] = useState([]);
  const { id } = useParams();

  /* console.log("selected option: ", id); */

  const handleRentClick = (id) => {
    navigate(`/userdetails/${id}`);
  };

  const phonenum = sessionStorage.getItem("phoneNumber");

  useEffect(() => {
    if (phonenum === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const storedCycles = localStorage.getItem('cycles');
    if (storedCycles) {
      setCyclesData(JSON.parse(storedCycles));
    }
  }, []);

  /* console.log(cyclesData); */

  return (
    <div>
      <Header />
      {cyclesData.map((cycle) => {
        if (
          cycle.position.toLowerCase() === id.toLowerCase() &&
          !cycle.isBooked
        ) {
          return (
            <Card className="text-center" key={cycle.id}>
              <Card.Header>{cycle.id}</Card.Header>
              <Card.Body>
                <Card.Title>{cycle.model}</Card.Title>
                <Card.Text>PRICE/hr = {cycle.price}</Card.Text>
                <button onClick={() => handleRentClick(cycle.id)}>RENT</button>
              </Card.Body>
              <Card.Footer className={`text-muted ${cycle.isBooked ? 'text-red' : 'text-green'}`}>
                {cycle.isBooked ? "Booked" : "Available"}
              </Card.Footer>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );
}

export default CycleList;
