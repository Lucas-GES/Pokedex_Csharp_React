import "./styles.css";
import pokedex from "../../assets/pokedex-list.png";
import { Card } from "react-bootstrap";
import dia from "../../assets/dia.png";
import noite from "../../assets/noite.png";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Pokemons() {

  const [updateData, setUpdateData] = useState(true);

  const [pokemon, setPokemon] = useState({});

  const [pokemonSprite, setPokemonSprite] = useState('');

  const [countPokes, setCountPokes] = useState(0);

  const [pokeId, setPokeId] = useState(1);

  useEffect(() => {
    if (updateData) {
      getPokemonCount();
      getPokemon();
      setUpdateData(false);
    }
  }, [updateData, pokemon]);

  const getPokemonCount = async () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      setCountPokes(response.data.count);
    });
  };

  const getPokemon = async () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeId).then((response) => {
      setPokemon(response.data);
      setPokemonSprite(response.data.sprites.front_default);
    })
  }

  const decrement = () => {
    setPokeId(value => pokeId - 1);
    setUpdateData(true);
    getPokemon();
  }

  const increment = () => {
    setPokeId(value => pokeId + 1);
    setUpdateData(true);
    getPokemon();
  }

  return (
    <>
      <div className="pokedex">
        <img style={{ width: "70%", height: "80%" }} src={pokedex} alt="Pokedex" />
        <Card>
          <Carousel controls={false} indicators={false}>
            <Carousel.Item>
              <img src={pokemonSprite} alt="day" />
            </Carousel.Item>
          </Carousel>
        </Card>
        <div className="pokedex-buttons">
          <button style={{ marginRight: "7vh" }} onClick={() => decrement(-1)}>&#8672;</button>
          <button style={{ marginRight: "0.5vh" }} onClick={() => increment(1)}>&#8674;</button>
        </div>
      </div>
    </>
  );
}
