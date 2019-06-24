using System;

namespace RealMix.Common.Services
{
    public interface ILogger<T>
    {
        void Debug(string message);
        void Debug(Exception exception);
        void Debug(string message, Exception exception);

        void Error(string message);
        void Error(Exception exception);
        void Error(string message, Exception exception);

        void Warn(string message);
        void Warn(Exception exception);
        void Warn(string message, Exception exception);

        void Info(string message);
        void Info(Exception exception);
        void Info(string message, Exception exception);

        void Trace(string message);
        void Trace(Exception exception);
        void Trace(string message, Exception exception);
    }
}
