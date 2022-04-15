using System.Linq;
using GurmukhiAppMain.Letter.Dto;

namespace GurmukhiAppMain.Letter
{
    public interface ILetterGroupMapping
    {
        LetterGroupIndex GetMappingByType(LetterGroups groupIndex);
        LetterGroupIndex GetMappingByIndex(int groupIndex);
        LetterGroupIndex[] Data();
    }

    public class LetterGroupMapping : ILetterGroupMapping
    {
        private readonly LetterGroupIndex[] _data;

        public LetterGroupMapping()
        {
            _data = new[]
            {
                new LetterGroupIndex(LetterGroups.All, "All", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row01, "Row 1", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row02, "Row 2", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row03, "Row 3", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row04, "Row 4", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row05, "Row 5", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row06, "Row 6", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row07, "Row 7", new int[] { }),
                new LetterGroupIndex(LetterGroups.Row08, "Row 8", new int[] { }),
                new LetterGroupIndex(LetterGroups.Voicelessunaspirated, "Voiceless Unaspirated", new[] {5, 10, 15, 20, 25}),
                new LetterGroupIndex(LetterGroups.Voicelessaspirated, "Voiceless Aspirated", new[] {6, 11, 16, 21, 26}),
                new LetterGroupIndex(LetterGroups.Voicedunaspirated, "Voiced Unaspirated", new[] {7, 12, 17, 22, 27}),
                new LetterGroupIndex(LetterGroups.Voicedaspirated, "Voiced Aspirated", new[] {8, 13, 18, 23, 28}),
                new LetterGroupIndex(LetterGroups.Nasal, "Nasal", new[] {9, 14, 19, 24, 29}),
                new LetterGroupIndex(LetterGroups.Sangat01, "Sangat 01", new[] {44, 52, 4, 31, 24, 29, 3, 15}),
                new LetterGroupIndex(LetterGroups.Sangat02, "Sangat 02", new[] {44, 52, 26, 25, 5, 17}),
                new LetterGroupIndex(LetterGroups.Sangat03, "Sangat 03", new[] {7, 27, 32, 33, 42, 43}),
                new LetterGroupIndex(LetterGroups.Sangat04, "Sangat 04", new[] {10, 12, 30, 16, 47, 49}),
                new LetterGroupIndex(LetterGroups.Sangat05, "Sangat 05", new[] {20, 21, 22, 46}),
                new LetterGroupIndex(LetterGroups.Sangat06, "Sangat 06", new[] {0, 1, 2, 8, 50}),
                new LetterGroupIndex(LetterGroups.Sangat07, "Sangat 07", new[] {28, 34, 13, 19, 11, 45, 48}),
                new LetterGroupIndex(LetterGroups.Sangat08, "Sangat 08", new[] {62, 58, 59, 1, 55, 61, 63, 60, 57, 56}),
                new LetterGroupIndex(LetterGroups.Sangat09, "Sangat 09", new[] {6, 23, 18, 9, 14, 53, 51, 54}),
                new LetterGroupIndex(LetterGroups.Sangat10, "Sangat 10", new[] {35, 36, 37, 38, 41, 83, 84, 85}),
                new LetterGroupIndex(LetterGroups.VowelsJoinCarriers, "Vowels and carriers",new[] {0, 1, 2, 42, 43, 44, 47, 48, 49, 50, 52, 53, 54, 55, 57, 58, 59, 60, 61, 62, 63}),
                new LetterGroupIndex(LetterGroups.Vowels, "Vowels", new[] {42, 43, 44, 47, 48, 49, 50, 52, 53, 54})
            };
        }

        public LetterGroupIndex GetMappingByType(LetterGroups groupIndex)
        {
            return Data().FirstOrDefault(itm => itm.GroupType == groupIndex);
        }

        public LetterGroupIndex GetMappingByIndex(int groupIndex)
        {
            return Data().FirstOrDefault(itm => itm.GroupType == (LetterGroups) groupIndex);
        }

        public LetterGroupIndex[] Data()
        {
            return _data;
        }
    }


}
