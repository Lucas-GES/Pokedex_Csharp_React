using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RegionService : IRegionService
    {        

        private readonly AppDbContext _context;

        public RegionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Region> GetRegion(int id)
        {
            var region = await _context.Regions.FindAsync(id);
            return region;
        }

        public async Task<IEnumerable<Region>> GetRegionByName(string name)
        {
            IEnumerable<Region> regions;
            if(!string.IsNullOrWhiteSpace(name))
            {
                regions = await _context.Regions.Where(p => p.Name.Contains(name)).ToListAsync();
            }
            else
            {
                regions = await GetRegions();
            }
            return regions;
        }

        public async Task<IEnumerable<Region>> GetRegions()
        {
            try
            {
                return await _context.Regions.AsNoTracking().ToListAsync();
            }
            catch
            {                
                throw;
            }
        }

        public async Task AddRegion(Region region)
        {
            _context.Regions.Add(region);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRegion(Region region)
        {
            _context.Entry(region).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRegion(Region region)
        {
            var pokemonsByRegion = await _context.Pokemons.Where(p => p.RegionId == region.Id).ToListAsync();
            _context.Pokemons.RemoveRange(pokemonsByRegion);
            _context.Regions.Remove(region);
            await _context.SaveChangesAsync();
        }
    }
}