using Logging;

namespace LetterTranslation
{
    public interface ILetterSerivceBuilder
    {
        string DefinedDataPath { get; set; }
        LetterService GenerateSerivce(ILog log);
    }

    public class LetterSerivceBuilder : ILetterSerivceBuilder
    {
        private LetterService _letterService;
        public string DefinedDataPath { get; set; }

        public LetterService GenerateSerivce(ILog log)
        {
            if (_letterService == null)
            {
                _letterService = new LetterService
                {
                    Logger = log,
                    DataFile = "data.json",
                    JsonObjectLoader = new JsonObjectLoader()
                };
                if (!string.IsNullOrWhiteSpace(DefinedDataPath))
                {
                    _letterService.DataFile = DefinedDataPath;
                }
            }

            return _letterService;
        }
    }
}
