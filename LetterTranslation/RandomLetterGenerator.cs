using System;
using System.Collections.Generic;
using System.Linq;
using LetterTranslation.dto;
using Logging;

namespace LetterTranslation
{
    public interface IRandomLetterGenerator
    {
        List<Letter> LetterSource { get; set; }
        RandomLetterData GenerateRandomLetter(int numberOfWords, int lengthOfWord);
    }

    public class RandomLetterGenerator : IRandomLetterGenerator
    {
        private const string ConstantKeyWord = "consonant";
        private const string VowelConstantKeyWord = "vowel";
        private const string ConstantExtensionKeyWord = "consonant extension";
        private const string JoinConstantKeyWord = "join";
        private const string VowelCarrierConstantKeyWord = "vowelcarrier";
        private Random _random;
        private readonly ITranslationService _translationService;
        private readonly ITranslationServiceBuilder _translationServiceBuilder;

        public RandomLetterGenerator(ILog log, ITranslationServiceBuilder translationServiceBuilder)
        {
            _translationService = translationServiceBuilder.GenerateService(log);
            _random = new Random();
        }
        public enum LetterType
        {
            Constant,
            Vowel,
            ConsonantExtension,
            Other
        }

        public List<Letter> LetterSource { get; set; }
        private List<Letter> ConstantSource { get; set; }
        private List<Letter> VowelSource { get; set; }
        private List<Letter> ConstantExtensionSource { get; set; }
        private List<Letter> OtherSource { get; set; }

        public RandomLetterData GenerateRandomLetter(int numberOfWords, int lengthOfWord)
        {
            FilterLetterSource();
            var randomLetterData = new RandomLetterData
            {
                LengthOfwords = lengthOfWord,
                NoOfLetters = numberOfWords,
                Questions = new List<RandomQuestion>()
            };

            while (randomLetterData.Questions.Count < numberOfWords)
            {
                var letters = GenerateWord(lengthOfWord);

                var newTranslationResultSet = new TranslationResultSet();
                var punjabi = letters.Select(prp => prp.Punjabi).ToArray();
                var english = letters.Select(prp => prp.English).ToArray();
                var englishEquivalent = letters.Select(prp => prp.EnglishEquivalent).ToArray();

                newTranslationResultSet.Punjabi = String.Join(string.Empty, punjabi);
                newTranslationResultSet.EquivalentEnglish = String.Join(string.Empty, englishEquivalent);
                newTranslationResultSet.English = _translationService.TranslatePunjabiEnglish(newTranslationResultSet.Punjabi); 
                newTranslationResultSet.Translation = String.Join(string.Empty, english);

                var randomQuestion = new RandomQuestion
                {
                    Translation = newTranslationResultSet,
                    Anwsered = false,
                    Feedback = new string[0]
                };
                randomLetterData.Questions.Add(randomQuestion);
            }

            randomLetterData.EnglishLetters = LetterSource.Select(itm => itm.English).ToArray();
            randomLetterData.PunjabiLetters = LetterSource.Select(itm => itm.Punjabi).ToArray();
            return randomLetterData;
        }

        public void FilterLetterSource()
        {
            ConstantSource = LetterSource.Where(prp => prp.Type == ConstantKeyWord).ToList();
            VowelSource = LetterSource.Where(prp => prp.Type == VowelConstantKeyWord || prp.Type == JoinConstantKeyWord || prp.Type == VowelCarrierConstantKeyWord).ToList();
            ConstantExtensionSource = LetterSource.Where(prp => prp.Type == ConstantExtensionKeyWord).ToList();
            OtherSource = LetterSource.Where(prp => prp.Type != VowelConstantKeyWord 
            && prp.Type != ConstantKeyWord 
            && prp.Type != ConstantExtensionKeyWord
            && prp.Type != JoinConstantKeyWord
            && prp.Type != VowelCarrierConstantKeyWord).ToList();
        }

        private List<Letter> GenerateWord(int wordLength)
        {
            var letters = new List<Letter>();
            while (letters.Count < wordLength)
            {
                var nextTypeOfLetter = DetermineNextTypeOfLetter(letters);
                var nextLetter = GetNextRandomLetterType(nextTypeOfLetter);
                if (nextLetter != null)
                {
                    letters.Add(nextLetter);
                }
            }
            return letters;
        }

        public LetterType DetermineNextTypeOfLetter(List<Letter> letters)
        {
            if (letters == null || letters.Count == 0)
            {
                return LetterType.Constant;
            }

            var nextLetterType = LetterType.Other;
            var letterLength = letters.Count;
            if (letterLength == 1)
            {
                nextLetterType = LetterType.Vowel;
            }
            if (nextLetterType == LetterType.Other)
            {
                var lastLetterType = IndexLetterType(letters[letterLength - 1]);
                var secondLastLetterType = IndexLetterType(letters[letterLength - 2]);

                if (lastLetterType == LetterType.ConsonantExtension)
                {
                    nextLetterType = LetterType.Vowel;
                }
                else
                {
                    if (lastLetterType == LetterType.Constant)
                    {
                        nextLetterType = LetterType.Constant;
                        if (secondLastLetterType == LetterType.Constant)
                        {
                            nextLetterType = LetterType.Vowel;
                        }
                    }
                    else
                    {
                        nextLetterType = LetterType.Vowel;
                        if (secondLastLetterType == LetterType.Constant)
                        {
                            nextLetterType = LetterType.Constant;
                        }
                    }
                }
            }
            return nextLetterType;
        }

        public LetterType IndexLetterType(Letter letter)
        {
            var letterType = LetterType.Other;
            var lettervalue = letter.Type;
            switch (lettervalue)
            {
                case ConstantKeyWord:
                    letterType = LetterType.Constant;
                    break;
                case ConstantExtensionKeyWord:
                    letterType = LetterType.ConsonantExtension;
                    break;
                case VowelConstantKeyWord:
                case VowelCarrierConstantKeyWord:
                case JoinConstantKeyWord:
                    letterType = LetterType.Vowel;
                    break;
            }
            return letterType;
        }

        public Letter GetRandonLetterFromSource(List<Letter> letterSource)
        {
            var length = letterSource.Count;
            int index = _random.Next(0, length);
            return letterSource[index];
        }

        public Letter GetNextRandomLetterType(LetterType letterType)
        {
            Letter selectedLetter = null;
            List<Letter> letterSource = null;
            switch (letterType)
            {
                case LetterType.Constant:
                    letterSource = ConstantSource;
                    break;
                case LetterType.Vowel:
                    letterSource = VowelSource;
                    break;
                case LetterType.ConsonantExtension:
                    letterSource = ConstantExtensionSource;
                    break;
            }

            if (letterSource != null && letterSource.Count > 0)
            {
                selectedLetter = GetRandonLetterFromSource(letterSource);
            }

            return selectedLetter;
        }
    }
}
