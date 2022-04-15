namespace GurmukhiAppMain.Letter.Dto
{
    public class LetterGroupIndexs
    {
        public LetterGroupIndex[] groupings { get; set; }
    }

    public class LetterGroupIndex
    {
        public LetterGroupIndex(LetterGroups groupType, string name, int[] indexes)
        {
            GroupType = groupType;
            GroupName = name;
            Indexes = indexes;
        }

        public LetterGroups GroupType { get; }
        public string GroupName { get; }
        public int[] Indexes { get; }
    }
}
