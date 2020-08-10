using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;



namespace RealMix.Db.DbModels
{
    public class CompanyDocumentDbModel : IEntityTypeConfiguration<CompanyDocumentDbModel>
    {
        public int Id {get;set;}
        public int CompanyId { get; set; }
        public int DocumentId { get; set; }

        public CompanyDbModel Company { get; set; }

        public DocumentDbModel Document { get; set; }

        public void Configure(EntityTypeBuilder<CompanyDocumentDbModel> builder)
        {
            builder.ToTable(DbConstants.CompanyDocumentTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.HasOne(x => x.Company).WithMany(x => x.CompanyDocument).HasForeignKey(x => x.CompanyId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Document).WithMany(x => x.CompanyDocument).HasForeignKey(x => x.DocumentId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
