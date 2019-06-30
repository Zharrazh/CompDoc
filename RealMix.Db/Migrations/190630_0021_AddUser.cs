using FluentMigrator;
using RealMix.Common.Constants;

namespace RealMix.Db.Migrations
{
    [Migration(190630_0021, TransactionBehavior.Default, "AddUser")]
    public class AddUser : ForwardOnlyMigration
    {
        public override void Up()
        {
            Create.Table(DbConstants.UserTableName)
                .InSchema(DbConstants.SchemaName)
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("name").AsString(50).Nullable()
                .WithColumn("login").AsString(50).NotNullable()
                .WithColumn("passwordhash").AsString(50).NotNullable()
                .WithColumn("roles").AsString(10).Nullable()
                .WithColumn("isactive").AsString(50).Nullable()
                .WithColumn("lastlogindate").AsDateTime2().Nullable()
                .WithColumn("created").AsDateTime2().NotNullable()
                .WithColumn("updated").AsDateTime2().NotNullable();
        }
    }
}
