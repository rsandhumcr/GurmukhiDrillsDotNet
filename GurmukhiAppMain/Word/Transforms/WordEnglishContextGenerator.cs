using System.Collections.Generic;
using GurmukhiAppMain.Word.Dto;
using multipleChoiceGenerator.Dto;
using multipleChoiceGenerator.structure;

namespace GurmukhiAppMain.Word.Transforms
{
    public class WordEnglishContextGenerator : IExtractAnswer<WordTransationItem>, IExtractQuestion<WordTransationItem>
    {
        private readonly int _difficutlylevel;
        private readonly bool _showImage;

        public WordEnglishContextGenerator(int difficutlylevel, bool showImage)
        {
            _showImage = showImage;
            _difficutlylevel = difficutlylevel;
        }
        public List<LayoutContent> GenerateAnswer(WordTransationItem data)
        {
            return EnglishContext.GenerateContext(_difficutlylevel, _showImage, data);
        }

        public List<LayoutContent> GenerateQuestion(WordTransationItem data)
        {
            return PunajbiContext.GenerateContext(_difficutlylevel, data); ;
        }
    }
}
