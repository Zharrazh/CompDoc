using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents
{
    public class DocumentModel
    {
        public int Id {get;set;}
        public string Title {get;set;}
        public DocumentType Type {get;set;}
    }
}