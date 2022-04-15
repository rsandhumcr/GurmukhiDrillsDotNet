using GurmukhiAppMain.Letter;
using Microsoft.AspNetCore.Mvc;

namespace WebGurmukhiDrills.Api
{
    [Route("api/[controller]")]
    public class LetterController : Controller
    {
        private readonly IGroupLetterService _groupLetterService;

        public LetterController(IGroupLetterService groupLetterService)
        {
            _groupLetterService = groupLetterService;
        }

        [HttpGet("[action]/{id?}")]
        public IActionResult GetGroup(int id=0)
        {
            var result = _groupLetterService.GetGroupsByType((GurmukhiAppMain.Letter.LetterGroups)id);

            if (result?.Letters == null || result.Letters.Count == 0)
                return NotFound();

            result.ImagePrefix = "/images/letters";
            result.AudioPrefix = "/audio/letters";
            return Ok(result);
        }
    }
}
