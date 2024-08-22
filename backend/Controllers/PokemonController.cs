using System.IO;
using backend.DTO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ActionResult<IAsyncEnumerable<PokemonDTO>>> GetPokemons()
        {
            try
            {
                var pokemons = await _pokemonService.GetPokemons();
                var pokemonsDTO = new List<PokemonDTO>();
                foreach (var pokemon in pokemons)
                {
                    pokemonsDTO.Add(MapPokemonToDTO(pokemon));
                }
                return Ok(pokemonsDTO);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpGet("PokemonByName")]
        public async Task<ActionResult<IAsyncEnumerable<PokemonDTO>>> GetPokemonByName(string name)
        {
            try
            {
                var pokemons = await _pokemonService.GetPokemonByName(name);
                if (pokemons == null) return NotFound($"Pokemon by the name {name} was not founded");
                var pokemonsDTO = new List<PokemonDTO>();
                foreach (var pokemon in pokemons)
                {
                    pokemonsDTO.Add(MapPokemonToDTO(pokemon));
                }
                return Ok(pokemonsDTO);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpGet("{id:int}", Name = "GetPokemon")]
        public async Task<ActionResult<PokemonDTO>> GetPokemon(int id)
        {
            try
            {
                var pokemon = await _pokemonService.GetPokemon(id);
                if (pokemon == null) return NotFound($"The pokemon of id = {id} was not founded");
                var pokemonDTO = MapPokemonToDTO(pokemon);
                return Ok(pokemonDTO);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        internal PokemonDTO MapPokemonToDTO(Pokemon pokemon)
        {
            var result = new PokemonDTO
            {
                Id = pokemon.Id,
                Name = pokemon.Name,
                Type = pokemon.Type,
                Moves = pokemon.Moves,
                Weight = pokemon.Weight,
                Height = pokemon.Height,
                ImageName = pokemon.Image,
                RegionId = pokemon.RegionId,
            };
            return result;
        } 


        internal Pokemon MapPokemonObject(PokemonDTO pokemonDTO, int id = 0)
        {            
            var result = new Pokemon
            {
                Name = pokemonDTO.Name,
                Type = pokemonDTO.Type,
                Moves = pokemonDTO.Moves,
                Weight = pokemonDTO.Weight,
                Height = pokemonDTO.Height,
                Image = pokemonDTO.ImageName,
                RegionId = pokemonDTO.RegionId,
            };
            if (id != 0) result.Id = id;
            return result;
        }

        [HttpPost("Upload")]
        public ActionResult UploadImage([FromForm] FileDTO Image)
        {
            try
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", Image.ImageName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    Image.Image.CopyTo(stream);
                }
                return Ok("Pokemon Image Uploaded with success");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }

        }

        [HttpGet("{imageName}", Name = "GetImage")]
        public IActionResult GetImage(string imageName)
        {
            if(imageName == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "ImageName was not passed");
            }
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imageName);
            return PhysicalFile(path,"image/png");
        } 

        [HttpPost]
        public async Task<ActionResult> AddPokemon([FromBody] PokemonDTO pokemon)
        {
            try
            {
                var pokemonDTO = MapPokemonObject(pokemon);
                await _pokemonService.AddPokemon(pokemonDTO);
                return CreatedAtRoute(nameof(GetPokemon), new { id = pokemonDTO.Id }, pokemon);

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error has occurred");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditPokemon(int id, [FromBody] PokemonDTO pokemon)
        {
            try
            {
                var validatePokemon = await _pokemonService.GetPokemon(id);
                if (validatePokemon.Id == id)
                {
                    var pokemonDTO = MapPokemonObject(pokemon, id);
                    await _pokemonService.UpdatePokemon(pokemonDTO);
                    return Ok($"The pokeon of id = {id} was updated");
                }
                else
                {
                    return NotFound($"The pokemon of {id} was not founded");
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
                if (pokemon != null)
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