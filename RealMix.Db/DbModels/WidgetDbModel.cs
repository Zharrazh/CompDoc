using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;
using RealMix.Db.Enums;

namespace RealMix.Db.DbModels
{
    public class WidgetDbModel : IEntityTypeConfiguration<WidgetDbModel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WidgetType Type { get; set; }
        public string Parameters { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public List<UserWidgetDbModel> UserWidget { get; set; }

        public void Configure(EntityTypeBuilder<WidgetDbModel> builder)
        {
            builder.ToTable(DbConstants.WidgetTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.HasMany(x => x.UserWidget).WithOne(x => x.Widget).HasForeignKey(x => x.WidgetId);
        }
    }
}
