using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using LetterTranslation.dto;
using Logging;

namespace LetterTranslation
{
    public interface ITranslationService
    {
        List<Letter> TranslatePunjabi(string word);
        string TranslatePunjabiEnglish(string word);
        string TranslatePunjabiEnglishEquivalent(string word);
        TranslationResultSet TranslatePunjabiSet(string punjabi);
    }

    public class TranslationService : ITranslationService
    {
        private Letter _muktaaLetter;
        public ILetterService LetterService { get; set; }
        public ITranslator Translator { get; set; }
        public ILog Log { get; set; }

        private void InitialData()
        {
            _muktaaLetter = LetterService.GetLettersByOrderIndex(42);
            if (_muktaaLetter == null)
            {
                var message = "Missing muktta letter in data source.";
                Log.Error(message);
                throw new InvalidDataException(message);
            }
            Log.Info("Muktta found.");
        }

        public List<Letter> TranslatePunjabi(string word)
        {
            Log.Trace("DirectTranslatePunjabi", word);

            if (_muktaaLetter == null)
                InitialData();
            
            var originalLength = word.Length;
            var letters = word.ToCharArray();
            List<Letter> lstTranslationLetter = new List<Letter>();
            var numberOfConstants = lstTranslationLetter.Count(prp => prp.Type == "consonant" || prp.Type == "extension letter");
            //var numberOfConstants = lstTranslationLetter.Count(prp => prp.Type == "consonant");
            for (var iloop=0; iloop < originalLength; iloop++)
            {
                var letter = letters[iloop];
                var isDoubleCharater = Translator.IsCharaterDouble(letter);

                Log.Info("letter", iloop.ToString());
                Log.Info("isDoubleCharater", isDoubleCharater.ToString());

                if (isDoubleCharater && ((iloop + 1) < originalLength))
                    letter = letters[++iloop];

                var foundTranslation = LetterService.GetLettersByPunjabiLetter(letter.ToString()) ?? Translator.CreateTemplateLetter(letter.ToString());
                Log.Info("foundTranslation", foundTranslation.English);
                bool lastLetter = ((originalLength - 1) == iloop);
                if (Translator.AddMuktaa(lstTranslationLetter, foundTranslation, originalLength, lastLetter))
                {
                    Log.Info("AddMuktaa");
                    lstTranslationLetter.Add(_muktaaLetter);
                }

                if (isDoubleCharater)
                    lstTranslationLetter.Add(foundTranslation);

                lstTranslationLetter.Add(foundTranslation);
            }
            return lstTranslationLetter;
        }

        public string TranslatePunjabiEnglish(string word)
        {
            var listLetter = TranslatePunjabi(word);
            var wordTranslation = listLetter.Select(prp => prp.English).ToList();
            return String.Join(string.Empty, wordTranslation);
        }

        public string TranslatePunjabiEnglishEquivalent(string word)
        {
            var listLetter = TranslatePunjabi(word);
            var wordTranslation = listLetter.Select(prp => prp.EnglishEquivalent).ToList();
            return String.Join(string.Empty, wordTranslation);
        }

        public TranslationResultSet TranslatePunjabiSet(string punjabi)
        {
            var translationResultSet = new TranslationResultSet {Punjabi = punjabi};
            var listResult = TranslatePunjabi(punjabi);

            var wordTranslation = listResult.Select(prp => prp.EnglishEquivalent).ToList();
            var wordTranslationEq = listResult.Select(prp => prp.English).ToList();

            translationResultSet.English = String.Join(string.Empty, wordTranslation);
            translationResultSet.EquivalentEnglish = String.Join(string.Empty, wordTranslationEq);

            return translationResultSet;
        }
    }
}
