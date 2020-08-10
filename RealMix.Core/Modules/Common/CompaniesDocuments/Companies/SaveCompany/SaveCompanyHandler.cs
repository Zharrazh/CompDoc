using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;


namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.SaveCompany
{
    public class SaveCompanyHandler : CommandHandler<SaveCompanyCommand>
    {
        private readonly DatabaseContext _db;

        public SaveCompanyHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(SaveCompanyCommand model)
        {
            CompanyDbModel dbModel = new CompanyDbModel();
            if (model.Id < 0)
            {
                dbModel = new CompanyDbModel
                {
                    Name = model.Name,
                    LegalName = model.LegalName
                };
                _db.Company.Add(dbModel);
            }
            else
            {
                dbModel = await _db.Company.Include(x => x.CompanyDocument)
                    .FirstOrDefaultAsync(x => x.Id == model.Id);
                if (dbModel == null) NotFound();
                _db.CompanyDocument.RemoveRange(dbModel.CompanyDocument);
            }
            await _db.SaveChangesAsync();
            foreach (int id in model.DocumentIds)
            {
                _db.CompanyDocument.Add(new CompanyDocumentDbModel { DocumentId = id, CompanyId = dbModel.Id });
            }
            await _db.SaveChangesAsync();
        }
    }
}