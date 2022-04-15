using System.Threading.Tasks;
using GurmukhiAppMain.Word;
using GurmukhiAppMain.Word.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebGurmukhiDrills.Models;
using System;
using WebGurmukhiDrills.Infrastructure;

namespace WebGurmukhiDrills.Api
{
    [Authorize]
    [Produces("application/json")]
    public class WordSubCategoryController : Controller
    {
        private readonly IWordSubCategoryService _wordSubCategoryService;
        private readonly IWordMultipleChoiceGenerator _wordMultipleChoiceGenerator;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private System.Security.Claims.ClaimsPrincipal _currentUser;
        private readonly IAppUtilities _appUtilities;

        public WordSubCategoryController(IWordSubCategoryService wordSubCategoryService, IWordMultipleChoiceGenerator wordMultipleChoiceGenerator, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IAppUtilities appUtilities)
        {
            _appUtilities = appUtilities;
            _wordMultipleChoiceGenerator = wordMultipleChoiceGenerator;
            _wordSubCategoryService = wordSubCategoryService;
            _userManager = userManager;
            _signInManager = signInManager;

        }

        [AllowAnonymous]
        [HttpGet("api/WordCategory/{id}/SubCategory/Selection")]
        public async Task<IActionResult> GetWordSubCategorySelection(int id)
        {
            var check = await _wordSubCategoryService.GetSubCategorySelection(id);
            if (check == null)
            {
                return NotFound();
            }
            return Ok(check);
        }

        [AllowAnonymous]
        [Route("/api/SubCategory/{id}/MulitpleChoice")]
        public async Task<IActionResult> GetMulitpleChoiceWord([FromRoute]int id, [FromQuery]int optionLevel = 1, [FromQuery] bool isPunjabiAnwser = false, [FromQuery] bool showImage = true)
        {
            return Ok(await _wordMultipleChoiceGenerator.GenerateQuestions(id, optionLevel, isPunjabiAnwser, showImage));
        }

        [AllowAnonymous]
        [HttpGet("api/SubCategory/{id}", Name="SubCategoryCreate")]
        public async Task<IActionResult> GetWordSubCategoryViaId(int id)
        {
            var check = await _wordSubCategoryService.GetSubCategoryViaId(id);
            if (check == null)
            {
                return NotFound();
            }
            return Ok(check);
        }

        [HttpPut("api/SubCategory")]
        public async Task<IActionResult> PutWordSubCategoryViaId([FromBody]SubCategoryItem subCategoryItem)
        {
            SetModifyData(subCategoryItem);
            var check = await _wordSubCategoryService.CreateSubCategoryViaId(subCategoryItem);
            return CreatedAtRoute("SubCategoryCreate", new { id = check.Id }, check);
        }

        [HttpPost("api/SubCategory/{id}")]
        public async Task<IActionResult> PostWordSubCategoryViaId([FromRoute]int id, [FromBody]SubCategoryItem subCategoryItem)
        {
            SetModifyData(subCategoryItem);
            var check = await _wordSubCategoryService.UpdateSubCategoryViaId(subCategoryItem);
            return Ok(check);
        }

        [HttpDelete("api/SubCategory/{id}")]
        public async Task<IActionResult> DeleteWordSubCategory(int id)
        {
            var result = await _wordSubCategoryService.DeleteSubCategoryById(id);
            if (result)
                return NoContent();
            return NotFound();
        }

        private void SetModifyData(SubCategoryItem subCategoryItem)
        {
            if (_currentUser == null && this.User != null)
            {
                _currentUser = this.User;
            }
            subCategoryItem.ModifiedOn = _appUtilities.GetCurrentDateTime();
            var isLoggedIn = (_currentUser != null && _signInManager.IsSignedIn(_currentUser));
            subCategoryItem.ModifiedBy = (isLoggedIn) ? _userManager.GetUserName(_currentUser) : string.Empty;
        }
    }
}
