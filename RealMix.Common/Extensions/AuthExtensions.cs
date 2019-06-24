using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace RealMix.Common.Extensions
{
    public static class AuthExtensions
    {
        public static string GetLogin(this IPrincipal self)
        {
            var claimsPrincipal = self as ClaimsPrincipal;
            return claimsPrincipal?.FindFirst(x => x.Type == ClaimTypes.Name)?.Value;
        }

        public static string GetFullName(this IPrincipal self)
        {
            var claimsPrincipal = self as ClaimsPrincipal;
            var lastName = claimsPrincipal?.FindFirst(x => x.Type == ClaimTypes.Surname)?.Value;
            var firstName = claimsPrincipal?.FindFirst(x => x.Type == ClaimTypes.GivenName)?.Value;

            if (string.IsNullOrWhiteSpace(firstName) && string.IsNullOrWhiteSpace(lastName))
                return GetLogin(self);

            return string.IsNullOrWhiteSpace(lastName)
                ? firstName
                : firstName + " " + lastName;
        }

        public static int GetUserId(this IPrincipal self)
        {
            return int.Parse(((ClaimsPrincipal)self).FindFirst(x => x.Type == ClaimTypes.NameIdentifier).Value);
        }

        public static List<string> GetRoles(this IPrincipal self)
        {
            var claimsPrincipal = self as ClaimsPrincipal;
            return claimsPrincipal?.FindAll(x => x.Type == ClaimTypes.Role)?.Select(x => x.Value).ToList() ?? new List<string>();
        }
    }
}
