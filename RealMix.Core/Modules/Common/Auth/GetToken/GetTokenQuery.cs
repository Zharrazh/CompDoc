using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Common.Auth.GetToken
{
    public class GetTokenQuery : Query<AuthInfoModel>
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
