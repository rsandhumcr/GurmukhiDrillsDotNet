using System.Collections.Generic;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Letter.Transforms
{
    public class LetterAnswerGeneratorEnglish : IExtractAnswer<ViewModel.Letter>
    {
        public List<LayoutContent> GenerateAnswer(ViewModel.Letter data)
        {
            var listLayoutContent = new List<LayoutContent>();
            //LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddImageContent("Image File", data.Image, false));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English", $"{data.English} ({data.EnglishEquivalent})"));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("Name", data.Name));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Name", data.NameFile));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Sound", data.Pronouncefile));
            return listLayoutContent;
        }
    }
}
