using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Core.Infrastructure.Extensions;
using RealMix.Db;
using RealMix.Common.Models;

namespace RealMix.Core.Modules.Admin.Widget.GetWidgetPage
{
    public class GetWidgetPageHandler : QueryHandler<GetWidgetPageQuery, Page<WidgetModel>>
    {
        private readonly DatabaseContext _db;

        public GetWidgetPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<WidgetModel>> Handle(GetWidgetPageQuery model)
        {
            var query = _db.Widget.AsNoTracking();

            query = query.Filter()
                .Filter(() => model.Name, entity => entity.Name.Contains(model.Name))
                .Filter(() => model.Type, entity => entity.Type == model.Type)
                .Apply();

            var count = await query.CountAsync();

            query = query.Order(model.OrderBy, model.SortBy)
                .Field("id", x => x.Id)
                .Field("type", x => x.Type)
                .Field("created", x => x.Created)
                .Field("updated", x => x.Updated)
                .Default(x => x.Name)
                .Apply();

            var items = await query
                .Page(model.Page)
                .Select(x => new WidgetModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    Created = x.Created,
                    Updated = x.Updated
                })
                .ToListAsync();

            return new Page<WidgetModel>(items, count, model.Page);
        }
    }
}
