

using backend.Models;

namespace backend.Services
{
    public interface IRegionService
    {
        Task<IEnumerable<Region>> GetRegions();
        Task<Region> GetRegion(int id);
        Task<IEnumerable<Region>> GetRegionByName(string name);
        Task AddRegion(Region region);
        Task UpdateRegion(Region region);
        Task DeleteRegion(Region region);
    }
}