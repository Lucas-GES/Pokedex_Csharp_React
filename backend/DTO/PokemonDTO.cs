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
    public class PokeAPIDTO
    {
        public int Id { get; set; }
        public List<Abilities> Abilities { get; set; }
        public double Height { get; set; }
        public List<Moves> Moves { get; set; }
        public string Name { get; set; }
        public Sprites Sprites { get; set; }
        public List<Types> Types { get; set; }
        public double Weight { get; set; }

    }
    public class Abilities
    {
        public Ability Ability{ get; set; }
    }
    public class Ability
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
    public class Moves 
    {
        public Move Move { get; set; }
    }
    public class Move
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
    public class Sprites
    {
        public string Front_default { get; set; }
        public string Front_shiny { get; set; }
    }
    public class Types
    {
        public Type Type { get; set; }
    }
    public class Type
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }
}