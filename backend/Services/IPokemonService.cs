using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface IPokemonService
    {
        Task<IEnumerable<Pokemon>> GetPokemons();
        Task<Pokemon> GetPokemon(int id);
        Task<IEnumerable<Pokemon>> GetPokemonByName(string name);
        Task AddPokemon(Pokemon pokemon);
        Task UpdatePokemon(Pokemon pokemon);
        Task DeletePokemon(Pokemon pokemon);
    }
}