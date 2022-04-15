using AutoMapper;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class TypeTypeConverterApiToLetterData : ITypeConverter<LetterTranslation.dto.Letter, Letter.ViewModel.Letter>
    {

        public Letter.ViewModel.Letter Convert(LetterTranslation.dto.Letter source, Letter.ViewModel.Letter destination, ResolutionContext context)
        {
            if (source == null)
                return null;

            var target = new Letter.ViewModel.Letter
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
                Description = source.Description
            };
            if (source.Media != null)
            {
                target.Image = source.Media.Image;
                target.Image1 = source.Media.Image1;
                target.NameFile = source.Media.NameFile;
                target.Pronouncefile = source.Media.Pronouncefile;
            }

            return target;
        }

    }
}