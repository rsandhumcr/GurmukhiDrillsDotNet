using System.Collections.Generic;
using multipleChoiceGenerator.Dto;

namespace multipleChoiceGenerator.structure
{
    public interface IExtractAnswer<T>
    {
        List<LayoutContent> GenerateAnswer(T data);
    }
}
