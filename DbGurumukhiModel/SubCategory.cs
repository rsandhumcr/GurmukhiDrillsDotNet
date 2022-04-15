using System;
using System.Collections.Generic;

namespace DbGurmukhiModel
{
    public class SubCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int OrderNumber { get; set; }
        public virtual List<Translation> Translations { get; set; }
        public int CategoryId { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public virtual Category Category { get; set; }


    }
}
