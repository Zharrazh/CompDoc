using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RealMix.Back.Models;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;

namespace RealMix.Back.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class WidgetController : ControllerBase
    {
        private static readonly List<Widget> _widgets = new List<Widget>{
new Widget { Id = 1, Name = "Stronghold", Product = "Wine - German Riesling", Amount = 46, Price = 8.57M },
new Widget { Id = 2, Name = "Greenlam", Product = "Broom Handle", Amount = 55, Price = 6.45M },
new Widget { Id = 3, Name = "Trippledex", Product = "Pepper Squash", Amount = 52, Price = 4.49M },
new Widget { Id = 4, Name = "Temp", Product = "Tomatoes - Vine Ripe. Yellow", Amount = 65, Price = 4.45M },
new Widget { Id = 5, Name = "Cardify", Product = "Brownies - Two Bite. Chocolate", Amount = 43, Price = 4.86M },
new Widget { Id = 6, Name = "Cardguard", Product = "Cookie Choc", Amount = 72, Price = 4.40M },
new Widget { Id = 7, Name = "Stronghold", Product = "Cheese - Swiss", Amount = 13, Price = 6.72M },
new Widget { Id = 8, Name = "Fix San", Product = "Wine - Cabernet Sauvignon", Amount = 12, Price = 6.41M },
new Widget { Id = 9, Name = "Zathin", Product = "Blueberries", Amount = 65, Price = 2.41M },
new Widget { Id = 10, Name = "Rank", Product = "Milk - Chocolate 500ml", Amount = 8, Price = 6.22M },
new Widget { Id = 11, Name = "Lotstring", Product = "Butter Sweet", Amount = 12, Price = 0.34M },
new Widget { Id = 12, Name = "Domainer", Product = "Sauce Bbq Smokey", Amount = 89, Price = 6.97M },
new Widget { Id = 13, Name = "Zontrax", Product = "Beer - Mcauslan Apricot", Amount = 48, Price = 9.78M },
new Widget { Id = 14, Name = "Flexidy", Product = "Mustard - Individual Pkg", Amount = 58, Price = 8.34M },
new Widget { Id = 15, Name = "Stringtough", Product = "Cilantro / Coriander - Fresh", Amount = 17, Price = 7.87M },
new Widget { Id = 16, Name = "Treeflex", Product = "Beef Tenderloin Aaa", Amount = 25, Price = 7.26M },
new Widget { Id = 17, Name = "Gembucket", Product = "Scallops - 20/30", Amount = 15, Price = 2.44M },
new Widget { Id = 18, Name = "Alpha", Product = "Onions - Green", Amount = 61, Price = 5.79M },
new Widget { Id = 19, Name = "Stim", Product = "Beef - Tenderloin Tails", Amount = 2, Price = 9.41M },
new Widget { Id = 20, Name = "Bitwolf", Product = "Napkin White", Amount = 10, Price = 6.45M },
new Widget { Id = 21, Name = "Bamity", Product = "Kumquat", Amount = 71, Price = 7.14M },
new Widget { Id = 22, Name = "Tin", Product = "Papayas", Amount = 29, Price = 4.48M },
new Widget { Id = 23, Name = "Subin", Product = "Skewers - Bamboo", Amount = 22, Price = 9.18M },
new Widget { Id = 24, Name = "Bitchip", Product = "Beer - True North Lager", Amount = 76, Price = 4.40M },
new Widget { Id = 25, Name = "Kanlam", Product = "Watercress", Amount = 17, Price = 6.29M },
new Widget { Id = 26, Name = "Lotstring", Product = "Wine - Vouvray Cuvee Domaine", Amount = 53, Price = 9.91M },
new Widget { Id = 27, Name = "Tampflex", Product = "Coffee - Cafe Moreno", Amount = 82, Price = 9.24M },
new Widget { Id = 28, Name = "Alphazap", Product = "Snapple - Mango Maddness", Amount = 84, Price = 6.83M },
new Widget { Id = 29, Name = "Solarbreeze", Product = "Ecolab - Orange Frc. Cleaner", Amount = 85, Price = 0.47M },
new Widget { Id = 30, Name = "Cardify", Product = "Extract - Raspberry", Amount = 20, Price = 2.12M },
new Widget { Id = 31, Name = "Wrapsafe", Product = "Bouq All Italian - Primerba", Amount = 96, Price = 6.90M },
new Widget { Id = 32, Name = "Namfix", Product = "Port - 74 Brights", Amount = 48, Price = 5.10M },
new Widget { Id = 33, Name = "Veribet", Product = "Coffee - Ristretto Coffee Capsule", Amount = 93, Price = 0.07M },
new Widget { Id = 34, Name = "Toughjoyfax", Product = "Muffins - Assorted", Amount = 85, Price = 2.31M },
new Widget { Id = 35, Name = "Bytecard", Product = "Foil - Round Foil", Amount = 15, Price = 9.38M },
new Widget { Id = 36, Name = "Duobam", Product = "Taro Root", Amount = 63, Price = 9.91M },
new Widget { Id = 37, Name = "It", Product = "C - Plus. Orange", Amount = 66, Price = 8.77M },
new Widget { Id = 38, Name = "Cardify", Product = "Wine - Magnotta - Red. Baco", Amount = 19, Price = 8.50M },
new Widget { Id = 39, Name = "Ronstring", Product = "Sprouts Dikon", Amount = 3, Price = 5.45M },
new Widget { Id = 40, Name = "Flowdesk", Product = "Thyme - Lemon. Fresh", Amount = 81, Price = 9.36M },
new Widget { Id = 41, Name = "Bamity", Product = "Apricots - Dried", Amount = 70, Price = 2.08M },
new Widget { Id = 42, Name = "Keylex", Product = "Pastry - Carrot Muffin - Mini", Amount = 23, Price = 2.75M },
new Widget { Id = 43, Name = "Flexidy", Product = "Sandwich Wrap", Amount = 18, Price = 5.53M },
new Widget { Id = 44, Name = "Veribet", Product = "Lettuce - Arugula", Amount = 79, Price = 9.33M },
new Widget { Id = 45, Name = "Cookley", Product = "Beef - Sushi Flat Iron Steak", Amount = 27, Price = 6.23M },
new Widget { Id = 46, Name = "Kanlam", Product = "Cheese - Cambozola", Amount = 97, Price = 6.12M },
new Widget { Id = 47, Name = "Vagram", Product = "Turkey Tenderloin Frozen", Amount = 84, Price = 9.77M },
new Widget { Id = 48, Name = "Greenlam", Product = "Wine - Toasted Head", Amount = 32, Price = 8.52M },
new Widget { Id = 49, Name = "Fixflex", Product = "Pasta - Cannelloni. Sheets. Fresh", Amount = 47, Price = 4.47M },
new Widget { Id = 50, Name = "Temp", Product = "Flower - Commercial Bronze", Amount = 27, Price = 9.99M },
new Widget { Id = 51, Name = "Lotlux", Product = "Pie Filling - Cherry", Amount = 38, Price = 0.08M },
new Widget { Id = 52, Name = "Keylex", Product = "Muffin - Banana Nut Individual", Amount = 32, Price = 0.56M },
new Widget { Id = 53, Name = "Tresom", Product = "Lettuce - Spring Mix", Amount = 34, Price = 4.85M },
new Widget { Id = 54, Name = "Cookley", Product = "Coffee - Decaffeinato Coffee", Amount = 16, Price = 1.74M },
new Widget { Id = 55, Name = "Job", Product = "Star Anise. Whole", Amount = 65, Price = 1.93M },
new Widget { Id = 56, Name = "Home Ing", Product = "Petite Baguette", Amount = 77, Price = 9.72M },
new Widget { Id = 57, Name = "Fintone", Product = "Beef - Rib Eye Aaa", Amount = 51, Price = 5.90M },
new Widget { Id = 58, Name = "Biodex", Product = "Remy Red Berry Infusion", Amount = 83, Price = 8.82M },
new Widget { Id = 59, Name = "Duobam", Product = "Five Alive Citrus", Amount = 80, Price = 3.24M },
new Widget { Id = 60, Name = "Stim", Product = "Nantucket - Pomegranate Pear", Amount = 47, Price = 1.93M },
new Widget { Id = 61, Name = "Lotlux", Product = "Pastry - Carrot Muffin - Mini", Amount = 35, Price = 0.39M },
new Widget { Id = 62, Name = "Opela", Product = "Ecolab - Lime - A - Way 4/4 L", Amount = 51, Price = 9.73M },
new Widget { Id = 63, Name = "Pannier", Product = "Plasticspoonblack", Amount = 85, Price = 8.63M },
new Widget { Id = 64, Name = "Lotlux", Product = "Roe - Lump Fish. Black", Amount = 15, Price = 3.51M },
new Widget { Id = 65, Name = "Bigtax", Product = "Tea - Herbal I Love Lemon", Amount = 26, Price = 4.91M },
new Widget { Id = 66, Name = "Temp", Product = "Flour - So Mix Cake White", Amount = 48, Price = 8.75M },
new Widget { Id = 67, Name = "Zontrax", Product = "Eggplant Oriental", Amount = 1, Price = 6.94M },
new Widget { Id = 68, Name = "Subin", Product = "Cheese - Romano. Grated", Amount = 78, Price = 7.85M },
new Widget { Id = 69, Name = "Kanlam", Product = "Scallops - 20/30", Amount = 47, Price = 5.49M },
new Widget { Id = 70, Name = "Stim", Product = "Poppy Seed", Amount = 77, Price = 1.02M },
new Widget { Id = 71, Name = "It", Product = "Pasta - Ravioli", Amount = 7, Price = 3.97M },
new Widget { Id = 72, Name = "Flowdesk", Product = "Tomatoes - Roma", Amount = 16, Price = 2.60M },
new Widget { Id = 73, Name = "Sonair", Product = "Coffee Cup 8oz 5338cd", Amount = 23, Price = 2.96M },
new Widget { Id = 74, Name = "Kanlam", Product = "Sugar - Crumb", Amount = 86, Price = 0.49M },
new Widget { Id = 75, Name = "Latlux", Product = "Appetizer - Veg Assortment", Amount = 60, Price = 6.83M },
new Widget { Id = 76, Name = "Lotstring", Product = "Doilies - 7. Paper", Amount = 8, Price = 4.49M },
new Widget { Id = 77, Name = "Cookley", Product = "Flavouring - Raspberry", Amount = 45, Price = 4.63M },
new Widget { Id = 78, Name = "Kanlam", Product = "Raisin - Dark", Amount = 19, Price = 7.61M },
new Widget { Id = 79, Name = "Veribet", Product = "Dawn Professionl Pot And Pan", Amount = 10, Price = 9.14M },
new Widget { Id = 80, Name = "Fintone", Product = "Pop Shoppe Cream Soda", Amount = 61, Price = 7.46M },
new Widget { Id = 81, Name = "Bitchip", Product = "Soup - Campbells Beef Noodle", Amount = 9, Price = 1.45M },
new Widget { Id = 82, Name = "Temp", Product = "Pasta - Fettuccine. Dry", Amount = 56, Price = 3.90M },
new Widget { Id = 83, Name = "Lotstring", Product = "Wine - Kwv Chenin Blanc South", Amount = 1, Price = 8.09M },
new Widget { Id = 84, Name = "Duobam", Product = "Chocolate - Unsweetened", Amount = 20, Price = 8.10M },
new Widget { Id = 85, Name = "Bitwolf", Product = "Iced Tea Concentrate", Amount = 64, Price = 1.71M },
new Widget { Id = 86, Name = "Andalax", Product = "Energy Drink - Redbull 355ml", Amount = 97, Price = 6.63M },
new Widget { Id = 87, Name = "Alphazap", Product = "Appetizer - Shrimp Puff", Amount = 56, Price = 3.63M },
new Widget { Id = 88, Name = "Sonair", Product = "Marjoram - Fresh", Amount = 35, Price = 7.26M },
new Widget { Id = 89, Name = "Zathin", Product = "Amarula Cream", Amount = 87, Price = 4.31M },
new Widget { Id = 90, Name = "Wrapsafe", Product = "Wine - Red. Harrow Estates. Cab", Amount = 56, Price = 3.63M },
new Widget { Id = 91, Name = "Overhold", Product = "Toamtoes 6x7 Select", Amount = 44, Price = 4.22M },
new Widget { Id = 92, Name = "Flexidy", Product = "Sponge Cake Mix - Chocolate", Amount = 76, Price = 9.57M },
new Widget { Id = 93, Name = "Solarbreeze", Product = "Ecolab - Mikroklene 4/4 L", Amount = 88, Price = 2.01M },
new Widget { Id = 94, Name = "Flowdesk", Product = "Jam - Blackberry. 20 Ml Jar", Amount = 65, Price = 2.86M },
new Widget { Id = 95, Name = "It", Product = "Cream - 10%", Amount = 15, Price = 3.21M },
new Widget { Id = 96, Name = "Keylex", Product = "Wine - Soave Folonari", Amount = 100, Price = 9.22M },
new Widget { Id = 97, Name = "Ventosanzap", Product = "Lamb Shoulder Boneless Nz", Amount = 53, Price = 6.21M },
new Widget { Id = 98, Name = "Bigtax", Product = "Cherries - Fresh", Amount = 45, Price = 5.12M },
new Widget { Id = 99, Name = "Voltsillam", Product = "Crackers - Soda / Saltins", Amount = 43, Price = 4.14M },
new Widget { Id = 100, Name = "Viva", Product = "Quiche Assorted", Amount = 24, Price = 2.98M },
        };

        private static readonly int _pageSize = 10;

        // GET api/values
        [HttpGet]
        [Route(nameof(GetPage))]
        public Page<Widget> GetPage(int page)
        {
            var count = _widgets.Count;
            var items = _widgets.Skip(_pageSize * (page - 1)).Take(_pageSize).ToList();
            return new Page<Widget>(page, _pageSize, count, items);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [Route(nameof(GetItem))]
        public Widget GetItem(int id)
        {
            return _widgets.FirstOrDefault(x => x.Id == id);
        }

        // POST api/values
        [HttpPost]
        [Route(nameof(Save))]
        public void Save([FromBody] Widget model)
        {
            if (model.Id > 0)
            {
                var old = _widgets.FirstOrDefault(x => x.Id == model.Id);
                old.Name = model.Name;
                old.Product = model.Product;
                old.Amount = model.Amount;
                old.Price = model.Price;
            }
            else
            {
                var newId = _widgets.Select(x => x.Id).Max() + 1;
                _widgets.Add(new Widget
                {
                    Id = newId,
                    Name = model.Name,
                    Product = model.Product,
                    Amount = model.Amount,
                    Price = model.Price
                });
            }
        }
    }
}
