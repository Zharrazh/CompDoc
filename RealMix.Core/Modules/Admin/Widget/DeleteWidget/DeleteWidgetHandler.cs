using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using RealMix.Db.DbModels;

namespace RealMix.Core.Modules.Admin.Widget.DeleteWidget
{
    public class DeleteWidgetHandler : CommandHandler<DeleteWidgetCommand>
    {
        private readonly DatabaseContext _db;

        public DeleteWidgetHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task Handle(DeleteWidgetCommand model)
        {
            _db.Widget.Remove(new WidgetDbModel { Id = model.Id });
            await _db.SaveChangesAsync();
        }
    }
}
