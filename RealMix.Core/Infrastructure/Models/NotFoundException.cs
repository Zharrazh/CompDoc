using System;

namespace RealMix.Core.Infrastructure.Models
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
    }
}
