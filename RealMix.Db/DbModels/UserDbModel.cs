using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;

namespace RealMix.Db.DbModels
{
    public class UserDbModel : IEntityTypeConfiguration<UserDbModel>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Roles { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public List<UserWidgetDbModel> UserWidget { get; set; }

        public void Configure(EntityTypeBuilder<UserDbModel> builder)
        {
            builder.ToTable(DbConstants.UserTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.Property(x => x.Name).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Login).HasMaxLength(50).IsRequired();
            builder.Property(x => x.PasswordHash).HasMaxLength(50);
            builder.Property(x => x.Roles).HasMaxLength(10);
            builder.HasMany(x => x.UserWidget).WithOne(x => x.User).HasForeignKey(x => x.UserId);
        }
    }
}
