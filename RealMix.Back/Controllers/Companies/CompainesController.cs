﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RealMix.Common.Models;
using MediatR;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyPage;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.SaveCompany;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies;
using System.Collections.Generic;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompanyAll;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.DeleteCompany;
using RealMix.Core.Modules.Common.CompaniesDocuments.Companies.GetCompany;

namespace RealMix.Back.Controllers.Config
{

    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly IMediator _mediator;


        public CompaniesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<Page<CompanyModelFull>> GetPage([FromQuery] GetCompanyPageQuery model)
        {
            return await _mediator.Send(model);
        }
        [HttpGet("{id}")]
        public async Task<CompanyModelFull> GetFull([FromRoute] GetCompanyQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpGet("all")]
        public async Task<List<CompanyModel>> GetAll([FromQuery] GetCompanyAllQuery model)
        {
            return await _mediator.Send(model);
        }

        [HttpPost]
        public async Task Save([FromBody] SaveCompanyCommand model)
        {
            await _mediator.Send(model);
        }

        [HttpPost("{id}")]
        public async Task Delete([FromRoute] DeleteCompanyCommand model)
        {
            await _mediator.Send(model);
        }
    }
}
