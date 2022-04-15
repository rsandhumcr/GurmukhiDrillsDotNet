using System.Collections.Generic;
using multipleChoiceGenerator.Dto;

namespace multipleChoiceGenerator.structure
{
    public interface IExtractQuestion<T>
    {
        List<LayoutContent> GenerateQuestion(T data);
    }
}
