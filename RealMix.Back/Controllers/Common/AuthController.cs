using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using RealMix.Core.Modules.Common.Auth.GetToken;

namespace RealMix.Back.Controllers.Config
{
    [Route("api/common/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public Task<AuthInfoModel> Token(GetTokenQuery model)
        {
            return _mediator.Send(model);
        }
    }
}
