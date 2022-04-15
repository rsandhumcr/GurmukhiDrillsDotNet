using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using GurmukhiAppMain.Letter.Dto;
using GurmukhiAppMain.Letter.ViewModel;
using LetterTranslation;
using Logging;

namespace GurmukhiAppMain.Letter
{
    public interface IGroupLetterService
    {
        LetterGroupsResult GetGroupsByType(LetterGroups letterGroupType);
        LetterGroupsResult GetGroupsByTypes(int[] lettergroups);
    }

    public class GroupLetterService : IGroupLetterService
    {
        private readonly ILog _log;
        private readonly ILetterIndexGroupGenerator _letterIndexGroupGenerator;
        private readonly IMapper _mapper;
        private readonly ILetterSerivceBuilder _letterSerivceBuilder;

        public GroupLetterService(ILog log, IMapper mapper, ILetterIndexGroupGenerator letterIndexGroupGenerator, ILetterSerivceBuilder letterSerivceBuilder)
        {
            _letterSerivceBuilder = letterSerivceBuilder;
            _letterIndexGroupGenerator = letterIndexGroupGenerator;
            _log = log;
            _mapper = mapper;

        }

        private LetterTranslation.LetterService _letterService { get; set; }
        private LetterTranslation.LetterService GetService()
        {

            if (_letterService == null)
            {
                _letterService = _letterSerivceBuilder.GenerateSerivce(_log);
                _letterService.DataFile = "data/data.json";
                _letterService.Logger = _log;
            }

            return _letterService;
        }

        public LetterGroupsResult GetGroupsByType(LetterGroups letterGroupType)
        {
            var result = new LetterGroupsResult();
            _log.Trace($"GetGroupsByType letterGroupType: {letterGroupType.ToString()}");
            try
            {
                var searchParameters = _letterIndexGroupGenerator.GenerateSearchParameterFromType(letterGroupType);
                result.GroupTitle = searchParameters.Title;
                var listLetters = GetLetters(searchParameters);
                result.Letters = _mapper.Map<List<ViewModel.Letter>>(listLetters);
            }
            catch (Exception ex)
            {
                _log.Error($"GetGroupsByType letterGroupType: {letterGroupType.ToString()}");
                _log.Error(ex);
                throw;
            }
            return result;
        }

        public LetterGroupsResult GetGroupsByTypes(int[] lettergroups)
        {
            var result = new LetterGroupsResult();
            result.GroupTitle = string.Empty;
            result.Letters = new List<ViewModel.Letter>();
            _log.Trace($"GetGroupsByTypes lettergroups: {string.Join(",", lettergroups)}");
            try
            {
                foreach (var indexgroup in lettergroups)
                {
                    var grouptype = (LetterGroups) indexgroup;
                    var resultPart = GetGroupsByType(grouptype);
                    if (!string.IsNullOrWhiteSpace(result.GroupTitle))
                        result.GroupTitle += ", ";
                    result.GroupTitle += resultPart.GroupTitle;
                    var foundIds = result.Letters.Select(itm => itm.Order).ToList();
                    var uniqueLetter = resultPart
                        .Letters.Where(itm1 => !foundIds.Contains(itm1.Order)).ToList();
                    result.Letters.AddRange(uniqueLetter);
                }
            }
            catch (Exception ex)
            {
                _log.Error($"GetGroupsByTypes lettergroups: {string.Join(",", lettergroups)}");
                _log.Error(ex);
                throw;
            }
            return result;
        }

        private List<LetterTranslation.dto.Letter> GetLetters(LetterDataSearchParameters searchparameters)
        {
            List<LetterTranslation.dto.Letter> listLetters;
            if (searchparameters.GetByIndex)
            {
                listLetters = GetService().GetLettersByOrderIndexes(searchparameters.Index);
            }
            else
            {
                if (searchparameters.Index[0] == 0)
                {
                    listLetters = GetService().GetAllLetters();
                    listLetters = listLetters.Where(item => item.Order < 42).ToList();
                }
                else
                {
                    var subItem = searchparameters.Index.Select(itm => itm - 1).ToArray();
                    listLetters = GetService().GetLettersByRowIndexes(subItem);
                }

            }
            return listLetters;
        }
    }
}
