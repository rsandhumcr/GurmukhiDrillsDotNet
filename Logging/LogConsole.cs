using System;

namespace Logging
{
    public class LogConsole : ILog
    {
        public void Trace(params string[] message)
        {
            FormatMessage("Trace", message);
        }

        public void Debug(params string[] message)
        {
            FormatMessage("Debug", message);
        }


        public void Info(params string[] message)
        {
            FormatMessage("Info", message);
        }


        public void Warn(params string[] message)
        {
            FormatMessage("Warn", message);
        }

        public void Error(params string[] message)
        {
            FormatMessage("Error", message);
        }

        public void Fatal(params string[] message)
        {
            FormatMessage("Fatal", message);
        }

        public void Error(Exception exception)
        {
        }

        public void Fatal(Exception exception)
        {
        }

        public void Error(Exception exception, params string[] message)
        {
        }

        public void Fatal(Exception exception, params string[] message)
        {
        }

        private void FormatMessage(string type, string[] message)
        {
            Console.WriteLine(type, string.Join(",", message));
        }
    }
}