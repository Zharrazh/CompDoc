using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RealMix.Core.Infrastructure.Services;
using RealMix.Core.Infrastructure.Models;
using RealMix.Db;
using System.Collections.Generic;
using System.Security.Claims;
using RealMix.Db.DbModels;
using RealMix.Common.Constants;
using RealMix.Common.Extensions;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using RealMix.Core.Models.Config;
using RealMix.Common.Models;
using RealMix.Core.Infrastructure.Extensions;

namespace RealMix.Core.Modules.Widget.Admin.GetWidgetPage
{
    public class GetWidgetPageHandler : QueryHandler<GetWidgetPageQuery, Page<WidgetModel>>
    {
        private readonly DatabaseContext _db;

        public GetWidgetPageHandler(DatabaseContext db)
        {
            _db = db;
        }

        public override async Task<Page<WidgetModel>> Handle(GetWidgetPageQuery model)
        {
            IQueryable<WidgetDbModel> query = _db.Widget.AsNoTracking();

            //query = FilterQuery(query, filter.Filters);

            var count = await query.CountAsync();

            query = query.Order(model.OrderBy, model.SortBy)
            .Field("id", x => x.Id)
            .Field("type", x => x.Type)
            .Field("created", x => x.Created)
            .Field("updated", x => x.Updated)
            .Default(x => x.Name)
            .Apply();

            var items = await query
                .Page(model.Page)
                .Select(x => new WidgetModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    Created = x.Created,
                    Updated = x.Updated
                })
                .ToListAsync();

            return new Page<WidgetModel>(items, count, model.Page);
        }
    }
}
