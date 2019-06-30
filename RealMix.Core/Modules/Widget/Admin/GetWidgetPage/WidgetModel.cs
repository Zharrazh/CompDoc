using System;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Widget.Admin.GetWidgetPage
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
