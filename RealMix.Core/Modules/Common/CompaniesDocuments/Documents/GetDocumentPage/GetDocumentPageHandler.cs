using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Common.Models;
using RealMix.Core.Infrastructure.Extensions;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentPage
{
    public class GetDocumentPageHandler : QueryHandler<GetDocumentPageQuery, Page<DocumentModel>>
    {
        private readonly DatabaseContext _db;

        public GetDocumentPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<DocumentModel>> Handle(GetDocumentPageQuery model)
        {
            var query = _db.Document.AsNoTracking();

            query = query.Filter().Filter(() => model.Title, entity => entity.Title.Contains(model.Title)).Apply();


            var count = await query.CountAsync();
            var items = await query
                .Order(model.OrderBy, model.SortBy)
                    .Field("id", x => x.Id)
                    .Field("title", x => x.Title)
                    .Field("type", x => x.Type)
                    .Default(x => x.Id)
                    .Apply()
                .Page(model.Page, model.PageSize)
                .Select(x => new DocumentModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Type = x.Type
                })
                .ToListAsync();

            return new Page<DocumentModel>(items, count, model.Page, model.PageSize);
        }
    }
}