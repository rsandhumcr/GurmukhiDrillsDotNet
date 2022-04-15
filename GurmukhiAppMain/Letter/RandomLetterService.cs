using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GurmukhiAppMain.Letter.ViewModel;
using LetterTranslation;
using LetterTranslation.dto;

namespace GurmukhiAppMain.Letter
{
    public interface IRandomLetterService
    {
        RandomLetterData GenerateQuestions(int numberOfWords, int lengthOfWord, int[] groupindexes);
    }

    public class RandomLetterService : IRandomLetterService
    {
        private const string VowelConstantKeyWord = "vowel";
        private const string JoinConstantKeyWord = "join";
        private const string VowelCarrierConstantKeyWord = "vowelcarrier";

        private readonly IRandomLetterGenerator _randomLetterGenerator;
        private readonly IGroupLetterService _groupLetterService;
        private readonly IMapper _mapper;

        public RandomLetterService(IGroupLetterService groupLetterService, IRandomLetterGenerator randomLetterGenerator, IMapper mapper)
        {
            _mapper = mapper;
            _groupLetterService = groupLetterService;
            _randomLetterGenerator = randomLetterGenerator;
        }
        public RandomLetterData GenerateQuestions(int numberOfWords, int lengthOfWord,int[] groupindexes)
        {
            if (!groupindexes.Any())
            {
                groupindexes = new[] {1};
            }
            var letters = _groupLetterService.GetGroupsByTypes(groupindexes);
            AddVowelsIfNoneExists(letters);
            _randomLetterGenerator.LetterSource = _mapper.Map<List<LetterTranslation.dto.Letter>>(letters.Letters);
            var result = _randomLetterGenerator.GenerateRandomLetter(numberOfWords, lengthOfWord);
            return result;
        }

        private bool AddVowelsIfNoneExists(LetterGroupsResult letters)
        {
            var addedVowels = false;
            var vowelSource = letters.Letters.Where(prp => prp.Type == VowelConstantKeyWord || prp.Type == JoinConstantKeyWord || prp.Type == VowelCarrierConstantKeyWord).ToList();
            if (!vowelSource.Any())
            {
                var letterVowels = _groupLetterService.GetGroupsByType(LetterGroups.Vowels);
                letters.Letters.AddRange(letterVowels.Letters);
                addedVowels = true;
            }
            return addedVowels;
        }
    }
}