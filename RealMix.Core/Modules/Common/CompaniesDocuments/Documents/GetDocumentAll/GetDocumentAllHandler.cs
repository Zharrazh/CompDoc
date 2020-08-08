using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentAll
{
    public class GetDocumentAllHandler : QueryHandler<GetDocumentAllQuery, List<DocumentModel>>
    {
        private readonly DatabaseContext _db;

        public GetDocumentAllHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<List<DocumentModel>> Handle(GetDocumentAllQuery model)
        {
            var items = await _db.Document.Select(d => new DocumentModel { Id = d.Id, Title = d.Title, Type = d.Type }).ToListAsync();

            return items;
        }
    }
}