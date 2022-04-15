
using System;

namespace GurmukhiAppMain.Word.Dto
{
    public class WordTransationItem
    {
        public int Id { get; set; }
        public string Punjabi { get; set; }
        public string English { get; set; }
        public string Character { get; set; }
        public string Equivalent { get; set; }
        public string Description { get; set; }
        public string AudioFileName { get; set; }
        public string ImageFileName { get; set; }
        public int OrderNumber { get; set; }
        public int SubCategoryId { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
