using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DbGurmukhiMsSql.Interface;
using GurmukhiAppMain.Word.Dto;
using GurmukhiAppMain.Word.Transforms;
using multipleChoiceGenerator;
using Logging;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Word
{
    public interface IWordMultipleChoiceGenerator
    {
        Task<Questions> GenerateQuestions(int subcategoryid, int optionlevel, bool isPunjabiAnwser, bool showImage);
    }

    public class WordMultipleChoiceGenerator : IWordMultipleChoiceGenerator
    {
        private readonly IMultipleChoiceGenerator<WordTransationItem> _multipleChoiceGenerator;
        private readonly IGurmukhiRepository _gurmukhiRepository;
        private readonly IMapper _mapper;
        private readonly ILog _logger;
        
        public WordMultipleChoiceGenerator(ILog logger, IGurmukhiRepository gurmukhiRepository, IMapper mapper, IMultipleChoiceGenerator<WordTransationItem> multipleChoiceGenerator)
        {
            _logger = logger;
            _multipleChoiceGenerator = multipleChoiceGenerator;
            _mapper = mapper;
            _gurmukhiRepository = gurmukhiRepository;
        }

        public async Task<Questions> GenerateQuestions(int subcategoryid, int optionlevel, bool isPunjabiAnwser, bool showImage)
        {

            var translation = await _gurmukhiRepository.GetTranslationAsync(subcategoryid);
            var translationDto = _mapper.Map<List<WordTransationItem>>(translation);
            List<WordTransationItem> wildCardtranslationDto = new List<WordTransationItem>();

            if (translationDto.Count < 10)
            {
                // TODO : Need a better source.
                int wildcardsubid = (subcategoryid == 1) ? 2 : 1;
                var wildCardtranslation = await _gurmukhiRepository.GetTranslationAsync(wildcardsubid);
                wildCardtranslationDto = _mapper.Map<List<WordTransationItem>>(wildCardtranslation);
            }
        
            _multipleChoiceGenerator.Logger = _logger;
            _multipleChoiceGenerator.NoOfOptions = 4;
            _multipleChoiceGenerator.Source = translationDto;
            _multipleChoiceGenerator.WildCardSource = wildCardtranslationDto;

            if (isPunjabiAnwser)
            {
                var contextdata = new WordPunjabiContextGenerator(optionlevel, showImage); 
                _multipleChoiceGenerator.ExtractAnswer = contextdata;
                _multipleChoiceGenerator.ExtractQuestion = contextdata;
            }
            else
            {
                var contextdata = new WordEnglishContextGenerator(optionlevel, showImage);
                _multipleChoiceGenerator.ExtractAnswer = contextdata;
                _multipleChoiceGenerator.ExtractQuestion = contextdata;
            }


            _multipleChoiceGenerator.ItemSelection = new ItemSelection();

            _multipleChoiceGenerator.GenerateQuestions(string.Empty, string.Empty);
            var questions = _multipleChoiceGenerator.Questions;
            questions.ImagePrefix = "/images/data";
            questions.AudioPrefix = "/audio/data";
            return questions;
        }

    }
}
