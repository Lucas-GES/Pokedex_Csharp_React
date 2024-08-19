using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTO
{
    public class FileDTO
    {
        public string ImageName { get; set; }
        public IFormFile Image { get; set; }
    }
}