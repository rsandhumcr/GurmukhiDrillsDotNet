namespace LetterTranslation.dto
{
    public class RandomQuestion
    {
        public TranslationResultSet Translation { get; set; }
        public bool Anwsered { get; set; }
        public string[] Feedback { get; set; }
    }
}
