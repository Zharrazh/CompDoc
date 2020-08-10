using System.Linq;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;
using System.Threading.Tasks;
using System.Collections.Generic;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies;

namespace RealMix.Core.Modules.Common.CompaniesDocuments.Documents.GetDocument
{
    public class GetDocumentHandler : QueryHandler<GetDocumentQuery, DocumentModelFull>
    {
        private readonly DatabaseContext _db;

        public GetDocumentHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<DocumentModelFull> Handle(GetDocumentQuery model)
        {
            DocumentDbModel document = await _db.Document.Include(d => d.CompanyDocument)
                .ThenInclude(cd => cd.Company).FirstOrDefaultAsync(i => i.Id == model.Id);

            if (document == null)
            {
                NotFound();
            }

            List<CompanyModel> companies = document.CompanyDocument
                .Select(cd => new CompanyModel
                {
                    Id = cd.Company.Id,
                    Name = cd.Company.Name,
                    LegalName = cd.Company.LegalName
                }).ToList();

            return new DocumentModelFull
            {
                Id = document.Id,
                Title = document.Title,
                Type = document.Type,
                Body = document.Body,
                Companies = companies
            };
        }
    }
}