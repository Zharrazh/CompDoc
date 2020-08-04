using FluentMigrator;
using RealMix.Common.Constants;
using RealMix.Db.DbModels;

namespace RealMix.Db.Migrations
{
    [Profile("Development")]
    public class CreateDevSeedData : Migration
    {

        public override void Up()
        {
            Insert.IntoTable(DbConstants.CompanyTableName)
                .InSchema(DbConstants.SchemaName)
                .Row(new CompanyDbModel
                {
                    Name = "Apple",
                    LegalName = "Apple-corp-sad"
                })
                .Row(new CompanyDbModel
                {
                    Name = "Google",
                    LegalName = "Google-corp-sad"
                })
                .Row(new CompanyDbModel
                {
                    Name = "Tesla",
                    LegalName = "Tesla-corp-sad"
                })
                .Row(new CompanyDbModel
                {
                    Name = "Sme",
                    LegalName = "Sme-corp-sad"
                });
        }

        public override void Down()
        {
        }


    }
}
