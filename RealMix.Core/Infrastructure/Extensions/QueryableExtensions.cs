using System.Linq;
using RealMix.Common.Constants;
using RealMix.Core.Infrastructure.Services;

namespace RealMix.Core.Infrastructure.Extensions
{
    public static class QueryableExtensions
    {
        public static OrderService<T> Order<T>(this IQueryable<T> query, string orderBy, string sortBy)
        {
            return new OrderService<T>(query, orderBy, sortBy);
        }

        public static IQueryable<T> Page<T>(this IQueryable<T> query, int page, int pageSize = CommonConstants.PageSize)
        {
            return query.Skip((page - 1) * pageSize).Take(pageSize);
        }

    }
}
