using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;



namespace RealMix.Db.DbModels
{
    public class CompanyDbModel : IEntityTypeConfiguration<CompanyDbModel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LegalName { get; set; }
        public List<CompanyDocumentDbModel> CompanyDocument { get; set; }
        

        public void Configure(EntityTypeBuilder<CompanyDbModel> builder)
        {
            builder.ToTable(DbConstants.CompanyTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.Property(x => x.LegalName).HasMaxLength(50).IsRequired();
            builder.HasMany(x=>x.CompanyDocument).WithOne(x=>x.Company).HasForeignKey(x=>x.CompanyId);
        }
    }
}
