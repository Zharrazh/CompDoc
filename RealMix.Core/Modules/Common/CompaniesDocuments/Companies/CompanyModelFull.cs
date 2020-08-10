using System.Collections.Generic;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies
{
    public class CompanyModelFull
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LegalName { get; set; }
        public IEnumerable<DocumentModel> Documents {get;set;}
        public CompanyModelFull()
        {
            Documents = new List<DocumentModel>();
        }
    }
}