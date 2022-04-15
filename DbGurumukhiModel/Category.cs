using System;
using System.Collections.Generic;

namespace DbGurmukhiModel
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public virtual List<SubCategory> SubCategories { get; set; }
    }
}
