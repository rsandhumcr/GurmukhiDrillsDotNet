using System.Collections.Generic;
namespace LetterTranslation.dto
{
    
    public class RandomLetterData
    {
        public int NoOfLetters { get; set; }
        public int LengthOfwords { get; set; }
        public List<RandomQuestion> Questions { get; set; }

        public string[] EnglishLetters { get; set; }
        public string[] PunjabiLetters { get; set; }
    }
}
