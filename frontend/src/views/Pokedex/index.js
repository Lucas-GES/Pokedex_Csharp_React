import "./styles.css";
import pokedex from "../../assets/pokedex-list.png";
import { Card, Button } from "react-bootstrap";
import dia from "../../assets/dia.png";
import noite from "../../assets/noite.png";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
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
      console.log(response.data)
    })
  }

  const decrement = () => {
    if(pokeId !== 1){
      setPokeId(value => pokeId - 1);
      setUpdateData(true);
      getPokemon();
    }
  }

  const increment = () => {
    if(pokeId !== countPokes){
      setPokeId(value => pokeId + 1);
      setUpdateData(true);
      getPokemon();
    }
  }

  return (
    <>
      <div className="pokedex">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pokemonSprite} />
          <Card.Body>
            <Card.Title style={{textAlign: 'center'}}>
              <BsCaretLeftFill style={{ width: '15%', height: '5%'}} onClick={() => decrement(-1)} />
              <BsCaretRightFill style={{ width: '15%', height: '5%'}} onClick={() => increment(1)} />
            </Card.Title>    
          </Card.Body>
        </Card>
        <div style={{ border: '5px solid rgb(200, 10, 10)', borderRadius: '2px', height: '55vh'}}></div>
        <Card style={{ width: '18rem', height: '23rem'}}>          
          <Card.Body>
            <Card.Title style={{textTransform: 'uppercase'}}>{pokemon.name}</Card.Title>   
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
