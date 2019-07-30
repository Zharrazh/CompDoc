using System;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Config.Widget.GetWidgetItem
{
    public class WidgetModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WidgetType Type { get; set; }
        public string Parameters { get; set; }
    }
}
