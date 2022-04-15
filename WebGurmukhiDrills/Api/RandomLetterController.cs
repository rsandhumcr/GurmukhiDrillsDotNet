using Microsoft.AspNetCore.Mvc;
using GurmukhiAppMain.Letter;

namespace WebGurmukhiDrills.Api
{
    [Produces("application/json")]
    [Route("api/RandomLetter")]
    public class RandomLetterController : Controller
    {
        private readonly IRandomLetterService _randomLetterService;

        public RandomLetterController(IRandomLetterService randomLetterService)
        {
            _randomLetterService = randomLetterService;
        }
        // http://localhost:55497/api/RandomLetter?numberOfLetter=5&lengthOfLetter=6&groupTypes=1&groupTypes=2&groupTypes=3
        public IActionResult GetQuestionSet([FromQuery]int numberOfLetter, [FromQuery] int lengthOfLetter,[FromQuery] int[] groupTypes)
        {
            if (numberOfLetter < 1)
                numberOfLetter = 6;
            if (lengthOfLetter < 1)
                lengthOfLetter = 5;
            if (numberOfLetter > 20)
                numberOfLetter = 20;
            if (lengthOfLetter > 20)
                lengthOfLetter = 20;
            var result = _randomLetterService.GenerateQuestions(numberOfLetter, lengthOfLetter, groupTypes);
            return Ok(result);
        }
    }
}