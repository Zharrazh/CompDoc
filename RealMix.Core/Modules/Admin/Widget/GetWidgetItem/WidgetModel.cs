using System;
using System.Collections.Generic;
using RealMix.Db.Enums;

namespace RealMix.Core.Modules.Admin.Widget.GetWidgetItem
{
    public class WidgetModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public WidgetType Type { get; set; }
        public string Parameters { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
