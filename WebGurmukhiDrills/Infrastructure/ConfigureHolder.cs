using Microsoft.Extensions.Configuration;

namespace WebGurmukhiDrills.Infrastructure
{
    public interface IConfigureHolder
    {
        bool InDevMode { get; }
        bool ShowAdmin { get; }
        bool ShowLogin { get; }
        bool ShowRegistration { get; }
    }

    public class ConfigureHolder : IConfigureHolder
    {
        public ConfigureHolder(IConfiguration configuration)
        {
            InDevMode = configuration.GetValue<bool>("App:DevMode", false);
            ShowAdmin = configuration.GetValue<bool>("App:ShowAdmin", false);
            ShowLogin = configuration.GetValue<bool>("App:ShowLogin", false);
            ShowRegistration = configuration.GetValue<bool>("App:ShowRegistration", false);
        }

        public bool InDevMode { get; }
        public bool ShowAdmin { get; }
        public bool ShowLogin { get; }
        public bool ShowRegistration { get; }
    }
}
