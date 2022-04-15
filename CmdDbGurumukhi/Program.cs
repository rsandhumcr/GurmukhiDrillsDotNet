using System;
using System.Text;
using DbGurmukhiMsSql;

namespace CmdDbGurmukhi
{
    class Program
    {
        static void Main(string[] args)
        {
            var doDbTest = true;
            if (doDbTest)
            {
                ///Console.OutputEncoding = System.Text.Encoding.Unicode;
                Console.WriteLine("Hello World!");
                var gurmRepo = new GurmukhiRepository();
                var listCat = gurmRepo.GetCategoriesAsync();
                foreach (var cat in listCat.Result)
                {
                    Console.WriteLine($"{cat.Name}");
                }
                var listsubCat = gurmRepo.GetSubCategoriesAsync(1);
                foreach (var subcat in listsubCat.Result)
                {
                    Console.WriteLine($"{subcat.Name}");
                }
                var listTrans = gurmRepo.GetTranslationAsync(1);
                foreach (var tran in listTrans.Result)
                {
                    //var data = Encoding.UTF8.GetBytes(tran.Punjabi);
                    Console.WriteLine(tran.Punjabi);
                    Console.WriteLine($"{tran.English}");
                }
                Console.WriteLine("=============================");
                Console.WriteLine("Enter to exit");
                Console.WriteLine("=============================");
                Console.ReadLine();
            }
        }
    }
}
