using LetterTranslation;
using System.Linq;
using Xunit;

namespace LetterTranslationTest
{
    public class JsonObjectLoaderTest
    {
        [Fact]
        public void LoadJsonFile_FirstRecordIsAsExpected_Success()
        {
            //Arrange
            var jsonObjectLoader = new JsonObjectLoader();
            //var data = jsonObjectLoader.LoadJsonFile("data\\data.json");
            var data = jsonObjectLoader.LoadJsonFileAsync("data\\data.json").Result;
            //Act
            var item = data.Letters.FirstOrDefault();
            //Assert
            Assert.Equal(0, item.Order);
            Assert.Equal("Oorhaa", item.Name);
            Assert.Equal("ੳ", item.Punjabi);
            Assert.Equal("o", item.English);
            Assert.Equal("oo", item.EnglishEquivalent);
            Assert.Equal("ō", item.Iast);
            Assert.Equal(0, item.RowLocation);
            Assert.Equal(0, item.ColumnLocation);
            Assert.Equal("vowel", item.Type);
            Assert.Equal(true, item.After);
            Assert.Equal(string.Empty, item.Description);
            Assert.Equal("01_Oorhaa.jpg", item.Media.Image);
            Assert.Equal("01_Oorhaa.mp3", item.Media.NameFile);
            Assert.Equal(string.Empty, item.Media.Pronouncefile);
        }
    }
}
