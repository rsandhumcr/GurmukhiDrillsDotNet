using Logging;

namespace LetterTranslation
{
    public interface ITranslationServiceBuilder
    {
        TranslationService GenerateService(ILog log);
    }

    public class TranslationServiceBuilder : ITranslationServiceBuilder
    {
        public TranslationServiceBuilder(ILetterSerivceBuilder letterSerivceBuilder)
        {
            _letterSerivceBuilder = letterSerivceBuilder;
        }

        public string DefinedDataPath { get; set; } = "data/data.json";
        private static TranslationService  _translationService;
        private readonly ILetterSerivceBuilder _letterSerivceBuilder;

        public TranslationService GenerateService(ILog log)
        {
            if (_translationService == null)
            {
                _translationService = new TranslationService();

                if (!string.IsNullOrWhiteSpace(DefinedDataPath))
                {
                    _letterSerivceBuilder.DefinedDataPath = DefinedDataPath;
                }
                _translationService.LetterService = _letterSerivceBuilder.GenerateSerivce(log);

                _translationService.Translator = new Translator();
                //_translationService.Log = new Log();
                _translationService.Log = log;
            }
            return _translationService;
        }
    }
}
