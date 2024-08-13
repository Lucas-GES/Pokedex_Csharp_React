using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegionController : ControllerBase
    {
        private readonly IRegionService _regionService;

        public RegionController(IRegionService regionService)
        {
            _regionService = regionService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Region>>> GetRegions()
        {
            try
            {
                var regions = await _regionService.GetRegions();
                return Ok(regions);
            }
            catch 
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpGet("RegionByName")]
        public async Task<ActionResult<IAsyncEnumerable<Region>>> GetRegionByName(string name)
        {
            try
            {
                var regions = await _regionService.GetRegionByName(name);
                if(regions == null) return NotFound($"The region {name} was not founded");

                return Ok(regions);
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpGet("{id:int}", Name = "GetRegion")]
        public async Task<ActionResult<Region>> GetRegion(int id)
        {
            try
            {
                var regions = await _regionService.GetRegion(id);
                if(regions == null) return NotFound($"The region of id {id} was not founded");
                return Ok(regions);
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }

        internal Region MapRegionObject(RegionDTO regionDTO, int id = 0)
        {
            var result = new Region
            {
                Name = regionDTO.Name,
                Image = regionDTO.Image,
                Pokemons = []
            };
            if(id != 0) result.Id = id;
            return result;
        }

        [HttpPost]
        public async Task<ActionResult> AddRegion(RegionDTO region)
        {
            try
            {
                var regionDTO = MapRegionObject(region);
                await _regionService.AddRegion(regionDTO);
                return CreatedAtRoute(nameof(GetRegion), new { id = regionDTO.Id }, region);
            }
            catch (System.Exception)
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditRegion(int id, [FromBody] RegionDTO regionDTO)
        {
            try
            {
                var validateRegion = await _regionService.GetRegion(id);
                if(validateRegion.Id == id){
                    var region = MapRegionObject(regionDTO, id);
                    await _regionService.UpdateRegion(region);
                    return Ok($"The region of id {id} was updated");
                }
                else
                {
                    return BadRequest("Inconsistent Data");
                }
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteRegion(int id)
        {
            try
            {
                var region = await _regionService.GetRegion(id);
                if(region != null)
                {
                    await _regionService.DeleteRegion(region);
                    return Ok($"The region of id {id} was deleted");
                }
                else
                {
                    return NotFound($"The region of id {id} was not founded");
                }
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }
    }
}