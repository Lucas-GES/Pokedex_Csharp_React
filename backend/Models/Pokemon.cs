using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Pokemon
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public string Moves { get; set; }
        public float Weight { get; set; }
        public float Height { get; set; } 
        public string Image { get; set; }
        [Required] 
        [ForeignKey("Region")]
        public int RegionId { get; set; }
        public Region Region { get; set;}
    }
}