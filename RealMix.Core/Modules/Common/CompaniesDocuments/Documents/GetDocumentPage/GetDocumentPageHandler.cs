using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Common.Models;
using RealMix.Core.Infrastructure.Extensions;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentPage
{
    public class GetDocumentPageHandler : QueryHandler<GetDocumentPageQuery, Page<DocumentModelFull>>
    {
        private readonly DatabaseContext _db;

        public GetDocumentPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<DocumentModelFull>> Handle(GetDocumentPageQuery model)
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
                .Select(x => new DocumentModelFull
                {
                    Id = x.Id,
                    Title = x.Title,
                    Body = x.Body,
                    Type = x.Type,
                    Companies = x.CompanyDocument.Select(x =>
                        new Companies.CompanyModel
                        {
                            Id = x.Company.Id,
                            Name = x.Company.Name,
                            LegalName = x.Company.LegalName
                        })
                })
                .ToListAsync();

            return new Page<DocumentModelFull>(items, count, model.Page, model.PageSize);
        }
    }
}