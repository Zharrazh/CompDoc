using System.Collections.Generic;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents
{
    public class DocumentModelFull
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DocumentType Type { get; set; }
        public string Body { get; set; }
        public List<CompanyModel> Companies { get; set; }
    }
}