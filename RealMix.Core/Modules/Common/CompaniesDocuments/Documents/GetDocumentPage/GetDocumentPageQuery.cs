using RealMix.Core.Infrastructure.Models;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocumentPage
{
    public class GetDocumentPageQuery : PageQuery<DocumentModel>
    {
        public string Title { get; set; }
    }
}