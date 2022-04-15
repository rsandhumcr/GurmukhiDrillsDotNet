using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppEngine.Infrastrure.Automapper
{
    public class TypeTypeConverterWordTranslationApiToTranslation : ITypeConverter<WordTransationItem, Translation>
    {
        public Translation Convert(WordTransationItem  source, Translation destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new Translation
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