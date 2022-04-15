using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppEngine.Infrastrure.Automapper
{
    // TypeTypeConverterTranslationToWordTranslationApi
    public class TypeTypeConverterTranslationToWordTranslationApi : ITypeConverter<Translation, WordTransationItem>
    {
        public WordTransationItem Convert(Translation source, WordTransationItem destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new WordTransationItem
            {
                Id = source.Id,
                AudioFileName = source.AudioFileName,
                ImageFileName = source.ImageFileName,
                Punjabi = source.Punjabi,
                English = source.English,
                Equivalent = source.Equivalent,
                Character = source.Character,
                Description = source.Description,
                OrderNumber = source.OrderNumber,
                SubCategoryId = source.SubCategoryId,
                ModifiedBy = source.ModifiedBy,
                ModifiedOn = source.ModifiedOn
            };
            return target;
        }

    }
}