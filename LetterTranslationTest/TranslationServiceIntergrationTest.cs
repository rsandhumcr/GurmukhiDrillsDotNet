using System.Threading;
using LetterTranslation;
using Logging;
using Xunit;

namespace LetterTranslationTest
{
    
    public class TranslationServiceIntergrationTest
    {
        private TranslationService _translationService;

        public TranslationServiceIntergrationTest()
        {
            InitialTest();
        }
        public void InitialTest()
        {
            var translationServiceBuilder = new TranslationServiceBuilder(new LetterSerivceBuilder()) {DefinedDataPath = "data\\data.json"};
            _translationService = translationServiceBuilder.GenerateService(new LogNullObject());
            Thread.Sleep(125);

        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_kesree()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਕੇਸਰੀ");
            //Assert
            Assert.Equal("kesree", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_chittaa()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਚਿੱਟਾ");
            //Assert
            Assert.Equal("chittaa", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_naabhee()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਨਾਭੀ");
            //Assert
            Assert.Equal("naabhee", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_bakkaree()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਬੱਕਰੀ");
            //Assert
            Assert.Equal("bakkaree", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_kachchooaa()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਕੱਛੂਆ");
            //Assert
            Assert.Equal("kachchooaa", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_jabaarhaa()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("ਜਬਾੜਾ");
            //Assert
            Assert.Equal("jabaarhaa", english);
        }

        [Fact]
        public void TranslatePunjabiEnglish_Translate_passingtest()
        {
            //Arrange
            //Act
            var english = _translationService.TranslatePunjabiEnglish("passing test");
            //Assert
            Assert.Equal("passing test", english);
        }
    }
}