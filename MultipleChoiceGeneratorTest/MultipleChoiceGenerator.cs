using System.Collections.Generic;
using Logging;
using multipleChoiceGenerator;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;
using multipleChoiceGenerator.test;
using Xunit;
using Moq;

namespace MultipleChoiceGeneratorTest
{
    
    public class MultipleChoiceGenerator
    {
        private int _noOfOption;
        private List<TranslationItem> _listSelection;
        private List<TranslationItem> _listWildCards;
        private List<LayoutContent> _listLayoutContent;
        private List<Question> _listQuestion;
        private Mock<IItemSelection> _itemSelection;
        private Mock<IExtractQuestion<TranslationItem>> _questionExtractor;
        private Mock<IExtractAnswer<TranslationItem>> _anwerExtractor;

        public MultipleChoiceGenerator()
        {
            InitialTest();
        }
        
        public void InitialTest()
        {
            _listSelection = new List<TranslationItem>{
            new TranslationItem { English = "1", EnglishEquivalent = "1e", AudioPathFileName = "1A", ImagePathFileName = "1I" },
            new TranslationItem { English = "2", EnglishEquivalent = "2e", AudioPathFileName = "2A", ImagePathFileName = "2I" },
            new TranslationItem { English = "3", EnglishEquivalent = "3e", AudioPathFileName = "3A", ImagePathFileName = "3I" },
            new TranslationItem { English = "4", EnglishEquivalent = "4e", AudioPathFileName = "4A", ImagePathFileName = "4I" },
            new TranslationItem { English = "5", EnglishEquivalent = "5e", AudioPathFileName = "5A", ImagePathFileName = "5I" }};
            
            _listWildCards = new List<TranslationItem>{
              new TranslationItem { English = "a", EnglishEquivalent = "ae", AudioPathFileName = "aA", ImagePathFileName = "aI" },
              new TranslationItem { English = "b", EnglishEquivalent = "be", AudioPathFileName = "bA", ImagePathFileName = "bI" },
              new TranslationItem { English = "c", EnglishEquivalent = "ce", AudioPathFileName = "cA", ImagePathFileName = "cI" },
              new TranslationItem { English = "d", EnglishEquivalent = "de", AudioPathFileName = "dA", ImagePathFileName = "eI" },
              new TranslationItem { English = "e", EnglishEquivalent = "ee", AudioPathFileName = "eA", ImagePathFileName = "eI" }
            };
        _listQuestion = new List<Question>
            {
                new Question {CorrectAnwser = "CorrectAnwser01", SelectedAnwser = "SelectedAnwser01"},
                new Question {CorrectAnwser = "CorrectAnwser02", SelectedAnwser = "SelectedAnwser02"},
                new Question {CorrectAnwser = "CorrectAnwser03", SelectedAnwser = "SelectedAnwser03"}
            };

            _itemSelection = new Mock<IItemSelection>();
            _itemSelection.Setup(mtd => mtd.Shuffle(It.IsAny<List<Question>>())).Returns(_listQuestion);
            _itemSelection.Setup(mtd => mtd.Shuffle(It.IsAny<List<int>>())).Returns(new List<int> { 0 });
            _itemSelection.Setup(mtd => mtd.CreateSelection(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>())).Returns(new List<int> { 0 });
            _questionExtractor = new Mock<IExtractQuestion<TranslationItem>>();

            _listLayoutContent = new List<LayoutContent>
            {
                new LayoutContent {Content = "Content01", ContentType = ContentTypes.TextLabel, Label = "Label01"},
                new LayoutContent {Content = "Content02", ContentType = ContentTypes.TextLabel, Label = "Label02"},
                new LayoutContent {Content = "Content03", ContentType = ContentTypes.TextLabel, Label = "Label03"},
                new LayoutContent {Content = "Content04", ContentType = ContentTypes.TextLabel, Label = "Label04"}
            };
            _questionExtractor.Setup(mtd => mtd.GenerateQuestion(It.IsAny<TranslationItem>())).Returns(_listLayoutContent);

            _anwerExtractor = new Mock<IExtractAnswer<TranslationItem>>();
            _anwerExtractor.Setup(mtd => mtd.GenerateAnswer(It.IsAny<TranslationItem>())).Returns(_listLayoutContent);

            _noOfOption = 4;
        }

        [Fact]
        public void GenerateQuestions_WithSourceOnly_CreateExpectedQuestionObject()
        {
            //Arrange
            var title = "Test 101";
            var description = "This is my test";
            var multipleChoiceGenerator = new MultipleChoiceGenerator<TranslationItem>
            {
                Logger = new LogNullObject(),
                NoOfOptions = _noOfOption,
                Source = _listSelection
            };


            //Act
            multipleChoiceGenerator.GenerateQuestions(title, description);
            //Assert
            Assert.Equal(_listSelection.Count, multipleChoiceGenerator.SelectSource.Count);
            Assert.Equal(title, multipleChoiceGenerator.Questions.Title);
            Assert.Equal(description, multipleChoiceGenerator.Questions.Description);
        }


        [Fact]
        public void GenerateQuestions_WithSourceAndWildCards_CreateExpectedQuestionObject()
        {
            //Arrange
            var title = "Test 102";
            var description = "This is my test2";
            var multipleChoiceGenerator = new MultipleChoiceGenerator<TranslationItem>
            {
                Logger = new LogNullObject(),
                NoOfOptions = _noOfOption,
                Source = _listSelection,
                WildCardSource = _listWildCards
            };


            //Act
            multipleChoiceGenerator.GenerateQuestions(title, description);
            //Assert
            Assert.Equal(_listSelection.Count + _listWildCards.Count, multipleChoiceGenerator.SelectSource.Count);
            Assert.Equal(title, multipleChoiceGenerator.Questions.Title);
            Assert.Equal(description, multipleChoiceGenerator.Questions.Description);
        }

        [Fact]
        public void GetQuestion_WithValidProcess_GeneratesExpectedQuestionObject()
        {
            //Arrange
            var multipleChoiceGenerator = new MultipleChoiceGenerator<TranslationItem>
            {
                Logger = new LogNullObject(),
                NoOfOptions = _noOfOption,
                SelectSource = _listSelection,
                Source = _listSelection,
                ExtractQuestion = _questionExtractor.Object,
                ExtractAnswer = _anwerExtractor.Object,
                ItemSelection = _itemSelection.Object,
                Questions = new Questions()
            };


            //Act
            multipleChoiceGenerator.GetQuestion();
            //Assert
            _itemSelection.Verify(mtd => mtd.Shuffle(It.IsAny<List<int>>()));
            _itemSelection.Verify(mtd => mtd.CreateSelection(It.Is<int>(i => i == (_noOfOption - 1)), It.IsAny<int>(), It.IsAny<int>()));
            //   Questions
            _questionExtractor.Verify(mtd => mtd.GenerateQuestion(It.IsAny<TranslationItem>()));
            Assert.Equal(_listSelection.Count, multipleChoiceGenerator.Questions.ListQuestion.Count);
            Assert.Equal(multipleChoiceGenerator.Questions.ListQuestion[0].LayoutQuestion[0].Label, _listLayoutContent[0].Label);
            //   Answers
            _anwerExtractor.Verify(mtd => mtd.GenerateAnswer(It.IsAny<TranslationItem>()));
            Assert.Equal(1, multipleChoiceGenerator.Questions.ListQuestion[0].ListAnwsers.Count);
            Assert.Equal(multipleChoiceGenerator.Questions.ListQuestion[0].LayoutQuestion[0].Label, multipleChoiceGenerator.Questions.ListQuestion[0].ListAnwsers[0].ListLayout[0].Label);
        }
    }
}