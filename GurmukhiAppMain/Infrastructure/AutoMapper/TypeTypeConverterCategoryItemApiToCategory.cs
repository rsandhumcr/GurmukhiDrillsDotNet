using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class TypeTypeConverterCategoryItemApiToCategory : ITypeConverter<CategoryItem, Category>
    {
        public Category Convert(CategoryItem source, Category destination, ResolutionContext context)
        {
            if (source == null)
                return null;
            var target = new Category
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