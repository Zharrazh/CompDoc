using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Common.Models;
using RealMix.Core.Infrastructure.Extensions;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyPage
{
    public class GetCompanyPageHandler : QueryHandler<GetCompanyPageQuery, Page<CompanyModel>>
    {
        private readonly DatabaseContext _db;

        public GetCompanyPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<CompanyModel>> Handle(GetCompanyPageQuery model)
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
                .Select(x => new CompanyModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    LegalName = x.LegalName
                })
                .ToListAsync();

            return new Page<CompanyModel>(items, count, model.Page, model.PageSize);
        }
    }
}