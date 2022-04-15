using System;
using System.Collections.Generic;
using LetterTranslation;
using LetterTranslation.dto;
using Logging;
using Moq;
using Xunit;

namespace LetterTranslationTest
{
    public class LetterEngineTest
    {
        private Alphabet _alphabet;
        private Mock<IJsonObjectLoader> _jsonObjectLoader;
        private Mock<ILog> _log;
        private string _dataFileName = "data\\data.json";

        public LetterEngineTest()
        {
            InitialTest();
        }
        
        public void InitialTest()
        {
            _log = new Mock<ILog>();
            _log.Setup(mtd => mtd.Info(It.IsAny<string>()));
            _log.Setup(mtd => mtd.Error(It.IsAny<string>()));
            _log.Setup(mtd => mtd.Fatal(It.IsAny<string>()));

            _jsonObjectLoader = new Mock<IJsonObjectLoader>();
            _alphabet = new Alphabet
            {
                Letters = new List<Letter>
                {
                    new Letter
                    {
                        Order = 0,
                        Name = "Zero",
                        RowLocation = 0,
                        ColumnLocation = 0,
                        Punjabi = "ap",
                        English = "ae",
                        EnglishEquivalent = "aee"
                    },
                    new Letter
                    {
                        Order = 1,
                        Name = "One",
                        RowLocation = 0,
                        ColumnLocation = 1,
                        Punjabi = "bp",
                        English = "be",
                        EnglishEquivalent = "bee"
                    },
                    new Letter
                    {
                        Order = 2,
                        Name = "Two",
                        RowLocation = 0,
                        ColumnLocation = 2,
                        Punjabi = "cp",
                        English = "ce",
                        EnglishEquivalent = "cee"
                    },
                    new Letter
                    {
                        Order = 3,
                        Name = "Three",
                        RowLocation = 1,
                        ColumnLocation = 0,
                        Punjabi = "dp",
                        English = "de",
                        EnglishEquivalent = "dee"
                    },
                    new Letter
                    {
                        Order = 4,
                        Name = "Four",
                        RowLocation = 1,
                        ColumnLocation = 1,
                        Punjabi = "ep",
                        English = "ee",
                        EnglishEquivalent = "eee"
                    },
                    new Letter
                    {
                        Order = 5,
                        Name = "Five",
                        RowLocation = 1,
                        ColumnLocation = 2,
                        Punjabi = "fp",
                        English = "fe",
                        EnglishEquivalent = "fee"
                    },
                    new Letter
                    {
                        Order = 6,
                        Name = "Six",
                        RowLocation = 2,
                        ColumnLocation = 0,
                        Punjabi = "gp",
                        English = "ge",
                        EnglishEquivalent = "gee"
                    },
                    new Letter
                    {
                        Order = 7,
                        Name = "Seven",
                        RowLocation = 2,
                        ColumnLocation = 1,
                        Punjabi = "hp",
                        English = "he",
                        EnglishEquivalent = "hee"
                    },
                    new Letter
                    {
                        Order = 8,
                        Name = "Eight",
                        RowLocation = 2,
                        ColumnLocation = 2,
                        Punjabi = "ip",
                        English = "ie",
                        EnglishEquivalent = "iee"
                    },
                    new Letter
                    {
                        Order = 9,
                        Name = "Nine",
                        RowLocation = 3,
                        ColumnLocation = 0,
                        Punjabi = "jp",
                        English = "je",
                        EnglishEquivalent = "jee"
                    }
                }
            };
            _jsonObjectLoader.Setup(mtd => mtd.LoadJsonFile(It.IsAny<string>())).Returns(_alphabet);
        }

        [Fact]
        public void InitialEngine_SetupIsCorrect_Success()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                DataFile = "data.json",
                JsonObjectLoader = _jsonObjectLoader.Object
            };
            //Act
            translationEngine.InitialEngine();
            //Assert
            Assert.Equal(_alphabet, translationEngine.Alphabet);
        }

        //[Fact]
        public void InitialEngine_MissingLogger_Exception()
        {
            //Arrage
            Exception ex=null;
            var translationEngine = new LetterService
            {
                DataFile = _dataFileName,
                JsonObjectLoader = _jsonObjectLoader.Object,
                //Logger = _log.Object
            };
            //Act
            translationEngine.InitialEngine();

            //Assert
            ex = Record.Exception(() => translationEngine.Alphabet);
            Assert.IsType<MissingFieldException>(ex);
            Assert.Equal("Logger not assigned", ex.Message);
            
        }

        [Fact]
        public void InitialEngine_MissingDataFilePath_LogError()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                //DataFile = _dataFileName,
                JsonObjectLoader = _jsonObjectLoader.Object
            };
            //Act
            translationEngine.InitialEngine();
            //Assert
            _log.Verify(mtd => mtd.Error(It.Is<string>(item => item.Equals("'DataFile' property not set."))));
            _log.Verify(mtd => mtd.Error(It.Is<string>(item => item.Equals("Setup validation has failed."))));
        }

        [Fact]
        public void GetLettersByOrderIndexes_SmallData_ReturnValidData()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                Alphabet = _alphabet
            };
            var indexes = new[] {1, 2, 4};
            //Act
            var filteredLetters = translationEngine.GetLettersByOrderIndexes(indexes);
            //Assert
            Assert.Equal(indexes.Length, filteredLetters.Count);
            Assert.Equal("One", filteredLetters[0].Name);
            Assert.Equal("Two", filteredLetters[1].Name);
            Assert.Equal("Four", filteredLetters[2].Name);
            _log.Verify(mtd => mtd.Trace(It.Is<string>(item => item.Equals("GetLettersByOrderIndexes : 1,2,4"))));
        }

        [Fact]
        public void GetLettersByRowIndexes_SmallData_ReturnValidData()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                Alphabet = _alphabet
            };
            var indexes = new[] {2};
            //Act
            var filteredLetters = translationEngine.GetLettersByRowIndexes(indexes);
            //Assert
            Assert.Equal(3, filteredLetters.Count);
            Assert.Equal("Six", filteredLetters[0].Name);
            Assert.Equal("Seven", filteredLetters[1].Name);
            Assert.Equal("Eight", filteredLetters[2].Name);
            _log.Verify(mtd => mtd.Trace(It.Is<string>(item => item.Equals("GetLettersByRowIndexes : 2"))));
        }

        [Fact]
        public void GetLettersByColumnIndexes_SmallData_ReturnValidData()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                Alphabet = _alphabet
            };
            var indexes = new[] {1};
            //Act
            var filteredLetters = translationEngine.GetLettersByColumnIndexes(indexes);
            //Assert
            Assert.Equal(3, filteredLetters.Count);
            Assert.Equal("One", filteredLetters[0].Name);
            Assert.Equal("Four", filteredLetters[1].Name);
            Assert.Equal("Seven", filteredLetters[2].Name);
            _log.Verify(mtd => mtd.Trace(It.Is<string>(item => item.Equals("GetLettersByColumnIndexes : 1"))));
        }

        [Fact]
        public void GetLettersByGetLettersByEnglishLetter_SmallData_ReturnValidData()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                Alphabet = _alphabet
            };
            //Act
            var foundLetter = translationEngine.GetLettersByEnglishLetter("de");
            //Assert
            Assert.Equal("dp", foundLetter.Punjabi);
            _log.Verify(mtd => mtd.Trace(It.Is<string>(item => item.Equals("GetLettersByEnglishLetter : de"))));
        }

        [Fact]
        public void GetLettersByPunjabiLetter_SmallData_ReturnValidData()
        {
            //Arrage
            var translationEngine = new LetterService
            {
                Logger = _log.Object,
                Alphabet = _alphabet
            };
            //Act
            var foundLetter = translationEngine.GetLettersByPunjabiLetter("ep");
            //Assert
            Assert.Equal("ee", foundLetter.English);
            _log.Verify(mtd => mtd.Trace(It.Is<string>(item => item.Equals("GetLettersByPunjabiLetter : ep"))));
        }
    }
}