using System;

namespace Logging
{
    public class LogNullObject : ILog
    {
        public void Trace(params string[] message)
        {
        }

        public void Debug(params string[] message)
        {
        }


        public void Info(params string[] message)
        {
        }


        public void Warn(params string[] message)
        {
        }

        public void Error(params string[] message)
        {
        }

        public void Fatal(params string[] message)
        {
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
    }
}