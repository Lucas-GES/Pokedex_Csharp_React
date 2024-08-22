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
        public async Task<ActionResult<IAsyncEnumerable<RegionDTO>>> GetRegions()
        {
            try
            {
                var regions = await _regionService.GetRegions();
                var regionsDTO = new List<RegionDTO>();
                foreach (var region in regions)
                {
                    regionsDTO.Add(MapRegionToDTO(region));
                }

                return Ok(regionsDTO);
            }
            catch 
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpGet("RegionByName")]
        public async Task<ActionResult<IAsyncEnumerable<RegionDTO>>> GetRegionByName(string name)
        {
            try
            {
                var regions = await _regionService.GetRegionByName(name);
                if(regions == null) return NotFound($"The region {name} was not founded");
                var regionsDTO = new List<RegionDTO>();
                foreach (var region in regions)
                {
                    regionsDTO.Add(MapRegionToDTO(region));
                }

                return Ok(regionsDTO);
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }

        [HttpGet("{id:int}", Name = "GetRegion")]
        public async Task<ActionResult<RegionDTO>> GetRegion(int id)
        {
            try
            {
                var regions = await _regionService.GetRegion(id);
                if(regions == null) return NotFound($"The region of id {id} was not founded");
                var regionDTO = MapRegionToDTO(regions);
                return Ok(regionDTO);
            }
            catch
            {
                return BadRequest("An error has occurred");
            }
        }

        internal RegionDTO MapRegionToDTO(Region region)
        {
            var result = new RegionDTO
            {
                Id = region.Id,
                Name = region.Name,
                Image = region.Image
            };
            return result;
        } 

        internal Region MapRegionObject(RegionDTO regionDTO, int id = 0)
        {
            var result = new Region
            {
                Name = regionDTO.Name,
                Image = regionDTO.Image
            };
            if(id != 0) result.Id = id;
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

        [HttpGet("{imageName}", Name = "GetRegionImage")]
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