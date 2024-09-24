import React, { useEffect, useState } from "react";
import { Card, Button, ListGroup, Form } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from "react-router-dom";

export default function CardFlip({ values, typeCard }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const card = {
    first: "pokemon",
    second: "region",
  };

  useEffect(() => {
    console.log(values);
    getImage();
  }, []);

  const handleFlip = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  async function edit(id) {
    try {
      typeCard === card.first
        ? history(`/pokemons/new/${id}`)
        : history(`/regions/new/${id}`);
    } catch (error) {
      alert("Can't edit the selected pokemon" + error);
    }
  }

  const getImage = async () => {
    let search = "";
    search =
      typeCard === card.first
        ? `http://localhost:5018/api/pokemon/${values.imageName}`
        : `http://localhost:5018/api/region/${values.image}`;
    fetch(search)
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        let url = URL.createObjectURL(data);
        setImage(url);
      });
  };

  return (() => {
    if (typeCard === card.first) {
      return (
        <>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card
              style={{
                width: "35rem",
                height: "38rem",
                cursor: "pointer",
                marginBottom: "200px",
              }}
              onClick={handleFlip}
            >
              <img src={image} alt="day" style={{ height: "100%" }} />
            </Card>
            <Card
              style={{
                width: "35rem",
                height: "38rem",
                cursor: "pointer",
                marginBottom: "200px",
                justifyContent: "space-around",
              }}
              onClick={handleFlip}
            >
              <h1>{values.name}</h1>
              <ListGroup
                className="list-group-flush"
                style={{
                  width: "80%",
                  marginLeft: "50px",
                  justifyContent: "space-around",
                  height: "60%",
                }}
              >
                <ListGroup.Item
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  Height: {values.height} m
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  Weight: {values.weight} kg
                </ListGroup.Item>
                <ListGroup.Item style={{ fontWeight: "bold" }}>
                  Type: {values.type}
                </ListGroup.Item>
                <ListGroup.Item style={{ fontWeight: "bold" }}>
                  Moves: {values.moves}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  Region: {values.regionId}
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="secondary"
                size="lg"
                type="button"
                style={{ width: "80%", marginLeft: "50px" }}
                onClick={() => edit(values.id)}
              >
                Edit {values.name}
              </Button>
            </Card>
          </ReactCardFlip>
        </>
      );
    } else {
      return (
        <>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card
              style={{
                width: "35rem",
                height: "38rem",
                cursor: "pointer",
                marginBottom: "200px",
              }}
              onClick={handleFlip}
            >
              <img src={image} alt="day" style={{ height: "100%" }} />
              <h1 style={{ fontWeight: "bold" }}>{values.name}</h1>
            </Card>
            <Card
              style={{
                width: "35rem",
                height: "38rem",
                cursor: "pointer",
                marginBottom: "200px",
              }}
              onClick={handleFlip}
            >
              <h1 style={{ fontWeight: "bold" }}>Description</h1>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={values.description}
                style={{
                  height: "75%",
                  width: "90%",
                  alignSelf: "center",
                  border: "none",
                  overflowY: "scroll",
                  resize: "none",
                  scrollbarWidth: "none",
                  marginBottom: "20px"
                }}
                disabled
              />
              <Button
                variant="secondary"
                size="lg"
                type="button"
                style={{ width: "80%", marginLeft: "50px" }}
                onClick={() => edit(values.id)}
              >
                Edit {values.name}
              </Button>
            </Card>
          </ReactCardFlip>
        </>
      );
    }
  })();
}
