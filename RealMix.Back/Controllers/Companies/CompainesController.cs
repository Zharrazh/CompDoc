using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;
using MediatR;
using RealMix.Core.Modules.Config.Widget.SaveWidget;
using RealMix.Core.Modules.Config.Widget.GetWidgetPage;
using RealMix.Core.Modules.Config.Widget.GetWidgetItem;
using Microsoft.AspNetCore.Authorization;
using RealMix.Common.Constants;
using RealMix.Core.Modules.Config.Widget.DeleteWidget;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyPage;

namespace RealMix.Back.Controllers.Config
{

    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IMediator _mediator;


        public CompaniesController(IMediator mediator)
        {
            _mediator = mediator;
        }


        public async Task<Page<CompanyModel>> GetPage([FromQuery] GetCompanyPageQuery model)
        {
            return await _mediator.Send(model);
        }
        /*[HttpGet]
        public async Task<Page<Core.Modules.Config.Widget.GetWidgetPage.WidgetModel>> GetPage([FromQuery]GetWidgetPageQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpGet("{id}")]
        public async Task<Core.Modules.Config.Widget.GetWidgetItem.WidgetModel> GetItem([FromRoute]GetWidgetItemQuery model)
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
        }*/
    }
}
