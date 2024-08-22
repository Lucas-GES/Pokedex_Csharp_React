import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemons from "./views/Pokedex";
import AllPokemons from "./views/AllPokemons";
import ListRegions from "./views/Regions";
import NewEditPokemon from "./views/NewEditPokemon";
import NewEditRegion from "./views/NewEditRegion";

export default function Path() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Pokemons} />
          <Route path="/pokemons" Component={AllPokemons} />
          <Route path="/pokemons/new/:pokemonId" Component={NewEditPokemon} />
          <Route path="/regions" Component={ListRegions} />
          <Route path="/regions/new/:regionId" Component={NewEditRegion} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
