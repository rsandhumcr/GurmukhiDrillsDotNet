using System.Collections.Generic;
using GurmukhiAppMain.Word.Dto;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Word.Transforms
{
    public class PunajbiContext
    {
        public static List<LayoutContent> GenerateContext(int difficutlylevel, WordTransationItem data)
        {
            var listLayoutContent = new List<LayoutContent>();
            LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelLargerTextContent("Punjabi", data.Punjabi));
            if (difficutlylevel < 3)
            {
                LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("Translation", data.Character));
                LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddLabelTextContent("Equivalent", data.Equivalent));
            }
            if (difficutlylevel < 3)
                LayoutContentHelper.AddToListLayoutContent(listLayoutContent, LayoutContentHelper.AddAudioContent("Sound", $"{data.AudioFileName}"));
            return listLayoutContent;
        }
    }
}
