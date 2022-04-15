using System;
using System.Collections.Generic;
using System.Linq;

namespace multipleChoiceGenerator.structure
{
    public interface IItemSelection
    {
        List<int> CreateSelection(int noOfSelection, int sizeOfArray, int excludeIndex);
        List<T> Shuffle<T>(List<T> items);

        T[] Shuffle<T>(T[] array);

        string CovertIntToString(int index);
    }

    public class ItemSelection : IItemSelection
    {
        private Random _random;
        public ItemSelection()
        {
            _random = new Random();
        }
        public List<int> CreateSelection(int noOfSelection, int sizeOfArray, int excludeIndex)
        {
            var selection = new List<int>();
            if (sizeOfArray > 1 && noOfSelection > 1)
            {
                while (selection.Count() < noOfSelection)
                {
                    int randomNumber = _random.Next(0, sizeOfArray);
                    if (randomNumber != excludeIndex && !selection.Contains(randomNumber))
                    {
                        selection.Add(randomNumber);
                    }
                }
            }
            return selection;
        }

        public List<T> Shuffle<T>(List<T> items)
        {
            var array = items.ToArray();
            var newArray = Shuffle(array);
            return newArray.ToList();
        }

        public T[] Shuffle<T>(T[] array)
        {
            var arrayLength = array.Length;
            var noOfShuffles = 10;

            for (var iLoop = 0; iLoop < noOfShuffles; iLoop++)
            {
                var noOfItems = array.Length - 1;
                while (noOfItems > 0)
                {
                    int randomIndex = _random.Next(0, arrayLength);
                    if (randomIndex == noOfItems)
                    {
                        randomIndex = _random.Next(0, arrayLength);
                    }
                    var temp = array[noOfItems];
                    array[noOfItems] = array[randomIndex];
                    array[randomIndex] = temp;
                    noOfItems--;
                }
            }
            return array;
        }

        public string CovertIntToString(int index)
        {
            var item = Convert.ToChar(index + 65);
            return item.ToString();
        }
    }
}