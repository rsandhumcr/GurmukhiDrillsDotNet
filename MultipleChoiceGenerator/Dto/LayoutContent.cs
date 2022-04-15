namespace multipleChoiceGenerator.Dto
{
    public class LayoutContent
    {
        public string Label { get; set; }
        public string Content { get; set; }
        public ContentTypes ContentType { get; set; }
    }

    public enum ContentTypes
    {
        TextLabel=1,
        Audio,
        ImageFixedSize,
        ImageImageSize,
        LargerTextLabel
    }

    public enum WordMode
    {
        PunjabiPictureQuestion = 1,
        EnglishPictureQuestion = 2,
        PunjabiQuestion = 3,
        EnglishQuestion = 4
    }
}
