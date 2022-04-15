using GurmukhiAppMain.Letter;
using Microsoft.AspNetCore.Mvc;

namespace WebGurmukhiDrills.Api
{
    [Route("api/[controller]")]
    public class LetterGroups:Controller
    {
        private readonly ILetterGroupMapping _letterGroupMapping;

        public LetterGroups(ILetterGroupMapping letterGroupMapping)
        {
            _letterGroupMapping = letterGroupMapping;
        }
        public IActionResult GetGroups()
        {
            return Ok(_letterGroupMapping.Data());
        }
    }
}
