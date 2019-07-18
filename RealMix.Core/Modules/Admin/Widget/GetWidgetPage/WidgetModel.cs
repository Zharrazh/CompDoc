using System;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Config.Widget.GetWidgetPage
{
    public class WidgetModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WidgetType Type { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
