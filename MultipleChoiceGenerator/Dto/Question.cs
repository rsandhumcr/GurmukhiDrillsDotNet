using System.Collections.Generic;

namespace multipleChoiceGenerator.Dto
{
    public class Question
    {
        public int Index { get; set; }
        public List<LayoutContent> LayoutQuestion { get; set; }
        public List<AnswerData> ListAnwsers { get; set; }
        public bool Anwsered { get; set; }
        public bool Correct { get; set; }
        public string SelectedAnwser { get; set; }
        public string CorrectAnwser { get; set; }
    }
}
