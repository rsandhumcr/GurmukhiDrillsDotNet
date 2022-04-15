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
    [Authorize]
    public class WordTranslationController : Controller
    {
        private readonly IWordTranslationService _wordTranslationService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private System.Security.Claims.ClaimsPrincipal _currentUser;
        private readonly IAppUtilities _appUtilities;

        public WordTranslationController(IWordTranslationService wordTranslationService, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IAppUtilities appUtilities)
        {
            _appUtilities = appUtilities;
            _userManager = userManager;
            _signInManager = signInManager;
            _wordTranslationService = wordTranslationService;
        }

        [AllowAnonymous]
        [Route("api/WordTranslation/{id}", Name="wordTranslationCreated")]
        public async Task<IActionResult> GetWordTranslationViaId(int id)
        {
            var result = await _wordTranslationService.GetWordTranslationViaId(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("api/WordTranslation/Translation")]
        public IActionResult GetWordTranslation([FromQuery]string punjabi)
        {
            var result = _wordTranslationService.GetWordTranslationTranslated(punjabi);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [AllowAnonymous]
        [Route("api/SubCategory/{id}/wordtranslation")]
        public async Task<IActionResult> GetWordTranslation(int id)
        {
            var result = await _wordTranslationService.GetWordTranslationViaSubCategoryId(id);
            result.ImagePrefix = "/images/data";
            result.AudioPrefix = "/audio/data";
            return Ok(result);
        }

        [AllowAnonymous]
        [Route("api/SubCategory/{id}/wordtranslation/shuffled")]
        public async Task<IActionResult> GetWordTranslationShuffled(int id)
        {
            var result = await _wordTranslationService.GetWordTranslationShuffledViaSubCategoryId(id);
            result.ImagePrefix = "/images/data";
            result.AudioPrefix = "/audio/data";
            return Ok(result);
        }

        [HttpPut("api/WordTranslation")]
        public async Task<IActionResult> PutWordTranslationViaId([FromBody]WordTransationItem wordTransationItem)
        {
            SetModifyData(wordTransationItem);
            var result = await _wordTranslationService.CreateWordTranslation(wordTransationItem);
            if (result == null)
                return NotFound();
            return CreatedAtRoute("wordTranslationCreated", new { id = result.Id }, result);
        }

        [HttpPost("api/WordTranslation/{id}")]
        public async Task<IActionResult> PostWordTranslationViaId([FromRoute]int id, [FromBody]WordTransationItem wordTransationItem)
        {
            SetModifyData(wordTransationItem);
            var result = await _wordTranslationService.UpdateWordTranslation(wordTransationItem);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("api/WordTranslation/{id}")]
        public async Task<IActionResult> DeleteTranslation(int id)
        {
            var result = await _wordTranslationService.DeleteTranslationById(id);
            if (result)
                return NoContent();
            return NotFound();
        }

        private void SetModifyData(WordTransationItem wordTransationItem)
        {
            if (_currentUser == null && this.User != null)
            {
                _currentUser = this.User;
            }
            wordTransationItem.ModifiedOn = _appUtilities.GetCurrentDateTime();
            var isLoggedIn = (_currentUser != null && _signInManager.IsSignedIn(_currentUser));
            wordTransationItem.ModifiedBy = (isLoggedIn) ? _userManager.GetUserName(_currentUser) : string.Empty;
        }
    }
}
