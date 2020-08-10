﻿using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using RealMix.Common.Constants;
using RealMix.Db.DbModels;

namespace RealMix.Db
{
    public class DatabaseContext : DbContext
    {
        public DbSet<UserDbModel> User { get; set; }
        public DbSet<WidgetDbModel> Widget { get; set; }
        public DbSet<UserWidgetDbModel> UserWidget { get; set; }
        public DbSet<CompanyDbModel> Company { get; set; }
        public DbSet<DocumentDbModel> Document { get; set; }
        public DbSet<CompanyDocumentDbModel> CompanyDocument {get;set;}

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(DbConstants.SchemaName);
            modelBuilder.Entity<CompanyDbModel>().HasMany(x=>x.CompanyDocument).WithOne(x=>x.Company).HasForeignKey(x=>x.CompanyId);
            modelBuilder.Entity<DocumentDbModel>().HasMany(x=>x.CompanyDocument).WithOne(x=>x.Document).HasForeignKey(x=>x.DocumentId);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
        }
    }
}
