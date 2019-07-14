using RealMix.Core.Infrastructure.Models;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Admin.Widget.SaveWidget
{
    public class SaveWidgetCommand : Command
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WidgetType Type { get; set; }
        public string Parameters { get; set; }
    }
}
