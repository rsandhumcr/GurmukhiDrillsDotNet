using System;

namespace Logging
{
    public interface ILog
    {
        void Trace(params string[] message);
        void Debug(params string[] message);
        void Info(params string[] message);
        void Warn(params string[] message);
        void Error(params string[] message);
        void Fatal(params string[] message);
        void Error(Exception exception);
        void Fatal(Exception exception);
        void Error(Exception exception, params string[] message);
        void Fatal(Exception exception, params string[] message);
    }
}
