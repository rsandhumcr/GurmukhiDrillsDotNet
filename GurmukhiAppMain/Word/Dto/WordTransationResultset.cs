using System;
using System.Collections.Generic;

namespace GurmukhiAppMain.Word.Dto
{
    public class WordTransationResultset
    {
        public List<WordTransationItem> ListTransation { get; set; }
        public String AudioPrefix { get; set; }
        public String ImagePrefix { get; set; }
    }
}
