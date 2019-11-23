using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Services;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using System.Collections.Generic;
using System.Security.Claims;
using RealMix.Db.DbModels;
using RealMix.Common.Constants;
using RealMix.Common.Extensions;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using RealMix.Core.Models.Config;

namespace RealMix.Core.Modules.Common.Auth.GetToken
{
    public class GetTokenHandler : QueryHandler<GetTokenQuery, AuthInfoModel>
    {
        private readonly DatabaseContext _db;
        private readonly IHashService _hashService;
        private readonly IConfiguration _config;

        public GetTokenHandler(DatabaseContext db, IHashService hashService, IConfiguration config)
        {
            _db = db;
            _hashService = hashService;
            _config = config;
        }

        public override async Task<AuthInfoModel> Handle(GetTokenQuery model)
        {
            var hash = _hashService.Hash(model.Password);
            var user = await _db.User.FirstOrDefaultAsync(x => x.Login == model.Login && x.PasswordHash == hash);
            if (user == null)
                BadRequest("Wrong username or password");
            if (!user.IsActive || string.IsNullOrWhiteSpace(user.Roles))
                BadRequest("You do not have permission to access the service");

            var authConfig = _config.GetSection("Auth").Get<AuthConfigModel>();
            var expires = DateTime.UtcNow.AddMinutes(authConfig.Expires);

            var roles = GetRoles(user.Roles);
            var identity = GetClaimsIdentity(user, roles);
            var token = GetToken(identity, expires, authConfig);

            return new AuthInfoModel
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Roles = roles,
                Expires = expires,
                IsAdmin = roles.Contains(AuthConstants.AdminRoleName),
                IsAuth = true,
                Token = token
            };
        }

        private string GetToken(ClaimsIdentity identity, DateTime expires, AuthConfigModel authConfig)
        {
            var handler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.Key));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token = handler.CreateJwtSecurityToken(subject: identity,
                signingCredentials: signingCredentials,
                audience: authConfig.Audience,
                issuer: authConfig.Issuer,
                expires: expires);

            return handler.WriteToken(token);
        }

        private ClaimsIdentity GetClaimsIdentity(UserDbModel user, List<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.GivenName, user.Name)
            };

            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            return new ClaimsIdentity(claims);
        }

        private List<string> GetRoles(string roles)
        {
            return roles
                .Select(key => AuthConstants.Roles.GetValueOrDefault(key))
                .Where(role => !string.IsNullOrEmpty(role))
                .ToList();
        }
    }
}
