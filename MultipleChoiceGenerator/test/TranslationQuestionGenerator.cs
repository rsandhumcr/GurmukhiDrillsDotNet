using System.Collections.Generic;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace multipleChoiceGenerator.test
{
    public class TranslationQuestionGenerator : IExtractQuestion<TranslationItem>
    {
        public List<LayoutContent> GenerateQuestion(TranslationItem data)
        {
            var listLayoutContent = new List<LayoutContent>();
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("Punjabi", data.Punjabi));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English", data.English));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English Equivalent", data.EnglishEquivalent));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Audio File", data.AudioPathFileName));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddImageContent("Audio File", data.ImagePathFileName, false));
            return listLayoutContent;
        }
    }
}
