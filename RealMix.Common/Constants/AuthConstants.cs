using System.Collections.Generic;

namespace RealMix.Common.Constants
{
    public class AuthConstants
    {
        public const string AdminRoleName = "admin";
        public const string UserRoleName = "user";
        public static Dictionary<char, string> Roles { get; } = new Dictionary<char, string>
        {
            ['a'] = AdminRoleName,
            ['u'] = UserRoleName
        };
    }
}
