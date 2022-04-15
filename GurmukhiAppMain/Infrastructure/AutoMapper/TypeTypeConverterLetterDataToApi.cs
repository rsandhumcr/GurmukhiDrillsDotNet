using AutoMapper;

namespace GurmukhiAppEngine.Infrastrure.Automapper
{

    //TypeTypeConverterLetterDataToApi
    public class TypeTypeConverterLetterDataToApi : ITypeConverter<GurmukhiAppMain.Letter.ViewModel.Letter, LetterTranslation.dto.Letter>
    {
        public LetterTranslation.dto.Letter Convert(GurmukhiAppMain.Letter.ViewModel.Letter source, LetterTranslation.dto.Letter destination, ResolutionContext context)
        {
            if (source == null)
                return null;

            var target = new LetterTranslation.dto.Letter
            {
                Order = source.Order,
                Name = source.Name,
                Punjabi = source.Punjabi,
                English = source.English,
                EnglishEquivalent = source.EnglishEquivalent,
                Iast = source.Iast,
                RowLocation = source.RowLocation,
                ColumnLocation = source.ColumnLocation,
                Type = source.Type,
                After = source.After,
                Description = source.Description,
                Media = new LetterTranslation.dto.Media
                {
                    Image = source.Image1,
                    Image1 = source.Image1,
                    NameFile = source.NameFile,
                    Pronouncefile = source.Pronouncefile
                }
            };
            return target;
        }

    }
}