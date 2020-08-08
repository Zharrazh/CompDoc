using System.Threading.Tasks;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.DeleteDocument
{
    public class DeleteDocumentHandler : CommandHandler<DeleteDocumentCommand>
    {
        private readonly DatabaseContext _db;

        public DeleteDocumentHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(DeleteDocumentCommand model)
        {
            _db.Document.Remove(new DocumentDbModel { Id = model.Id });
            await _db.SaveChangesAsync();
        }

    }
}