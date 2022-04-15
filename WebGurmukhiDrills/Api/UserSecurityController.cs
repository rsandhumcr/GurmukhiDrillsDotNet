using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebGurmukhiDrills.Infrastructure;
using WebGurmukhiDrills.Models;
using WebGurmukhiDrills.Models.UserSecurity;

namespace WebGurmukhiDrills.Api
{
    [Route("api/UserSecurity")]
    public class UserSecurityController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfigureHolder _configureHolder;

        public UserSecurityController(IConfigureHolder configureHolder, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _configureHolder = configureHolder;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult GetUserSecurityDetails()
        {
            System.Security.Claims.ClaimsPrincipal currentUse = this.User;
            var isLoggedIn = (currentUse != null && _signInManager.IsSignedIn(currentUse));
            var username = (isLoggedIn) ? _userManager.GetUserName(currentUse) : string.Empty;
            var securityData = new UserSecurityViewModel(isLoggedIn, username, _configureHolder.InDevMode, _configureHolder.ShowAdmin, _configureHolder.ShowLogin, _configureHolder.ShowRegistration);
            return Ok(securityData);
        }
    }
}
