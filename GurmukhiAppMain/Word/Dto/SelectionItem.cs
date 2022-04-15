namespace GurmukhiAppMain.Word.Dto
{
    public class SelectionItem
    {
        public SelectionItem(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
        public int Id { get; }
        public string Name { get; }
    }
}
