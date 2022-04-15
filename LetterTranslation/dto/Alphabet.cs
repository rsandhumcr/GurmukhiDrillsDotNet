using System.Collections.Generic;
using Newtonsoft.Json;

namespace LetterTranslation.dto
{
    public class Alphabet
    {
        [JsonProperty("letters")]
        public List<Letter> Letters { get; set; }
    }
}
