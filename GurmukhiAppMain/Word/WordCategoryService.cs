using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbGurmukhiModel;
using DbGurmukhiMsSql.Interface;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Word
{
    public interface IWordCategoryService
    {
        Task<IEnumerable<SelectionItem>> GetCategorySelection();
        Task<CategoryItem> GetCategoryById(int categoryId);

        Task<CategoryItem> CreateCategory(CategoryItem categoryItem);
        Task<CategoryItem> UpdateCategory(CategoryItem categoryItem);
        Task<bool> DeleteCategoryById(int categoryId);
    }

    public class WordCategoryService : IWordCategoryService
    {
        private readonly IGurmukhiRepository _gurmukhiRepository;
        private readonly IMapper _mapper;

        public WordCategoryService(IGurmukhiRepository gurmukhiRepository, IMapper mapper)
        {
            _mapper = mapper;
            _gurmukhiRepository = gurmukhiRepository;
        }

        public async Task<IEnumerable<SelectionItem>> GetCategorySelection()
        {
            var result = await _gurmukhiRepository.GetCategoriesAsync();
            result = result.OrderBy(itm => itm.Name).ToList();
            return result.Select(itm => new SelectionItem(itm.Id, itm.Name)).ToList();
        }

        public async Task<CategoryItem> GetCategoryById(int categoryId)
        {
            var result = await _gurmukhiRepository.GetCategoryViaIdAsync(categoryId);
            return _mapper.Map<CategoryItem>(result);

        }

        public async Task<bool> DeleteCategoryById(int categoryId)
        {
            return await _gurmukhiRepository.DeleteCategoryViaIdAsync(categoryId);
        }

        public async Task<CategoryItem> CreateCategory(CategoryItem categoryItem)
        {
            var result = await _gurmukhiRepository.CreateCategoryAsync(_mapper.Map<Category>(categoryItem));
            return _mapper.Map<CategoryItem>(result);
        }

        public async Task<CategoryItem> UpdateCategory(CategoryItem categoryItem)
        {
            var result = await _gurmukhiRepository.UpdateCategoryAsync(_mapper.Map<Category>(categoryItem));
            return _mapper.Map<CategoryItem>(result);
        }
    }
}
