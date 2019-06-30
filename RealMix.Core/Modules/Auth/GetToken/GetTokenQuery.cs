using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Auth.GetToken
{
    public class GetTokenQuery : Query<AuthInfoModel>
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
