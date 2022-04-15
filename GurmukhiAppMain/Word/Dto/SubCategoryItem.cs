using System;

namespace GurmukhiAppMain.Word.Dto
{
    public class SubCategoryItem
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int OrderNumber { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
