using System;

namespace DbGurmukhiModel
{
    public class Translation
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
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public int SubCategoryId { get; set; }
        public virtual SubCategory SubCategory { get; set; }
    }
}
