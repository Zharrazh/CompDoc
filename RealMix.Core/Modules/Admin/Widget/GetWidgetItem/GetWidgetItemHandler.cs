using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;

namespace RealMix.Core.Modules.Config.Widget.GetWidgetItem
{
    public class GetWidgetItemHandler : QueryHandler<GetWidgetItemQuery, WidgetModel>
    {
        private readonly DatabaseContext _db;

        public GetWidgetItemHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<WidgetModel> Handle(GetWidgetItemQuery model)
        {
            var item = await _db.Widget.AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == model.Id);

            if (item == null)
                NotFound();

            return new WidgetModel
            {
                Id = item.Id,
                Name = item.Name,
                Type = item.Type,
                Parameters = item.Parameters
            };
        }
    }
}
