using System;
using System.Linq;
using GurmukhiAppMain.Letter.Transforms;
using Logging;
using multipleChoiceGenerator;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Letter
{
    public interface ILettersMulipleChoiceGenerator
    {
        Questions GenerateQuestions(int[] groupindexes);
    }
    public class LettersMulipleChoiceGenerator : ILettersMulipleChoiceGenerator
    {
        private readonly IGroupLetterService _groupLetterService;
        private readonly IMultipleChoiceGenerator<ViewModel.Letter> _multipleChoiceGenerator;

        public LettersMulipleChoiceGenerator(IGroupLetterService groupLetterService, IMultipleChoiceGenerator<ViewModel.Letter> multipleChoiceGenerator)
        {
            _multipleChoiceGenerator = multipleChoiceGenerator;
            _groupLetterService = groupLetterService;
        }

        public Questions GenerateQuestions(int[] groupindexes)
        {
            if (!groupindexes.Any())
            {
                groupindexes = new[] {1};
            }
            var letters = _groupLetterService.GetGroupsByTypes(groupindexes);
            var wildCard = _groupLetterService.GetGroupsByType(LetterGroups.All);
            var letterIndex = letters.Letters.Select(itm => itm.Order);
            var wildPassed = wildCard.Letters.Where(itm => !letterIndex.Contains(itm.Order)).ToList();

            _multipleChoiceGenerator.Logger = new LogConsole();
            _multipleChoiceGenerator.NoOfOptions = 4;
            _multipleChoiceGenerator.Source = letters.Letters;
            _multipleChoiceGenerator.WildCardSource = wildPassed;
            _multipleChoiceGenerator.ExtractAnswer = new LetterAnswerGeneratorEnglish();
            _multipleChoiceGenerator.ExtractQuestion = new LetterQuestionGeneratorEnglish();
            _multipleChoiceGenerator.ItemSelection = new ItemSelection();

            _multipleChoiceGenerator.GenerateQuestions("Letter groups", GenerateDescription(groupindexes));
            var questions = _multipleChoiceGenerator.Questions;
            questions.ImagePrefix = "/images/letters";
            questions.AudioPrefix = "/audio/letters";
            return questions;
        }

        private string GenerateDescription(int[] groupindexes)
        {
            var description = string.Empty;
            foreach (var groupIndex in groupindexes)
            {
                if (!string.IsNullOrEmpty(description))
                {
                    description += ", ";
                }
                description += Enum.GetName(typeof(LetterGroups),groupIndex);
            }
            return description;
        }
    }
}
