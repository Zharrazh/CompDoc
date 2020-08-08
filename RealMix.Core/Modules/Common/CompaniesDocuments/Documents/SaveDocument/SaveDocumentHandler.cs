using System.Linq;

using System.Threading.Tasks;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;
using Microsoft.EntityFrameworkCore;
using System;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.SaveDocument
{
    public class SaveDocumentHandler : CommandHandler<SaveDocumentCommand, DocumentModel>
    {
        private readonly DatabaseContext _db;

        public SaveDocumentHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<DocumentModel> Handle(SaveDocumentCommand model)
        {

            DocumentDbModel dbModel = new DocumentDbModel
            {
                Id = model.Id,
                Title = model.Title,
                Body = model.Body,
                Type = model.Type
            };
            if (model.Id < 0)
            {
                dbModel = new DocumentDbModel
                {
                    Title = model.Title,
                    Type = model.Type,
                    Body = model.Body
                };
                _db.Document.Add(dbModel);

            }
            else
            {
                dbModel = await _db.Document.FindAsync(model.Id);
                dbModel.Title = model.Title;
                dbModel.Type = model.Type;
                dbModel.Body = model.Body;
                foreach(var cd in _db.CompanyDocument.Where(x=>x.DocumentId==model.Id))
                {
                    _db.Entry(cd).State = EntityState.Deleted;
                }
                
            }

            await _db.SaveChangesAsync();
            
            
            foreach (int id in model.CompanyIds)
            {
                _db.CompanyDocument.Add(new CompanyDocumentDbModel { DocumentId = dbModel.Id, CompanyId = id });
            }
            await _db.SaveChangesAsync();
            return new DocumentModel
            {
                Id = dbModel.Id,
                Title = dbModel.Title,
                Type = dbModel.Type
            };
        }
    }
}