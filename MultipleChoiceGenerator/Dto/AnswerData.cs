using System.Collections.Generic;

namespace multipleChoiceGenerator.Dto
{
    public class AnswerData
    {
        public int Index { get; set; }
        public string OptionLabel { get; set; }
        public List<LayoutContent> ListLayout { get; set; }
        public bool CorrectOption { get; set; }
        public bool IsSelected { get; set; }
        
    }
}
