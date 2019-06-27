using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealMix.Db.DbModels
{
    public class UserDbModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Login { get; set; }

        [MaxLength(50)]
        public string PasswordHash { get; set; }

        [MaxLength(10)]
        public string Roles { get; set; }

        public bool IsActive { get; set; }

        public DateTime LastLoginDate { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}
