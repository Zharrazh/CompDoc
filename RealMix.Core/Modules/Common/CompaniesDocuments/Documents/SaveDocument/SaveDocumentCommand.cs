using System.Collections.Generic;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.SaveDocument
{
    public class SaveDocumentCommand : Command
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DocumentType Type { get; set; }
        public string Body { get; set; }
        public List<int> CompanyIds {get;set;}
    }
}