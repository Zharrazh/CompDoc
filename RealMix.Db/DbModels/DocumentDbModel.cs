using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;
using RealMix.Db.Enums;

namespace RealMix.Db.DbModels
{
    public class DocumentDbModel
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DocumentType Type { get; set; }
        public List<CompanyDocumentDbModel> CompanyDocument { get; set; }

        public void Configure(EntityTypeBuilder<DocumentDbModel> builder)
        {
            builder.ToTable(DbConstants.UserTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Title).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Body).IsRequired();
            builder.Property(x => x.Type).IsRequired();
            builder.HasMany(x => x.CompanyDocument).WithOne(x => x.Document).HasForeignKey(x => x.DocumentId);
        }
    }
}
