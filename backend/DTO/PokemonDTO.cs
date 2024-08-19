using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTO
{
    public class PokemonDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public string Moves { get; set; }
        public string ImageName { get; set; }
        [Required] 
        public int RegionId { get; set; }
    }
}