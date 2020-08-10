using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyPage
{
    public class GetCompanyPageQuery: PageQuery<CompanyModelFull>
    {
        public string Name {get;set;}
    }
}