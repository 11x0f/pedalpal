import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const cycles = [
    { id: 1, name: 'Cycle 1', model: 'Mountain Bike', isAvail:true, price: 10 },
    { id: 2, name: 'Cycle 2', model: 'City Bike', isAvail:false, price: 8 },
    { id: 3, name: 'Cycle 3', model: 'Road Bike', isAvail:true, price: 12 },
  ];

function SingleCycle()
{
    return(
    <Card className="text-center">
      <Card.Header> {cycles[1].name }</Card.Header>
      <Card.Body>
        <Card.Title> {cycles[1].model} </Card.Title>
        <Card.Text>
          PRICE/hr = {cycles[1].price}
        </Card.Text>
        <Button variant="primary"> RENT </Button>
      </Card.Body>
      <Card.Footer className="text-muted"> {cycles[1].isAvail} </Card.Footer>
    </Card>
  );
}

    /* return (
        <ul>
        {cycles.map((cycle) => (
          <li key={cycle.id}>
            <h3>{cycle.name}</h3>
            <p>Model: {cycle.model}</p>
            <p>Price: ${cycle.price} per hour</p>
            <button>Rent</button>
          </li>
        ))}
      </ul>
    ) */

export default SingleCycle;