using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Region
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }     

        public string Description { get; set; }   
        public ICollection<Pokemon> Pokemons { get; set; }
    }
}