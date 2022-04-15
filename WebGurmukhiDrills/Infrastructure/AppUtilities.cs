using System;

namespace WebGurmukhiDrills.Infrastructure
{
    public interface IAppUtilities
    {
        DateTime GetCurrentDateTime();
    }

    public class AppUtilities : IAppUtilities
    {
        public DateTime GetCurrentDateTime()
        {
            return DateTime.Now;
        }
    }

}
