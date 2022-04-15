using System.Collections.Generic;

namespace GurmukhiAppMain.Letter.ViewModel
{
    public class LetterGroupsResult
    {
        public List<Letter> Letters { get; set; }
        public string GroupTitle { get; set; }
        public string ImagePrefix { get; set; }
        public string AudioPrefix { get; set; }
    }
}
