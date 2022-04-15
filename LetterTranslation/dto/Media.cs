using Newtonsoft.Json;

namespace LetterTranslation.dto
{
    public class Media
    {
        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("image1")]
        public string Image1 { get; set; }

        [JsonProperty("nameFile")]
        public string NameFile { get; set; }

        [JsonProperty("pronouncefile")]
        public string Pronouncefile { get; set; }
    }
}