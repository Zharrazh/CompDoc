using System;
using FluentMigrator;
using RealMix.Common.Constants;
using RealMix.Db.DbModels;

namespace RealMix.Db.Migrations
{
    [Migration(190630_0021, TransactionBehavior.Default, "Init")]
    public class Init : ForwardOnlyMigration
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

            Create.Table(DbConstants.WidgetTableName)
                .InSchema(DbConstants.SchemaName)
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("name").AsString(50).Nullable()
                .WithColumn("type").AsInt32().NotNullable()
                .WithColumn("parameters").AsString(int.MaxValue).Nullable()
                .WithColumn("created").AsDateTime2().NotNullable()
                .WithColumn("updated").AsDateTime2().NotNullable();

            Create.Table(DbConstants.UserWidgetTableName)
                .InSchema(DbConstants.SchemaName)
                .WithColumn("id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("userid").AsInt32().ForeignKey($"fk_{DbConstants.UserWidgetTableName}_{DbConstants.UserTableName}", DbConstants.UserTableName, "id")
                .WithColumn("widgetid").AsInt32().ForeignKey($"fk_{DbConstants.UserWidgetTableName}_{DbConstants.WidgetTableName}", DbConstants.WidgetTableName, "id")
                .WithColumn("parameters").AsString(int.MaxValue).Nullable()
                .WithColumn("isactive").AsBoolean().NotNullable();

            Insert.IntoTable(DbConstants.UserTableName)
                .InSchema(DbConstants.SchemaName)
                .Row(new
                {
                    name = "Admin Name",
                    login = "admin",
                    passwordhash = "yoxeLnNWycoRRElbYPtVsTQ5rrJYWYWVg/fQPRJi7XJq0yOW5moiK1FsKQuniS/WgggpUelL/ajP2NcYu6uncg==",
                    roles = "au",
                    isactive = true,
                    created = DateTime.UtcNow,
                    updated = DateTime.UtcNow
                });
        }
    }
}
