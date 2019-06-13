using System;
using System.Collections.Generic;

namespace api.Models
{
    public class Widget
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Product { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }
    }
}