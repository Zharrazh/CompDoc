using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using RealMix.Core.Modules.Auth.GetToken;

namespace RealMix.Back.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public Task<AuthInfoModel> Token(GetTokenQuery model)
        {
            return _mediator.Send(model);
        }
    }
}
