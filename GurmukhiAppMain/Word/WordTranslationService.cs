using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DbGurmukhiModel;
using DbGurmukhiMsSql.Interface;
using GurmukhiAppMain.Word.Dto;
using LetterTranslation;
using Logging;

namespace GurmukhiAppMain.Word
{
    public interface IWordTranslationService
    {
        Task<WordTransationResultset> GetWordTranslationViaSubCategoryId(int subcategoryId);
        Task<WordTransationResultset> GetWordTranslationShuffledViaSubCategoryId(int subcategoryId);
        Task<WordTransationItem> GetWordTranslationViaId(int translationId);
        Task<WordTransationItem> CreateWordTranslation(WordTransationItem wordTransationItem);
        Task<WordTransationItem> UpdateWordTranslation(WordTransationItem wordTransationItem);
        WordTranslated GetWordTranslationTranslated(string punjabi);
        Task<bool> DeleteTranslationById(int categoryId);
    }

    public class WordTranslationService : IWordTranslationService
    {
        private readonly IGurmukhiRepository _gurmukhiRepository;
        private readonly IMapper _mapper;
        private Random _random;
        private readonly TranslationService _translationService;
        public WordTranslationService(IGurmukhiRepository gurmukhiRepository, IMapper mapper, ILog log, ITranslationServiceBuilder translationServiceBuilder)
        {
            _translationService = translationServiceBuilder.GenerateService(log);
            //"data/data.json"
            _random = new Random();
            _mapper = mapper;
            _gurmukhiRepository = gurmukhiRepository;
        }

        public async Task<WordTransationResultset> GetWordTranslationViaSubCategoryId(int subcategoryId)
        {
            var result = await _gurmukhiRepository.GetTranslationAsync(subcategoryId);
            result = result.OrderBy(itm => itm.OrderNumber).ToList();
            var resultset = new WordTransationResultset {ListTransation = _mapper.Map<List<WordTransationItem>>(result)};
            return resultset;
        }

        public async Task<WordTransationItem> GetWordTranslationViaId(int translationId)
        {
            var result = await _gurmukhiRepository.GetTranslationViaIdAsync(translationId);
            return _mapper.Map<WordTransationItem>(result);
        }


        public async Task<WordTransationResultset> GetWordTranslationShuffledViaSubCategoryId(int subcategoryId)
        {
            var result = await this.GetWordTranslationViaSubCategoryId(subcategoryId);
            result.ListTransation = Shuffle(result.ListTransation);
            return result;
        }

        public async Task<WordTransationItem> CreateWordTranslation(WordTransationItem wordTransationItem)
        {
            var result = await _gurmukhiRepository.CreateTranslationViaIdAsync(_mapper.Map<Translation>(wordTransationItem));
            return _mapper.Map< WordTransationItem>( result);
        }

        public async Task<WordTransationItem> UpdateWordTranslation(WordTransationItem wordTransationItem)
        {
            var result = await _gurmukhiRepository.UpdateTranslationViaIdAsync(_mapper.Map<Translation>(wordTransationItem));
            return _mapper.Map<WordTransationItem>(result);
        }

        public async Task<WordTransationResultset> CreateWordTranslationShuffledViaSubCategoryId(WordTransationResultset wordTransationResultset)
        {
            var result = await _gurmukhiRepository.GetTranslationAsync(0);
            result = result.OrderBy(itm => itm.OrderNumber).ToList();
            var resultset = new WordTransationResultset { ListTransation = _mapper.Map<List<WordTransationItem>>(result) };
            return resultset;
        }

        private List<WordTransationItem> Shuffle(List<WordTransationItem> listData)
        {
            var array = listData.ToArray();
            var arrayLength = array.Length;
            var noOfShuffles = 10;

            for (var iLoop = 0; iLoop < noOfShuffles; iLoop++)
            {
                var noOfItems = array.Length - 1;
                while (noOfItems > 0)
                {
                    int randomIndex = _random.Next(0, arrayLength);
                    if (randomIndex == noOfItems)
                    {
                        randomIndex = _random.Next(0, arrayLength);
                    }
                    var temp = array[noOfItems];
                    array[noOfItems] = array[randomIndex];
                    array[randomIndex] = temp;
                    noOfItems--;
                }
            }
            return array.ToList();
        }

        public WordTranslated GetWordTranslationTranslated(string punjabi)
        {
            if( String.IsNullOrWhiteSpace(punjabi))
                return new WordTranslated{ Equivalent = string.Empty, Character = string.Empty, Punjabi = String.Empty};
            var resultset = _translationService.TranslatePunjabiSet(punjabi);
            var dto = new WordTranslated {Punjabi = punjabi};
            dto.Character = resultset.EquivalentEnglish;
            dto.Equivalent = resultset.English; 
            return dto;
        }

        public async Task<bool> DeleteTranslationById(int categoryId)
        {
            return await _gurmukhiRepository.DeleteTranslationViaIdAsync(categoryId);
        }
    }
}
