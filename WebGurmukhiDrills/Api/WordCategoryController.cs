using System;
using System.Threading.Tasks;
using GurmukhiAppMain.Word;
using GurmukhiAppMain.Word.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebGurmukhiDrills.Infrastructure;
using WebGurmukhiDrills.Models;

namespace WebGurmukhiDrills.Api
{
    [Produces("application/json")]
    [Route("api/WordCategory")]
    [Authorize]
    public class WordCategoryController : Controller
    {
        private readonly IWordCategoryService _wordCategoryService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private System.Security.Claims.ClaimsPrincipal _currentUser;
        private readonly IAppUtilities _appUtilities;

        public WordCategoryController(IWordCategoryService wordCategoryService, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IAppUtilities appUtilities)
        {
            _appUtilities = appUtilities;
            if (this.User != null)
            {
                _currentUser = this.User;
            }
            _wordCategoryService = wordCategoryService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpGet("Selection")]
        public async Task<IActionResult> GetWordCategory()
        {
            var check = await _wordCategoryService.GetCategorySelection();
            if (check == null)
            {
                return NotFound();
            }
            return Ok(check);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "CategoryGet")]
        public async Task<IActionResult> GetWordCategory(int id)
        {
            var check = await _wordCategoryService.GetCategoryById(id);
            if (check == null)
            {
                return NotFound();
            }
            return Ok(check);
        }

        [HttpPut()]
        public async Task<IActionResult> PutWordCategory([FromBody]CategoryItem category)
        {
            SetModifyData(category);
            var check = await _wordCategoryService.CreateCategory(category);
            return CreatedAtRoute("CategoryGet",new {id = check.Id}, check);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> PostWordCategory([FromRoute]int id, [FromBody]CategoryItem category)
        {
            SetModifyData(category);
            var check = await _wordCategoryService.UpdateCategory(category);
            return Ok(check);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWordCategory(int id)
        {
            var result = await _wordCategoryService.DeleteCategoryById(id);
            if(result)
                return NoContent();
            return NotFound();
        }

        private void SetModifyData(CategoryItem category)
        {
            if (_currentUser == null && this.User != null)
            {
                _currentUser = this.User;
            }
            category.ModifiedOn = _appUtilities.GetCurrentDateTime();
            var isLoggedIn = (_currentUser != null && _signInManager.IsSignedIn(_currentUser));
            category.ModifiedBy = (isLoggedIn) ? _userManager.GetUserName(_currentUser) : string.Empty;
            
        }
    }
}
