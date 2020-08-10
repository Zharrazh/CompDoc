using System.Linq;

using System.Threading.Tasks;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.SaveDocument
{
    public class SaveDocumentHandler : CommandHandler<SaveDocumentCommand>
    {
        private readonly DatabaseContext _db;

        public SaveDocumentHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(SaveDocumentCommand model)
        {

            DocumentDbModel dbModel;
            if (model.Id < 0)
            {
                dbModel = new DocumentDbModel
                {
                    Title = model.Title,
                    Type = model.Type,
                    Body = model.Body,
                };
                _db.Document.Add(dbModel);

            }
            else
            {
                dbModel = await _db.Document.Include(x => x.CompanyDocument)
                    .FirstOrDefaultAsync(x => x.Id == model.Id);
                dbModel.Title = model.Title;
                dbModel.Type = model.Type;
                dbModel.Body = model.Body;

                _db.CompanyDocument.RemoveRange(dbModel.CompanyDocument);
            }

            await _db.SaveChangesAsync();


            foreach (int id in model.CompanyIds)
            {
                _db.CompanyDocument.Add(new CompanyDocumentDbModel { DocumentId = dbModel.Id, CompanyId = id });
            }

            await _db.SaveChangesAsync();
        }
    }
}