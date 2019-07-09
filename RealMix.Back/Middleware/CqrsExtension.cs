using Microsoft.AspNetCore.Builder;

namespace RealMix.Back.Middleware
{
    public static class CqrsExtension
    {
        public static IApplicationBuilder UseCqrs(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CqrsMiddleware>();
        }
    }
}
