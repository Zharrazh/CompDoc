using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.SaveCompany
{
    public class SaveCompanyCommand : Command
    {
        public string Name { get; set; }
        public string LegalName {get;set;}
    }
}
