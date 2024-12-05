import "./styles.css";
import pokedex from "../../assets/pokedex-list.png";
import { Card, Button } from "react-bootstrap";
import dia from "../../assets/dia.png";
import noite from "../../assets/noite.png";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import api from "../../services/api";
import axios from "axios";

export default function Pokemons() {

  const [updateData, setUpdateData] = useState(true);

  const [pokemon, setPokemon] = useState({});

  const [countPokes, setCountPokes] = useState(0);

  const [pokeId, setPokeId] = useState(1);

  useEffect(() => {
    if (updateData) {
      getPokemonCount();
      getPokemon();
      setUpdateData(false);
    }
  }, [pokemon, updateData]);

  const getPokemonCount = async () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
      setCountPokes(response.data.count);
    });
  };

  const getPokemon = async () => {
    api.get("api/pokemon/pokeApi/" + pokeId).then((response) => {
      setPokemon(response.data);  
      console.log(response.data);
    })
  }

  const decrement = () => {
    if (pokeId !== 1) {
      setPokeId(pokeId - 1);
      setUpdateData(true)
      getPokemon();
    }
  }

  const increment = () => {
    if (pokeId !== countPokes) {
      setPokeId(pokeId + 1);
      setUpdateData(true)
      getPokemon();
    }
  }

  return (
    <>
      <div className="pokedex">
        <Card style={{ width: '18rem' }}>
          {pokemon.sprites == null ? (
            <Card.Img variant="top" src='#' />
          ) : (
            <Card.Img variant="top" src={pokemon.sprites.front_default} />
          )}
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              <BsCaretLeftFill style={{ width: '15%', height: '5%', cursor: 'pointer' }} onClick={() => decrement()} />
              <BsCaretRightFill style={{ width: '15%', height: '5%', cursor: 'pointer' }} onClick={() => increment()} />
            </Card.Title>
          </Card.Body>
        </Card>
        <div style={{ border: '5px solid rgb(200, 10, 10)', borderRadius: '2px', height: '55vh' }}></div>
        <Card style={{ width: '18rem', height: '23rem' }}>
          <Card.Body>
            <Card.Title
              style={{
                textTransform: 'uppercase',
                backgroundColor: 'white',
                textAlign: 'center',
                height: '5vh',
                borderRadius: '5px'
              }}>
              Name : {pokemon.name}
            </Card.Title>
            <Card.Text
                style={{
                  textTransform: 'uppercase',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: '20vh',
                  borderRadius: '5px'
                }}
              >
            <h5 style={{textAlign: 'center'}}>Type: </h5>
            {pokemon.types == null ? (
              <p></p>
            ) : (pokemon.types.map((poke) => (
              <p key={poke.url} >{poke.type.name}</p>              
            )))}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
