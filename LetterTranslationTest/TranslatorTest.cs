using System.Collections.Generic;
using LetterTranslation;
using LetterTranslation.dto;
using Xunit;

namespace LetterTranslationTest
{
    public class TranslatorTest
    {
        private const string ConsonantLetter = "consonant";
        private Letter _consonantLetter;
        private Letter _vowelLetter;

        public TranslatorTest()
        {
            InitialTest();
        }
        
        public void InitialTest()
        {
            _consonantLetter = new Letter {Type = ConsonantLetter, English = "C", Punjabi = "1"};
            _vowelLetter = new Letter {Type = "Vowel", English = "e", Punjabi = "2"};
        }

        [Fact]
        public void IsCharaterDouble_a_False()
        {
            //Arrange
            var translator = new Translator();
            //Act
            var isdoubleResult = translator.IsCharaterDouble('a');
            //Assert
            Assert.False(isdoubleResult);
        }

        [Fact]
        public void IsCharaterDouble_0A3C_True()
        {
            //Arrange
            var translator = new Translator();
            //Act
            var isdoubleResult = translator.IsCharaterDouble('\u0A3C');
            //Assert
            Assert.True(isdoubleResult);
        }

        [Fact]
        public void IsCharaterDouble_Nukta_True()
        {
            //Arrange
            var translator = new Translator();
            //Act
            var isdoubleResult = translator.IsCharaterDouble('ੱ');
            //Assert
            Assert.True(isdoubleResult);
        }

        [Fact]
        public void AddMuktaa_EmptyWordAddConsonant_False()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter>();
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 1, false);
            //Assert
            Assert.False(addMuktaaResult);
        }

        [Fact]
        public void AddMuktaa_WordConsonantAddConsonant_True()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter> {_consonantLetter};
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 5, false);
            //Assert
            Assert.True(addMuktaaResult);
        }

        [Fact]
        public void AddMuktaa_WordConsonantVowelAddConsonant_False()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter> {_consonantLetter, _vowelLetter};
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 5, false);
            //Assert
            Assert.False(addMuktaaResult);
        }

        [Fact]
        public void AddMuktaa_WordConsonantConsonantAddConsonant_True()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter> {_consonantLetter, _consonantLetter};
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 5, false);
            //Assert
            Assert.True(addMuktaaResult);
        }

        [Fact]
        public void AddMuktaa_WordConsonantVowelConsonantLengthThreeAddConsonant_True()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter> {_consonantLetter, _vowelLetter, _consonantLetter};
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 3, false);
            //Assert
            Assert.True(addMuktaaResult);
        }

        [Fact]
        public void AddMuktaa_WordConsonantVowelConsonantLengthFiveAddConsonant_False()
        {
            //Arrange
            var translator = new Translator();
            var listWord = new List<Letter> {_consonantLetter, _vowelLetter, _consonantLetter};
            //Act
            var addMuktaaResult = translator.AddMuktaa(listWord, _consonantLetter, 5, false);
            //Assert
            Assert.False(addMuktaaResult);
        }
    }
}