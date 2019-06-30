using System;
using System.Collections.Generic;

namespace RealMix.Core.Modules.Auth.GetToken
{
    public class AuthInfoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public List<string> Roles { get; set; }
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
    }
}
