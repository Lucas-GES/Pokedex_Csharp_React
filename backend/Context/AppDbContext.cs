using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pokemon> Pokemons { get; set; }
        public DbSet<Region> Regions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Pokemon>()
                  .HasOne(p => p.Region)
                  .WithMany(p => p.Pokemons)
                  .HasForeignKey(e => e.RegionId)
                  .IsRequired();
        }
    }
}