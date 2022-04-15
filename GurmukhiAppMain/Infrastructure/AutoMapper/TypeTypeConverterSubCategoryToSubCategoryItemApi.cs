using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class TypeTypeConverterSubCategoryToSubCategoryItemApi : ITypeConverter<SubCategory, SubCategoryItem>
    {
        public SubCategoryItem Convert(SubCategory source, SubCategoryItem destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new SubCategoryItem
            {
                Id = source.Id,
                CategoryId = source.CategoryId,
                Name = source.Name,
                Url = source.Url,
                OrderNumber = source.OrderNumber,
                ModifiedBy = source.ModifiedBy,
                ModifiedOn = source.ModifiedOn
            };
            return target;
        }

    }
}