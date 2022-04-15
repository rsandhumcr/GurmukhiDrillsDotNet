using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Razor.TagHelpers;
using WebGurmukhiDrills.Models;

namespace WebGurmukhiDrills.Infrastructure {

    [HtmlTargetElement("td", Attributes = "identity-role")]
    public class RoleUsersTagHelper : TagHelper {
        private UserManager<ApplicationUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public RoleUsersTagHelper(UserManager<ApplicationUser> usermgr,
                                  RoleManager<IdentityRole> rolemgr) {
            userManager = usermgr;
            roleManager = rolemgr;
        }

        [HtmlAttributeName("identity-role")]
        public string Role { get; set; }

        public override async Task ProcessAsync(TagHelperContext context,
                TagHelperOutput output) {

            List<string> names = new List<string>();
            IdentityRole role = await roleManager.FindByIdAsync(Role);
            if (role != null)
            {
                var userlist = userManager.Users.ToList();
                foreach (var user in userlist) {
                    if (user != null)
                    {
                        var listRoles = await userManager.IsInRoleAsync(user, role.Name);
                        if(listRoles)
                            names.Add(user.UserName);
                    }
                }
            }

            output.Content.SetContent(names.Count == 0 ?
                "No Users" : string.Join(", ", names));
        }
    }
}
