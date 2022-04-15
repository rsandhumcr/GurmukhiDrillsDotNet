using System.Collections.Generic;
using GurmukhiAppMain.Word.Dto;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Word.Transforms
{
    public class EnglishContext
    {
        public static List<LayoutContent> GenerateContext(int difficutlylevel, bool showImage, WordTransationItem data)
        {
            var listLayoutContent = new List<LayoutContent>();
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("English", data.English));
            if (showImage)
                LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddImageContent("Image", data.ImageFileName, true));
            if (difficutlylevel < 2)
                LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Sound", $"{data.AudioFileName}"));
            return listLayoutContent;
        }
    }
}
