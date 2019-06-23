namespace api.Models
{
    public class AuthInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string[] Roles { get; set; }
        public bool IsAdmin { get; set; }
    }
}