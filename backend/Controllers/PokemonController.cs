using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonService _pokemonService;

        public PokemonController(IPokemonService pokemonService)
        {
            _pokemonService = pokemonService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Pokemon>>> GetPokemons()
        {
            try
            {
                var pokemons = await _pokemonService.GetPokemons();
                return Ok(pokemons);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpGet("PokemonByName")]
        public async Task<ActionResult<IAsyncEnumerable<Pokemon>>> GetPokemonByName(string name)
        {
            try
            {
                var pokemons = await _pokemonService.GetPokemonByName(name);
                if(pokemons == null) return NotFound($"Pokemon by the name {name} was not founded");

                return Ok(pokemons);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpGet("{id:int}", Name="GetPokemon")]
        public async Task<ActionResult<Pokemon>> GetPokemon(int id)
        {
            try
            {
                var pokemon = await _pokemonService.GetPokemon(id);
                if(pokemon == null) return NotFound($"The pokemon of id = {id} was not founded");
                return Ok(pokemon);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddPokemon(Pokemon pokemon)
        {
            try
            {
                await _pokemonService.AddPokemon(pokemon);
                return CreatedAtRoute(nameof(GetPokemon), new { id = pokemon.Id }, pokemon);
                
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditPokemon(int id, [FromBody] Pokemon pokemon)
        {
            try
            {
                if(pokemon.Id == id)
                {
                    await _pokemonService.UpdatePokemon(pokemon);
                    return Ok($"The pokeon of id = {id} was updated");
                }
                else
                {
                    return BadRequest("Inconsistent pokemon data");
                }
                
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeletePokemon(int id)
        {
            try
            {
                var pokemon = await _pokemonService.GetPokemon(id);
                if(pokemon != null)
                {
                    await _pokemonService.DeletePokemon(pokemon);
                    return Ok($"The pokeon of id = {id} was deleted");
                }
                else
                {
                    return NotFound($"The pokemon of id = {id} was not founded");
                }
                
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }
    }
}