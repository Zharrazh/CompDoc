using System;
using System.Threading.Tasks;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.DeleteCompany
{
    public class DeleteCompanyHandler : CommandHandler<DeleteCompanyCommand>
    {
        private readonly DatabaseContext _db;

        public DeleteCompanyHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(DeleteCompanyCommand model)
        {
            var dbModel = await _db.Company.FindAsync(model.Id);
            if (dbModel == null) NotFound();
            _db.Company.Remove(dbModel);
            await _db.SaveChangesAsync();
        }
    }
}