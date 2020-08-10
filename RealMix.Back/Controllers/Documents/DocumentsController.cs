using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;
using MediatR;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentPage;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents.SaveDocument;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents.DeleteDocument;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocument;
using System.Collections.Generic;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentAll;

namespace RealMix.Back.Controllers.Documents
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly IMediator _mediator;


        public DocumentsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<Page<DocumentModelFull>> GetPage([FromQuery] GetDocumentPageQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpGet("{id}")]
        public async Task<DocumentModelFull> GetDocument([FromRoute] GetDocumentQuery model)
        {
            return await _mediator.Send(model);
        }
        [HttpGet("all")]
        public async Task<List<DocumentModel>> GetDocumentAll([FromQuery] GetDocumentAllQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpPost]
        public async Task Save([FromBody] SaveDocumentCommand model)
        {
            await _mediator.Send(model);
        }

        [HttpPost("{id}")]
        public async Task Delete([FromRoute] DeleteDocumentCommand model)
        {
            await _mediator.Send(model);
        }
    }
}