using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RealMix.Api.Models;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;
using MediatR;

namespace RealMix.Api.Controllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/values
        [HttpGet]
        [Route(nameof(GetPage))]
        public Page<Widget> GetPage(int page)
        {
            return null;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [Route(nameof(GetItem))]
        public Widget GetItem(int id)
        {
            return null;
        }

        // POST api/values
        [HttpPost]
        [Route(nameof(Save))]
        public void Save([FromBody] Widget model)
        {
        }
    }
}
