using Microsoft.VisualBasic;
using RealMix.Common.Models;

namespace RealMix.Core.Infrastructure.Models
{
    public class PageQuery<T> : Query<Page<T>>
    {
        public int Page { get; set; } = 1;

        public int PageSize {get;set;} = RealMix.Common.Constants.CommonConstants.PageSize; //Делаю возможно что-то странное
        public string SortBy { get; set; }
        public string OrderBy { get; set; }
    }
    public class ItemQuery<T> : Query<T>
    {
        public int Id { get; set; }
    }
    public class ItemCommand : Command
    {
        public int Id { get; set; }
    }
}
