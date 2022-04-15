using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class TypeTypeConverterSubCategoryItemApiToSubCategory : ITypeConverter<SubCategoryItem, SubCategory>
    {
        public SubCategory Convert(SubCategoryItem source, SubCategory destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new SubCategory
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