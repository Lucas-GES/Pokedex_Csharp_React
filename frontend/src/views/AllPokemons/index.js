import React, { useState } from "react";
import "./style.css";
import { Card, Row, Col, Form } from "react-bootstrap";
import dia from "../../assets/dia.png";

export default function AllPokemons() {
  const [pokeData, setPokeData] = useState();

  const pokemons = [
    {
      id: 1,
      img: dia,
      name: "teste",
      type: "teste",
    },
    {
      id: 2,
      img: dia,
      name: "teste",
      type: "teste",
    },
    {
      id: 3,
      img: dia,
      name: "teste",
      type: "teste",
    },
    {
      id: 4,
      img: dia,
      name: "teste",
      type: "teste",
    },
    {
      id: 5,
      img: dia,
      name: "teste",
      type: "teste",
    },
    {
      id: 6,
      img: dia,
      name: "teste",
      type: "teste",
    },
  ];

  return (
    <div className="container-body">
      <Form.Control
        type="text"
        placeholder="Search Pokemon..."
        style={{
          position: "absolute",
          margin: "100px 0 0 25%",
          width: "50%",
          zIndex: "99",
        }}
      />
      <div className="pokemon-list">
        <Row xs={1} md={3} className="g-4 list-cards">
          {pokemons.map((pokemon) => (
            <Col key={pokemon.id}>
              <Card
                style={{
                  width: "35rem",
                  height: "38rem",
                  cursor: "pointer",
                  marginBottom: "200px",
                }}
              >
                <img src={pokemon.img} alt="day" style={{ height: "100%" }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
