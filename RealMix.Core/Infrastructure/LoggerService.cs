using System;
using System.Diagnostics;
using NLog;
using RealMix.Common.Services;

namespace RealMix.Core.Infrastructure
{
    public class LoggerService<T> : ILogger<T>
    {
        internal static ILogger<T> Logger()
        {
            return new LoggerService<T>();
        }

        private readonly ILogger _logger = LogManager.GetLogger(typeof(T).FullName);

        public void Debug(Exception exception)
        {
            _logger.Debug(exception.Demystify());
        }

        public void Debug(string message)
        {
            _logger.Debug(message);
        }

        public void Debug(string message, Exception exception)
        {
            _logger.Debug(message);
            _logger.Debug(exception.Demystify());
        }

        public void Error(Exception exception)
        {
            _logger.Error(exception.Demystify());
        }

        public void Error(string message)
        {
            _logger.Error(message);
        }

        public void Error(string message, Exception exception)
        {
            _logger.Error(message);
            _logger.Error(exception.Demystify());
        }

        public void Info(Exception exception)
        {
            _logger.Info(exception.Demystify());
        }

        public void Info(string message)
        {
            _logger.Info(message);
        }

        public void Info(string message, Exception exception)
        {
            _logger.Info(message);
            _logger.Info(exception.Demystify());
        }

        public void Trace(Exception exception)
        {
            _logger.Trace(exception.Demystify());
        }

        public void Trace(string message)
        {
            _logger.Trace(message);
        }

        public void Trace(string message, Exception exception)
        {
            _logger.Trace(message);
            _logger.Trace(exception.Demystify());
        }

        public void Warn(Exception exception)
        {
            _logger.Warn(exception.Demystify());
        }

        public void Warn(string message)
        {
            _logger.Warn(message);
        }

        public void Warn(string message, Exception exception)
        {
            _logger.Warn(message);
            _logger.Warn(exception.Demystify());
        }
    }
}
