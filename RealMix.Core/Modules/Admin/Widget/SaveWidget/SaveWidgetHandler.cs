using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;

namespace RealMix.Core.Modules.Config.Widget.SaveWidget
{
    public class GetWidgetPageHandler : CommandHandler<SaveWidgetCommand>
    {
        private readonly DatabaseContext _db;

        public GetWidgetPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(SaveWidgetCommand model)
        {
            if (model.Id > 0)
            {
                var item = await _db.Widget.FirstOrDefaultAsync(x => x.Id == model.Id);

                if (item == null)
                    NotFound();

                item.Name = model.Name;
                item.Type = model.Type;
                item.Parameters = model.Parameters;
                item.Updated = DateTime.UtcNow;
            }
            else
            {
                _db.Widget.Add(new WidgetDbModel
                {
                    Name = model.Name,
                    Type = model.Type,
                    Parameters = model.Parameters,
                    Created = DateTime.UtcNow,
                    Updated = DateTime.UtcNow,
                });
            }
            await _db.SaveChangesAsync();
        }
    }
}
