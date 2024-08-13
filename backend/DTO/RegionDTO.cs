using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class RegionDTO
    {
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
    }
}