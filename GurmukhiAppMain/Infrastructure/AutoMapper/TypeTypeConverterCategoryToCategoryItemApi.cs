using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class TypeTypeConverterCategoryToCategoryItemApi : ITypeConverter<Category, CategoryItem>
    {
        public CategoryItem Convert(Category source, CategoryItem destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new CategoryItem
            {
                Id = source.Id,
                Name = source.Name,
                ModifiedBy = source.ModifiedBy,
                ModifiedOn = source.ModifiedOn
            };
            return target;
        }

    }
}