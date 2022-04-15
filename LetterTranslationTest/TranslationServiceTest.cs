using System.Collections.Generic;
using System.IO;
using LetterTranslation;
using LetterTranslation.dto;
using Logging;
using Moq;
using Xunit;

namespace LetterTranslationTest
{
    
    public class TranslationServiceTest
    {
        private const string ConsonantLetter = "consonant";
        private const string MukttaLetterString = "a";
        private const string VowelLetterString = "e";
        private const string ConstanonentLetter1String = "t";
        private const string ConstanonentLetter2String = "b";
        private const char ConstanonentLetterDouble = 'd';
        private Letter _constanonentLetter1;
        private Letter _constanonentLetter2;
        private Mock<ILetterService> _letterService;
        private Mock<ILog> _log;
        private Letter _mukttaLetter;
        private Mock<ITranslator> _translator;
        private Letter _vowelLetter;

        public TranslationServiceTest()
        {
            InitialTest();
        }
        
        public void InitialTest()
        {
            _log = new Mock<ILog>();
            _translator = new Mock<ITranslator>();
            _letterService = new Mock<ILetterService>();

            _mukttaLetter = new Letter
            {
                Name = "Muktta",
                English = MukttaLetterString,
                EnglishEquivalent = MukttaLetterString,
                Punjabi = MukttaLetterString,
                Type = "vowel"
            };
            _vowelLetter = new Letter
            {
                Name = VowelLetterString,
                English = VowelLetterString,
                EnglishEquivalent = VowelLetterString,
                Punjabi = VowelLetterString,
                Type = "vowel"
            };
            _constanonentLetter1 = new Letter
            {
                Name = ConstanonentLetter1String,
                English = ConstanonentLetter1String,
                EnglishEquivalent = ConstanonentLetter1String,
                Punjabi = ConstanonentLetter1String,
                Type = ConsonantLetter
            };
            _constanonentLetter2 = new Letter
            {
                Name = ConstanonentLetter2String,
                English = ConstanonentLetter2String,
                EnglishEquivalent = ConstanonentLetter2String,
                Punjabi = ConstanonentLetter2String,
                Type = ConsonantLetter
            };

            _translator.Setup(
                mtd =>
                    mtd.AddMuktaa(It.IsAny<List<Letter>>(), It.Is<Letter>(prp => prp.English.Equals(VowelLetterString)),
                        It.IsAny<int>(), false)).Returns(false);
            _translator.Setup(
                mtd =>
                    mtd.AddMuktaa(It.IsAny<List<Letter>>(),
                        It.Is<Letter>(prp => prp.English.Equals(ConstanonentLetter1String)), It.IsAny<int>(), false))
                .Returns(false);
            _translator.Setup(mtd =>mtd.AddMuktaa(It.IsAny<List<Letter>>(),
                        It.Is<Letter>(prp => prp.English.Equals(ConstanonentLetter2String)), It.IsAny<int>(), false))
                .Returns(true);

            _translator.Setup(mtd =>mtd.AddMuktaa(It.IsAny<List<Letter>>(),
                        It.Is<Letter>(prp => prp.English.Equals(ConstanonentLetter2String)), It.IsAny<int>(), true))
                        .Returns(true);

            _translator.Setup(mtd => mtd.IsCharaterDouble(It.Is<char>(prp => prp.Equals(ConstanonentLetterDouble))))
                .Returns(true);
            _translator.Setup(mtd => mtd.IsCharaterDouble(It.Is<char>(prp => !prp.Equals(ConstanonentLetterDouble))))
                .Returns(false);

            _letterService.Setup(mtd => mtd.GetLettersByOrderIndex(It.Is<int>(fld => fld == 42))).Returns(_mukttaLetter);
            _letterService.Setup(mtd => mtd.GetLettersByPunjabiLetter(It.Is<string>(prp => prp.Equals(ConstanonentLetter1String))))
                .Returns(_constanonentLetter1);
            _letterService.Setup(mtd => mtd.GetLettersByPunjabiLetter(It.Is<string>(prp => prp.Equals(ConstanonentLetter2String))))
                .Returns(_constanonentLetter2);
            _letterService.Setup(mtd => mtd.GetLettersByPunjabiLetter(It.Is<string>(prp => prp.Equals(VowelLetterString))))
                .Returns(_vowelLetter);
        }

        [Fact]
        public void TranslatePunjabi_TwoConstants_ReturnExpected()
        {
            //Arrange

            var translationService = new TranslationService
            {
                Log = _log.Object,
                Translator = _translator.Object,
                LetterService = _letterService.Object
            };
            var inputData = ConstanonentLetter1String + ConstanonentLetter1String;
            //Act
            var listLetter = translationService.TranslatePunjabi((inputData));
            //Assert
            Assert.Equal(2, listLetter.Count);
            Assert.Equal(ConstanonentLetter1String, listLetter[0].English);
            Assert.Equal(ConstanonentLetter1String, listLetter[1].English);
        }

        [Fact]
        public void TranslatePunjabi_TwoConstantWithAddedMuktaa_ReturnExpected()
        {
            //Arrange

            var translationService = new TranslationService
            {
                Log = _log.Object,
                Translator = _translator.Object,
                LetterService = _letterService.Object
            };
            var inputData = ConstanonentLetter1String + ConstanonentLetter2String;
            //Act
            var listLetter =
                translationService.TranslatePunjabi((inputData));
            //Assert
            Assert.Equal(3, listLetter.Count);
            Assert.Equal(ConstanonentLetter1String, listLetter[0].English);
            Assert.Equal(MukttaLetterString, listLetter[1].English);
            Assert.Equal(ConstanonentLetter2String, listLetter[2].English);
        }

        [Fact]
        public void TranslatePunjabi_TwoConstantWithDoubleLetter_ReturnExpected()
        {
            //Arrange

            var translationService = new TranslationService
            {
                Log = _log.Object,
                Translator = _translator.Object,
                LetterService = _letterService.Object
            };

            var inputData = ConstanonentLetter1String + ConstanonentLetterDouble + ConstanonentLetter2String;
            //Act
            var listLetter = translationService.TranslatePunjabi((inputData));
            //Assert
            Assert.Equal(4, listLetter.Count);
            Assert.Equal(ConstanonentLetter1String, listLetter[0].English);
            Assert.Equal(MukttaLetterString, listLetter[1].English);
            Assert.Equal(ConstanonentLetter2String, listLetter[2].English);
            Assert.Equal(ConstanonentLetter2String, listLetter[3].English);
        }

        [Fact]
        public void TranslatePunjabi_CallServices_AsExpected()
        {
            //Arrange

            var translationService = new TranslationService
            {
                Log = _log.Object,
                Translator = _translator.Object,
                LetterService = _letterService.Object
            };
            var inputData = ConstanonentLetter1String + ConstanonentLetter2String;
            //Act
            translationService.TranslatePunjabi((inputData));
            //Assert
            _letterService.Verify(mtd => mtd.GetLettersByOrderIndex(It.Is<int>(fld => fld == 42)));
            _letterService.Verify(mtd => mtd.GetLettersByPunjabiLetter(It.Is<string>(prp => prp.Equals(ConstanonentLetter1String))));
            _letterService.Verify(mtd => mtd.GetLettersByPunjabiLetter(It.Is<string>(prp => prp.Equals(ConstanonentLetter2String))));

            _translator.Verify(mtd => mtd.AddMuktaa(It.IsAny<List<Letter>>(), It.IsAny<Letter>(), It.IsAny<int>(), false));
            _translator.Verify(mtd => mtd.IsCharaterDouble(It.IsAny<char>()));
        }

        [Fact]
        public void TranslatePunjabi_CallServicesNoMuktaa_ThrowException()
        {
            //Arrange
            var translationService = new TranslationService
            {
                Log = _log.Object,
                Translator = _translator.Object
            };
            var letterService = new Mock<ILetterService>();
            letterService.Setup(mtd => mtd.GetLettersByOrderIndex(It.Is<int>(fld => fld == 42))).Returns(() => null);
            translationService.LetterService = letterService.Object;
            var inputData = ConstanonentLetter1String + ConstanonentLetter2String;
            //Act
            var excpetion = Record.Exception(()=>translationService.TranslatePunjabi((inputData)));
            //Assert
            Assert.IsType<InvalidDataException>(excpetion);
        }
    }
}