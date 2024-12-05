using backend.Context;
using backend.DTO;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Services
{
    public class PokemonService : IPokemonService
    {

        private readonly AppDbContext _context;

        public PokemonService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Pokemon> GetPokemon(int id)
        {
            var pokemon = await _context.Pokemons.FindAsync(id);
            return pokemon;
        }

        public async Task<IEnumerable<Pokemon>> GetPokemonByName(string name)
        {
            IEnumerable<Pokemon> pokemons;
            if(!string.IsNullOrWhiteSpace(name))
            {
                pokemons = await _context.Pokemons.Where(p => p.Name.Contains(name)).ToListAsync();
            }
            else
            {
                pokemons = await GetPokemons();
            }
            return pokemons;
        }
        
        public async Task<IEnumerable<Pokemon>> GetPokemons()
        {
            try
            {
                return await _context.Pokemons.AsNoTracking().ToListAsync();
            }
            catch
            {                
                throw;
            }
        }

        public async Task<PokeAPIDTO?> GetPokemonPokeAPI(int id)
        {
            try
            {
                var client = new HttpClient();
                HttpResponseMessage response = await client.GetAsync($"https://pokeapi.co/api/v2/pokemon/{id}");
                response.EnsureSuccessStatusCode();
                var resultResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<PokeAPIDTO>(resultResponse);
                return result;
            }
            catch
            {
                
                throw;
            }
        }

        public async Task AddPokemon(Pokemon pokemon)
        {
            _context.Pokemons.Add(pokemon);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePokemon(Pokemon pokemon)
        {
            _context.Entry(pokemon).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePokemon(Pokemon pokemon)
        {
            _context.Pokemons.Remove(pokemon);
            await _context.SaveChangesAsync();
        }        
    }
}