import "./styles.css";
import pokedex from "../../assets/pokedex-list.png";
import { Card } from "react-bootstrap";
import dia from "../../assets/dia.png";

export default function Pokemons() {

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
    <>
      <div className="pokedex">
        <img src={pokedex} alt="Pokedex" />
        <Card
          style={{
            width: "19.5rem",
            height: "14rem",
            cursor: "pointer",
            marginBottom: "200px",
            position: "absolute",
            marginRight: "467px",
            marginTop: "115px"
          }}
        >
          <img src={dia} alt="day" style={{ height: "100%" }} />
        </Card>
      </div>
    </>
  );
}
