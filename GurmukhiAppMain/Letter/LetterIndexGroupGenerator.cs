using System;
using GurmukhiAppMain.Letter.Dto;
using Logging;

namespace GurmukhiAppMain.Letter
{
    public interface ILetterIndexGroupGenerator
    {
        LetterDataSearchParameters GenerateSearchParameterFromType(LetterGroups lettergroupType);
    }

    public class LetterIndexGroupGenerator : ILetterIndexGroupGenerator
    {
        private readonly ILog _log;
        private readonly ILetterGroupMapping _letterGroupMapping;

        public LetterIndexGroupGenerator(ILog log, ILetterGroupMapping letterGroupMapping)
        {
            _letterGroupMapping = letterGroupMapping;
            _log = log;
        }
        public LetterDataSearchParameters GenerateSearchParameterFromType(LetterGroups lettergroupType)
        {
            var letterDataSearchParameters = new LetterDataSearchParameters();
            _log.Trace($"GenerateSearchParameterFromType lettergroupType {lettergroupType.ToString()}");
            try
            {
                var lettergroupTypeInt = (int)lettergroupType;
                if (lettergroupTypeInt < 9)
                {
                    letterDataSearchParameters.Index = new[] { lettergroupTypeInt };
                    letterDataSearchParameters.Title = _letterGroupMapping.GetMappingByIndex(lettergroupTypeInt).GroupName;
                }
                else
                {
                    letterDataSearchParameters.GetByIndex = true;
                    var letterGroupIndex = _letterGroupMapping.GetMappingByIndex(lettergroupTypeInt);
                    letterDataSearchParameters.Index = letterGroupIndex.Indexes;
                    letterDataSearchParameters.Title = letterGroupIndex.GroupName;
                }
            }
            catch (Exception ex)
            {
                _log.Error($"GenerateSearchParameterFromType lettergroupType {lettergroupType.ToString()}");
                _log.Error(ex);
                throw;
            }

            return letterDataSearchParameters;
        }

    }
}
