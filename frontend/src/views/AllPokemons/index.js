import React, { useEffect, useState } from "react";
import "./style.css";
import { Row, Form, Col } from "react-bootstrap";
import CardFlip from "../../components/Card";
import api from "../../services/api";

export default function AllPokemons() {
  const [updateData, setUpdateData] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (updateData) {
      getPokemons();
      setUpdateData(false);
    }
  }, [updateData, pokemons]);

  const getPokemons = async () => {
    api.get("api/pokemon").then((response) => {
      setPokemons(response.data);
    });    
  };

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
          <Col>
            {pokemons.map((pokemon) => (              
              <CardFlip key={pokemon.id} values={pokemon} typeCard={"pokemon"}/>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
