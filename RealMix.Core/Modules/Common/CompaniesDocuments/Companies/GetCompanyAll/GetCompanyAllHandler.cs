using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyAll
{
    public class GetCompanyAllHandler : QueryHandler<GetCompanyAllQuery, List<CompanyModel>>
    {
        private readonly DatabaseContext _db;

        public GetCompanyAllHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<List<CompanyModel>> Handle(GetCompanyAllQuery model)
        {
            var items = await _db.Company.Select(d => new CompanyModel { Id = d.Id, Name = d.Name, LegalName = d.LegalName }).ToListAsync();

            return items;
        }
    }
}