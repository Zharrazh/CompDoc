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
            _db.Company.Add(new CompanyDbModel
            {
                Name = model.Name,
                LegalName = model.LegalName
            });

            await _db.SaveChangesAsync();
        }
    }
}