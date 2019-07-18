using RealMix.Core.Infrastructure.Models;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Config.Widget.GetWidgetPage
{
    public class GetWidgetPageQuery : PageQuery<WidgetModel>
    {
        public WidgetType? Type { get; set; }
        public string Name { get; set; }
    }
}
