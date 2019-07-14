using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;
using MediatR;
using RealMix.Core.Modules.Admin.Widget.SaveWidget;
using RealMix.Core.Modules.Admin.Widget.GetWidgetPage;
using RealMix.Core.Modules.Admin.Widget.GetWidgetItem;
using Microsoft.AspNetCore.Authorization;
using RealMix.Common.Constants;
using RealMix.Core.Modules.Admin.Widget.DeleteWidget;

namespace RealMix.Back.Controllers.Admin
{
    [Authorize(Roles = AuthConstants.AdminRoleName)]
    [Route("api/admin/[controller]")]
    [ApiController]
    public class WidgetController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WidgetController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<Page<Core.Modules.Admin.Widget.GetWidgetPage.WidgetModel>> GetPage([FromQuery]GetWidgetPageQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpGet("{id}")]
        public async Task<Core.Modules.Admin.Widget.GetWidgetItem.WidgetModel> GetItem([FromRoute]GetWidgetItemQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpPost]
        public async Task Save([FromBody] SaveWidgetCommand model)
        {
            await _mediator.Send(model);
        }

        [HttpDelete("{id}")]
        public async Task Delete([FromRoute] DeleteWidgetCommand model)
        {
            await _mediator.Send(model);
        }
    }
}
