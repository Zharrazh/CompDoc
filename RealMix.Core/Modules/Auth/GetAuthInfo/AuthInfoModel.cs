using System.Collections.Generic;

namespace RealMix.Core.Modules.Auth.GetAuthInfo
{
    public class AuthInfoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public List<string> Roles { get; set; }
        public bool IsAdmin { get; set; }
    }
}