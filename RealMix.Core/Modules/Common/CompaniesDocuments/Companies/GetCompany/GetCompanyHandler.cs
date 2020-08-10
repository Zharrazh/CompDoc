using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Core.Modules.Common.CompaniesDocuments.Documents;
using RealMix.Db;
using RealMix.Db.DbModels;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompany
{
    public class GetCompanyHandler : QueryHandler<GetCompanyQuery, CompanyModelFull>
    {
        private readonly DatabaseContext _db;

        public GetCompanyHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<CompanyModelFull> Handle(GetCompanyQuery model)
        {
            CompanyDbModel company = await _db.Company.Include(d => d.CompanyDocument).ThenInclude(cd => cd.Document)
                .FirstOrDefaultAsync(i => i.Id == model.Id);
            if (company == null)
            {
                NotFound();
            }

            List<DocumentModel> documents = company.CompanyDocument
                .Select(cd => new DocumentModel
                {
                    Id = cd.Document.Id,
                    Title = cd.Document.Title,
                    Type = cd.Document.Type,
                    Body = cd.Document.Body
                }).ToList();

            return new CompanyModelFull
            {
                Id = company.Id,
                Name = company.Name,
                LegalName = company.LegalName,
                Documents = documents
            };
        }
    }
}