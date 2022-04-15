using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbGurmukhiModel;
using DbGurmukhiMsSql.Interface;
using GurmukhiAppMain.Word.Dto;

namespace GurmukhiAppMain.Word
{
    public interface IWordSubCategoryService
    {
        Task<IEnumerable<SelectionItem>> GetSubCategorySelection(int categoryId);
        Task<SubCategoryItem> GetSubCategoryViaId(int subcategoryId);
        Task<SubCategoryItem> CreateSubCategoryViaId(SubCategoryItem subCategoryItem);
        Task<SubCategoryItem> UpdateSubCategoryViaId(SubCategoryItem subCategoryItem);
        Task<bool> DeleteSubCategoryById(int categoryId);
    }

    public class WordSubCategoryService : IWordSubCategoryService
    {
        private readonly IGurmukhiRepository _gurmukhiRepository;
        private readonly IMapper _mapper;

        public WordSubCategoryService(IGurmukhiRepository gurmukhiRepository, IMapper mapper)
        {
            _mapper = mapper;
            _gurmukhiRepository = gurmukhiRepository;
        }

        public async Task<IEnumerable<SelectionItem>> GetSubCategorySelection(int categoryId)
        {
            var result = await _gurmukhiRepository.GetSubCategoriesAsync(categoryId);
            result = result.OrderBy(itm => itm.OrderNumber).ToList();
            return result.Select(itm => new SelectionItem(itm.Id, itm.Name)).ToList();
        }

        public async Task<SubCategoryItem> GetSubCategoryViaId(int subcategoryId)
        {
            var result = await _gurmukhiRepository.GetSubCategoryViaIdAsync(subcategoryId);
            return _mapper.Map<SubCategoryItem>(result);
        }

        public async Task<SubCategoryItem> CreateSubCategoryViaId(SubCategoryItem subCategoryItem)
        {
            var result = await _gurmukhiRepository.CreateSubCategoryAsync(_mapper.Map<SubCategory>(subCategoryItem));
            return _mapper.Map<SubCategoryItem>(result);
        }

        public async Task<SubCategoryItem> UpdateSubCategoryViaId(SubCategoryItem subCategoryItem)
        {
            var result = await _gurmukhiRepository.UpdateSubCategoryAsync(_mapper.Map<SubCategory>(subCategoryItem));
            return _mapper.Map<SubCategoryItem>(result);
        }

        public async Task<bool> DeleteSubCategoryById(int categoryId)
        {
            return await _gurmukhiRepository.DeleteSubCategoryViaIdAsync(categoryId);
        }

    }
}
