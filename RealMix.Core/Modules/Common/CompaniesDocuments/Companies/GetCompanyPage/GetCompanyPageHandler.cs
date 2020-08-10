using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Common.Models;
using RealMix.Core.Infrastructure.Extensions;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyPage
{
    public class GetCompanyPageHandler : QueryHandler<GetCompanyPageQuery, Page<CompanyModelFull>>
    {
        private readonly DatabaseContext _db;

        public GetCompanyPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<CompanyModelFull>> Handle(GetCompanyPageQuery model)
        {
            var query = _db.Company.AsNoTracking();

            query = query.Filter().Filter(() => model.Name, entity => entity.Name.Contains(model.Name)).Apply();


            var count = await query.CountAsync();
            var items = await query
                .Order(model.OrderBy, model.SortBy)
                    .Field("id", x => x.Id)
                    .Field("name", x => x.Name)
                    .Field("legalName", x => x.LegalName)
                    .Default(x => x.Id)
                    .Apply()
                .Page(model.Page, model.PageSize)
                .Select(x => new CompanyModelFull
                {
                    Id = x.Id,
                    Name = x.Name,
                    LegalName = x.LegalName,
                    Documents = x.CompanyDocument.Select(x => 
                        new Documents.DocumentModel 
                        { 
                            Id = x.Document.Id,
                             Title = x.Document.Title,
                              Type = x.Document.Type,
                               Body = x.Document.Body
                        })
                })
                .ToListAsync();

            return new Page<CompanyModelFull>(items, count, model.Page, model.PageSize);
        }
    }
}