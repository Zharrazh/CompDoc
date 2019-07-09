using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealMix.Common.Constants;

namespace RealMix.Db.DbModels
{
    public class UserWidgetDbModel : IEntityTypeConfiguration<UserWidgetDbModel>
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WidgetId { get; set; }
        public string Parameters { get; set; }
        public bool IsActive { get; set; }
        public UserDbModel User { get; set; }
        public WidgetDbModel Widget { get; set; }

        public void Configure(EntityTypeBuilder<UserWidgetDbModel> builder)
        {
            builder.ToTable(DbConstants.UserWidgetTableName).HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();
            builder.HasOne(x => x.User).WithMany(x => x.UserWidget).HasForeignKey(x => x.UserId);
            builder.HasOne(x => x.Widget).WithMany(x => x.UserWidget).HasForeignKey(x => x.WidgetId);
        }
    }
}
