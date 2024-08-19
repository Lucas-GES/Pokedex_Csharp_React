import React from "react";
import "./styles.css";
import { Card, Row, Col, Form } from "react-bootstrap";
import dia from "../../assets/noite.png";

export default function ListRegions() {

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
    <div>
      <div className="container-body">      
      <div className="region-list">
        <Row xs={1} md={3} className="g-4 region-list-cards">
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
    </div>
  )
}
