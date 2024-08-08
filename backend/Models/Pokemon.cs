using System.ComponentModel.DataAnnotations;

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
        public string Image { get; set; }
        [Required]
        public int RegionId { get; set; }
        public Region Region { get; set; }
    }
}