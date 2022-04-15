using System;
using System.Collections.Generic;
using System.Linq;
using LetterTranslation.dto;

namespace LetterTranslation
{
    public interface ITranslator
    {
        bool AddMuktaa(List<Letter> lstTranslationLetter, Letter currentLetter, int originalWordLength, bool lastLetter);
        bool IsCharaterDouble(Char charletter);
        Letter CreateTemplateLetter(string letter);
    }

    public class Translator : ITranslator
    {
        private const string ConsonantLetter = "consonant";
        private const string ConsonantExtensionLetter = "extension letter";

        public bool IsCharaterDouble(Char charletter)
        {
            //return (charletter == '\u0A3C' || charletter == '\u0A4B');
            return (charletter == '\u0A3C' || charletter == 'ੱ');
        }

        public bool AddMuktaa(List<Letter> lstTranslationLetter, Letter currentLetter, int originalWordLength, bool islastLetter)
        {
            var addMuktaa = false;
            if (lstTranslationLetter.Any())
            {
                var previousTranslationLength = lstTranslationLetter.Count;
                var lastLetter = lstTranslationLetter[previousTranslationLength - 1];

                var isLastLetterConsonant = IsConsonantLetter(lastLetter) || IsConsonantExtensionLetter(lastLetter);
                var isLastLetterConsonantExtension = IsExtensionSymbol(lastLetter);
                var isCurrentLetterConsonant = IsConsonantLetter(currentLetter);
                var isCurrentLetterConsonantExtension = IsExtensionSymbol(currentLetter);

                if (!isLastLetterConsonantExtension)
                { 
                    if (previousTranslationLength == 1 || originalWordLength == 3)
                    {
                        addMuktaa = (isLastLetterConsonant && isCurrentLetterConsonant);
                    }
                    else
                    {
                        var secondToLastLetter = lstTranslationLetter[previousTranslationLength - 2];
                        var isSecondToLastLetterConsonant = IsConsonantLetter(secondToLastLetter);

                        var numberOfConstants = lstTranslationLetter.Count(prp => prp.Type == "consonant");

                        if (islastLetter && numberOfConstants == 2)
                        {
                            addMuktaa = (isLastLetterConsonant && isCurrentLetterConsonant);
                        }
                        else
                        {
                            addMuktaa = (isSecondToLastLetterConsonant && isLastLetterConsonant &&
                                         isCurrentLetterConsonant);
                        }
                    }
                }
            }
            return addMuktaa;
        }

        private bool IsConsonantLetter(Letter letter)
        {
            return letter.Type.Equals(ConsonantLetter);
        }

        private bool IsConsonantExtensionLetter(Letter letter)
        {
            return letter.Type.Equals(ConsonantExtensionLetter);
        }

        private bool IsExtensionSymbol(Letter letter)
        {
            return letter.Order == 68;
        }

        public Letter CreateTemplateLetter(string letter)
        {
            return new Letter { English = letter, Punjabi = letter, EnglishEquivalent = letter, Type = "Not Found" };
        }
    }
}
