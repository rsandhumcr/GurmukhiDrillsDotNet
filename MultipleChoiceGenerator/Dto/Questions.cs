using System.Collections.Generic;

namespace multipleChoiceGenerator.Dto
{
    public class Questions
    {
        public string Title { get; set; }
        public int NoOfQuestions { get; set; }
        public string Description { get; set; }
        public int QuestionsAnwsered { get; set; }
        public string ImagePrefix { get; set; }
        public string AudioPrefix { get; set; }
        public List<Question> ListQuestion { get; set; }
    }
}