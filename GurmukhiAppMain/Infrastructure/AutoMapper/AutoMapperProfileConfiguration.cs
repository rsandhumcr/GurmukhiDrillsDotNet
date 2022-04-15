using AutoMapper;
using DbGurmukhiModel;
using GurmukhiAppEngine.Infrastrure.Automapper;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Infrastructure.AutoMapper
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration(): this("MyProfile")
        {
        }
        protected AutoMapperProfileConfiguration(string profileName): base(profileName)
        {
            CreateMap<LetterTranslation.dto.Letter, Letter.ViewModel.Letter>().ConvertUsing<TypeTypeConverterApiToLetterData>();
            CreateMap<Letter.ViewModel.Letter, LetterTranslation.dto.Letter>().ConvertUsing<TypeTypeConverterLetterDataToApi>();
            CreateMap<Category, CategoryItem>().ConvertUsing<TypeTypeConverterCategoryToCategoryItemApi>();
            CreateMap<CategoryItem, Category>().ConvertUsing<TypeTypeConverterCategoryItemApiToCategory>();
            CreateMap<SubCategory, SubCategoryItem>().ConvertUsing<TypeTypeConverterSubCategoryToSubCategoryItemApi>();
            CreateMap<SubCategoryItem, SubCategory>().ConvertUsing<TypeTypeConverterSubCategoryItemApiToSubCategory>();
            CreateMap<WordTransationItem, Translation>().ConvertUsing<TypeTypeConverterWordTranslationApiToTranslation>();
            CreateMap<Translation, WordTransationItem>().ConvertUsing<TypeTypeConverterTranslationToWordTranslationApi>();
        }
    }
}
