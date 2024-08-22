import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
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
    getImage();
  }, [])

  const handleFlip = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  async function editPokemon(id) {
    try {
      history(`/pokemons/new/${id}`);
    } catch (error) {
      alert("Can't edit the selected pokemon" + error);
    }
  }

  const getImage = async () => {
    let search = '';
    search = typeCard === card.first ? `http://localhost:5018/api/pokemon/${values.imageName}` : `http://localhost:5018/api/region/${values.image}`;
    fetch(search)
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        let url = URL.createObjectURL(data);
        setImage(url);
      });
  }

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
              <img
                src={image}
                alt="day"
                style={{ height: "100%" }}
              />
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
              <h1>{values.id}</h1>
              <p>{values.name}</p>
              <p>{values.type}</p>
              <p>{values.moves}</p>
              <p>{values.regionId}</p>
              <Button
                variant="secondary"
                size="lg"
                type="button"
                onClick={() => editPokemon(values.id)}
              >
                Block level button
              </Button>
            </Card>
          </ReactCardFlip>        
        </>
      );
    } else {
      return (
        <>
          <Card
            style={{
              width: "35rem",
              height: "38rem",
              cursor: "pointer",
              marginBottom: "200px",
            }}
          >
            <img src={image} alt="day" style={{ height: "100%" }} />
            <h1>{values.name}</h1>
          </Card>
          ;
        </>
      );
    }
  }
  )();
}
