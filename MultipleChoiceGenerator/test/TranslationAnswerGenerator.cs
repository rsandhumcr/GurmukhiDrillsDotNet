using System.Collections.Generic;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace multipleChoiceGenerator.test
{
    public class TranslationAnswerGenerator : IExtractAnswer<TranslationItem>
    {
        public List<LayoutContent> GenerateAnswer(TranslationItem data)
        {
            var listLayoutContent = new List<LayoutContent>();
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English", data.English));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English Equivalent", data.EnglishEquivalent));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Audio File", data.AudioPathFileName));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddImageContent("Audio File", data.ImagePathFileName, false));
            return listLayoutContent;
        }
    }
}
