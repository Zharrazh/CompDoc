using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using RealMix.Common.Extensions;

namespace RealMix.Core.Modules.Auth.GetAuthInfo
{
    public class GetAuthInfoHandler : IRequestHandler<GetAuthInfoRequest, AuthInfoModel>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAuthInfoHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<AuthInfoModel> Handle(GetAuthInfoRequest request, CancellationToken cancellationToken)
        {
            var user = _httpContextAccessor.HttpContext.User;

            if (user.Identity.IsAuthenticated)
            {
                var roles = user.GetRoles();
                return Task.FromResult(new AuthInfoModel
                {
                    Id = user.GetUserId(),
                    IsAdmin = roles.Contains("admin"),
                    Login = user.GetLogin(),
                    Name = user.GetFullName(),
                    Roles = user.GetRoles()
                });
            }
            return Task.FromResult(new AuthInfoModel
            {
                Id = 0,
                IsAdmin = false,
                Login = null,
                Name = null,
                Roles = new List<string>()
            });
        }
    }
}