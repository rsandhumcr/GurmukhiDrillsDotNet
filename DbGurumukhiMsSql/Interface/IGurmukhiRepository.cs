using System.Collections.Generic;
using System.Threading.Tasks;
using DbGurmukhiModel;

namespace DbGurmukhiMsSql.Interface
{
    public interface IGurmukhiRepository
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<List<SubCategory>> GetSubCategoriesAsync(int categoryId);
        Task<List<Translation>> GetTranslationAsync(int subcategoryId);

        Task<Category> GetCategoryViaIdAsync(int categorId);
        Task<Category> CreateCategoryAsync(Category category);
        Task<Category> UpdateCategoryAsync(Category category);

        Task<SubCategory> GetSubCategoryViaIdAsync(int subcategoryId);
        Task<SubCategory> CreateSubCategoryAsync(SubCategory subcategory);
        Task<SubCategory> UpdateSubCategoryAsync(SubCategory subcategory);

        Task<Translation> GetTranslationViaIdAsync(int translationId);
        Task<Translation> CreateTranslationViaIdAsync(Translation translation);
        Task<Translation> UpdateTranslationViaIdAsync(Translation translation);

        Task<bool> DeleteCategoryViaIdAsync(int cateogryId);
        Task<bool> DeleteSubCategoryViaIdAsync(int subcateogryId);
        Task<bool> DeleteTranslationViaIdAsync(int translationId);
    }
}
