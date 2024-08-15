import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemons from "./views/Pokedex";
import AllPokemons from "./views/AllPokemons";

export default function Path() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Pokemons} />
          <Route path="/pokemons" Component={AllPokemons} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
