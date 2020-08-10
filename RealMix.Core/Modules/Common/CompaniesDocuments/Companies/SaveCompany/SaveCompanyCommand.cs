using System.Collections.Generic;
using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.SaveCompany
{
    public class SaveCompanyCommand : Command
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LegalName { get; set; }
        public IEnumerable<int> DocumentIds {get;set;}
    }
}
