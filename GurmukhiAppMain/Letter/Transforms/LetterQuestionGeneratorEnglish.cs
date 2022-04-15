using System.Collections.Generic;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Letter.Transforms
{
    public class LetterQuestionGeneratorEnglish : IExtractQuestion<ViewModel.Letter>
    {
        public List<LayoutContent> GenerateQuestion(ViewModel.Letter data)
        {
            var listLayoutContent = new List<LayoutContent>();
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddImageContent("Image", data.Image, false));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelLargerTextContent("Punjabi", data.Punjabi));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Name", data.NameFile));
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Sound", data.Pronouncefile));
            //LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English", data.English));
            //LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English Equivalent", data.EnglishEquivalent));
            return listLayoutContent;
        }
    }
}
