using GurmukhiAppMain.Letter;
using Microsoft.AspNetCore.Mvc;

namespace WebGurmukhiDrills.Api
{
    [Route("api/[controller]")]
    public class LetterMulipleChoiceController : Controller
    {
        private readonly ILettersMulipleChoiceGenerator _lettersMulipleChoiceGenerator;

        public LetterMulipleChoiceController(ILettersMulipleChoiceGenerator lettersMulipleChoiceGenerator)
        {
            _lettersMulipleChoiceGenerator = lettersMulipleChoiceGenerator;
        }

        // http://localhost:55497/api/LetterMulipleChoice?groupTypes=1&groupTypes=2&groupTypes=3
        public IActionResult GetQuestionSet([FromQuery] int[] groupTypes)
        {
            var result = _lettersMulipleChoiceGenerator.GenerateQuestions(groupTypes);
            return Ok(result);
        }
    }
}
