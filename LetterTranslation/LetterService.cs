using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LetterTranslation.dto;

namespace LetterTranslation
{
    public interface ILetterService
    {
        List<Letter> GetAllLetters();
        List<Letter> GetLettersByOrderIndexes(int[] letterArray);
        List<Letter> GetLettersByRowIndexes(int[] letterArray);
        List<Letter> GetLettersByColumnIndexes(int[] letterArray);
        Letter GetLettersByEnglishLetter(string letter);
        Letter GetLettersByPunjabiLetter(string letter);
        Letter GetLettersByOrderIndex(int letterIndex);
    }

    public class LetterService : ILetterService
    {
        public string DataFile { get; set; }
        public Logging.ILog Logger { get; set; }
        public IJsonObjectLoader JsonObjectLoader { get; set; }

        public Alphabet Alphabet { get; set; }
        public void InitialEngine()
        {
            if (ValidateSetup())
            {
                Logger.Info("InitialEngine Called");
                if (Alphabet == null)
                {
                    Alphabet = JsonObjectLoader.LoadJsonFile(this.DataFile);
                }
            }
            else
            {
                Logger.Error("Setup validation has failed.");
            }
        }

        public async Task InitialEngineAsync()
        {
            if (ValidateSetup() == false)
            {
                Logger.Error("Setup validation has failed.");
            }
            else
            {
                Logger.Trace("InitialEngine Called");
                if (Alphabet == null)
                {
                    Alphabet = await JsonObjectLoader.LoadJsonFileAsync(this.DataFile);
                }
            }
        }


        private bool ValidateSetup()
        {
            bool hasSetupCorrectly = true;
            if (Logger == null)
            {
                hasSetupCorrectly = false;
                throw new MissingFieldException("Logger not assigned");
            }
            Logger.Trace("ValidateSetup Called");
            if (string.IsNullOrEmpty(DataFile))
            {
                hasSetupCorrectly = false;
                Logger.Error("'DataFile' property not set.");
            }
            return hasSetupCorrectly;
        }

        public List<Letter> GetAllLetters()
        {
            Logger.Trace($"GetAllLetters");
            CheckAlphabetData();
            return Alphabet.Letters.ToList();
        }

        public Letter GetLettersByOrderIndex(int letterIndex)
        {
            return this.GetLettersByOrderIndexes(new int[]{ letterIndex }).FirstOrDefault();
        }

        public List<Letter> GetLettersByOrderIndexes(int[] letterArray)
        {
            logTraceMessage("GetLettersByOrderIndexes", letterArray);
            CheckAlphabetData();
            return Alphabet.Letters.Where(prp => letterArray.Contains(prp.Order)).ToList();
        }

        public List<Letter> GetLettersByRowIndexes(int[] letterArray)
        {
            logTraceMessage("GetLettersByRowIndexes", letterArray);
            CheckAlphabetData();
            return Alphabet.Letters.Where(prp => letterArray.Contains(prp.RowLocation)).ToList();
        }

        public List<Letter> GetLettersByColumnIndexes(int[] letterArray)
        {
            logTraceMessage("GetLettersByColumnIndexes", letterArray);
            CheckAlphabetData();
            return Alphabet.Letters.Where(prp => letterArray.Contains(prp.ColumnLocation)).ToList();
        }

        public Letter GetLettersByEnglishLetter(string letter)
        {
            Logger.Trace($"GetLettersByEnglishLetter : {letter}");
            CheckAlphabetData();
            return Alphabet.Letters.FirstOrDefault(prp => prp.English == letter);
        }

        public Letter GetLettersByPunjabiLetter(string letter)
        {
            Logger.Trace($"GetLettersByPunjabiLetter : {letter}");
            CheckAlphabetData();
            return Alphabet.Letters.FirstOrDefault(prp => prp.Punjabi == letter);
        }

        private void logTraceMessage(string messagePrefix, int[] data)
        {
            Logger.Trace($"{messagePrefix} : {string.Join(",", data)}");
        }

        private void CheckAlphabetData()
        {
            if (Alphabet == null)
            {
                InitialEngine();
            }
        }
    }
}
