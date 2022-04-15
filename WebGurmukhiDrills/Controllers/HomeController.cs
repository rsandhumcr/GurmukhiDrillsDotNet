using Microsoft.AspNetCore.Mvc;

namespace WebGurmukhiDrills.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Exercise()
        {
            return View();
        }

        public IActionResult Error()
        {
            //ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ContactUs()
        {
            return View();
        }

        public IActionResult OtherResources()
        {
            return View();
        }
    }
}
