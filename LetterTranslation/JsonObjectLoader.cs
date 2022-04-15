using System.IO;
using System.Threading.Tasks;
using LetterTranslation.dto;
using Newtonsoft.Json;

namespace LetterTranslation
{
    public interface IJsonObjectLoader
    {
        Alphabet LoadJsonFile(string filename);
        Task<Alphabet> LoadJsonFileAsync(string filename);
    }

    public class JsonObjectLoader : IJsonObjectLoader
    {
        public Alphabet LoadJsonFile(string filename)
        {
            Alphabet items = null;
            using (var stream = new FileStream(filename, FileMode.Open))
            using (StreamReader r = new StreamReader(stream))
            {
                string json = r.ReadToEnd();
                items = JsonConvert.DeserializeObject<Alphabet>(json);
            }
            return items;
        }

        public async Task<Alphabet> LoadJsonFileAsync(string filename)
        {
            Alphabet items = null;
            using (var stream = new FileStream(filename, FileMode.Open))
            using (StreamReader r = new StreamReader(stream))
            {
                string json = r.ReadToEnd();
                items = await Task.Factory.StartNew(() => JsonConvert.DeserializeObject<Alphabet>(json));
            }
            return items;
        }

    }
}

