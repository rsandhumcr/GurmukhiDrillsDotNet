using System.Collections.Generic;
using multipleChoiceGenerator.Dto;

namespace multipleChoiceGenerator.structure
{
    public static class LayoutContentHelper
    {
        public static bool AddToListLayoutContent(List<LayoutContent> listLayoutContent, LayoutContent newItem )
        {
            bool addItem = false;
            if (newItem != null && newItem.Content != null && !string.IsNullOrWhiteSpace(newItem.Content))
            {
                listLayoutContent.Add(newItem);
                addItem = true;
            }
            return addItem;
        }

        public static LayoutContent AddLabelTextContent(string label, string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                return null;
            }
            
            return  new LayoutContent
            {
                Label = label,
                Content = content,
                ContentType = ContentTypes.TextLabel
            };
        }

        public static LayoutContent AddLabelLargerTextContent(string label, string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                return null;
            }

            return new LayoutContent
            {
                Label = label,
                Content = content,
                ContentType = ContentTypes.LargerTextLabel
            };
        }

        public static LayoutContent AddAudioContent(string label, string audioPathFilename)
        {
            if (string.IsNullOrWhiteSpace(audioPathFilename))
            {
                return null;
            }
            return new LayoutContent
            {
                Label = label,
                Content = audioPathFilename,
                ContentType = ContentTypes.Audio
            };
        }

        public static LayoutContent AddImageContent(string label, string imagePathFilename, bool fixedSize)
        {
            if (string.IsNullOrWhiteSpace(imagePathFilename))
            {
                return null;
            }
            return new LayoutContent
            {
                Label = label,
                Content = imagePathFilename,
                ContentType = fixedSize ? ContentTypes.ImageFixedSize : ContentTypes.ImageImageSize
            };
        }
    }
}
