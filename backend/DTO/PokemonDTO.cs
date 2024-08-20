using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DTO
{
    public class PokemonDTO
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public string Moves { get; set; }
        public float Weight { get; set; }
        public float Height { get; set; } 
        public string ImageName { get; set; }
        [Required] 
        public int RegionId { get; set; }
    }
}