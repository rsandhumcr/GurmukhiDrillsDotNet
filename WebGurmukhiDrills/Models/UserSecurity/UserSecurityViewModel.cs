namespace WebGurmukhiDrills.Models.UserSecurity
{
    public class UserSecurityViewModel
    {
        public UserSecurityViewModel(bool loggedIn, string loggedInName, bool devMode, bool showAdmin, bool showLogin, bool showRegistration)
        {
            LoggedIn = loggedIn;
            LoggedInName = loggedInName;
            InDevMode = devMode;
            ShowAdmin = showAdmin;
            ShowLogin = showLogin;
            ShowRegistration = showRegistration;
        }
        public bool LoggedIn { get;}
        public string LoggedInName { get;}

        public bool InDevMode { get; }
        public bool ShowAdmin { get; }
        public bool ShowLogin { get; }
        public bool ShowRegistration { get; }
    }
}
