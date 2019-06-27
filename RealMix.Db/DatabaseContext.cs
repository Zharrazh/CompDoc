using Microsoft.EntityFrameworkCore;
using RealMix.Db.DbModels;

namespace RealMix.Db
{
    public class DatabaseContext : DbContext
    {
        public DbSet<UserDbModel> User { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
    }
}
