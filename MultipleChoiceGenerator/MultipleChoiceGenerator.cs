using System;
using System.Collections.Generic;
using System.Linq;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace multipleChoiceGenerator
{
    public interface IMultipleChoiceGenerator<T>
    {
        IItemSelection ItemSelection { get; set; }
        Logging.ILog Logger { get; set; }
        int NoOfOptions { get; set; }
        Questions Questions { get; set; }
        List<T> Source { get; set; }
        List<T> WildCardSource { get; set; }
        IExtractAnswer<T> ExtractAnswer { get; set; }
        IExtractQuestion<T> ExtractQuestion { get; set; }
        void GenerateQuestions(string title, string description);
    }

    public class MultipleChoiceGenerator<T> : IMultipleChoiceGenerator<T>
    {
        public IItemSelection ItemSelection { get; set; }
        public Questions Questions { get; set; }
        public List<T> SelectSource { get; set; }

        public Logging.ILog Logger { get; set; }

        public enum QuestionMode
        {
            SingleAnwser,
            MultipleAnser
        }

        public int NoOfOptions { get; set; }
        public List<T> Source { get; set; }
        public List<T> WildCardSource { get; set; }

        public IExtractAnswer<T> ExtractAnswer { get; set; }
        public IExtractQuestion<T> ExtractQuestion { get; set; }

        public void GenerateQuestions(string title, string description)
        {
            var msg = $"GenerateQuestions title : '{title}', description : {description}";
            Logger.Trace(msg);
            SelectSource = new List<T>();
            SelectSource.AddRange(Source);
            if (WildCardSource != null && WildCardSource.Count > 0)
            {
                SelectSource.AddRange(WildCardSource);
            }
            Questions = new Questions
            {
                Title = title,
                Description = description
            };

            GetQuestion();
            SetOptionLabelsAndCorrectFlags();
        }

        public void GetQuestion()
        {
            var logmsg = "GetQuestion";
            try
            {
                Logger.Trace(logmsg);
                if (ExtractQuestion == null)
                {
                    Logger.Debug("ExtractQuestion not defined.");
                    return;
                }
                var loopCounter = 0;
                Questions.ListQuestion = new List<Question>();

                foreach (var item in Source)
                {
                    var question = new Question
                    {
                        Index = loopCounter,
                        LayoutQuestion = ExtractQuestion.GenerateQuestion(item),
                        ListAnwsers = GenerateSingleOptionAnwserData(loopCounter)
                    };
                    Questions.ListQuestion.Add(question);
                    loopCounter++;
                }

                var iItemSelection = new ItemSelection();
                Questions.ListQuestion = iItemSelection.Shuffle(Questions.ListQuestion);
                
            }
            catch (Exception ex)
            {
                Logger.Error(ex, logmsg);
                throw new Exception(logmsg, ex);
            }
        }

        public List<AnswerData> GenerateSingleOptionAnwserData(int excludeIndex)
        {
            var logMsg = $"GenerateSingleOptionAnwserData excludeIndex: {excludeIndex.ToString()}";
            try
            {
                Logger.Trace(logMsg);
                if (ItemSelection == null)
                {
                    Logger.Debug("ItemSelection not defined.");
                    return null;
                }

                var listSelectionIndex = ItemSelection.CreateSelection(NoOfOptions - 1, SelectSource.Count, excludeIndex);
                listSelectionIndex.Add(excludeIndex);
                var listRandom = ItemSelection.Shuffle(listSelectionIndex);
                return listRandom.Select(GenerateAnswerViaIndex).ToList();

            }
            catch (Exception ex)
            {
                Logger.Error(ex, logMsg);
                throw new Exception(logMsg, ex);
            }
        }

        public AnswerData GenerateAnswerViaIndex(int selectionIndex)
        {
            var answer = SelectSource[selectionIndex];
            if (ExtractAnswer == null)
            {
                Logger.Debug("ExtractAnswer not defined.");
                return null;
            }

            var answerData = new AnswerData
            {
                Index = selectionIndex,
                ListLayout = ExtractAnswer.GenerateAnswer(answer)
            };
            return answerData;

        }

        public void SetOptionLabelsAndCorrectFlags()
        {
            var logmsg = "SetOptionLabelsAndCorrectFlags";
            try
            {
                Logger.Trace(logmsg);
                if (ItemSelection == null)
                {
                    Logger.Debug("ItemSelection not defined.");
                    return;
                }
                var questionIndex = 0;
                if (Questions != null && Questions.ListQuestion.Any())
                {
                    Questions.NoOfQuestions = Questions.ListQuestion.Count;
                    Questions.QuestionsAnwsered = 0;
                    foreach (var question in Questions.ListQuestion)
                    {
                        question.SelectedAnwser = string.Empty;
                        question.CorrectAnwser = string.Empty;
                        var correctIndex = question.Index;
                        var loopAnwser = 0;
                        foreach (var anwser in question.ListAnwsers)
                        {
                            anwser.OptionLabel = ItemSelection.CovertIntToString(loopAnwser);
                            if (anwser.Index == correctIndex)
                            {
                                question.CorrectAnwser += anwser.OptionLabel;
                                anwser.CorrectOption = true;
                            }
                            loopAnwser++;
                        }
                        question.Index = questionIndex++;
                    }
                }
                else
                {
                    Logger.Debug("Questions not defined.");
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex, logmsg);
                throw new Exception(logmsg, ex);
            }
        }
    }
}