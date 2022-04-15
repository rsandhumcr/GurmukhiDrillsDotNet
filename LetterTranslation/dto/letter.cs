using Newtonsoft.Json;

namespace LetterTranslation.dto
{
    public class Letter
    {
        [JsonProperty("order")]
        public int Order { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("punjabi")]
        public string Punjabi { get; set; }

        [JsonProperty("english")]
        public string English { get; set; }

        [JsonProperty("englishEquivalent")]
        public string EnglishEquivalent { get; set; }

        [JsonProperty("iast")]
        public string Iast { get; set; }

        [JsonProperty("rowLocation")]
        public int RowLocation { get; set; }

        [JsonProperty("columnLocation")]
        public int ColumnLocation { get; set; }

        [JsonProperty("typeLetter")]
        public string Type { get; set; }

        [JsonProperty("after")]
        public bool After { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("media")]
        public Media Media { get; set; }
    }
}