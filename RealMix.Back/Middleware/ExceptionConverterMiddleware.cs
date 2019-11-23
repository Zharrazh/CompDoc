using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RealMix.Core.Infrastructure.Models;
using RealMix.Common.Extensions;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.Logging;

namespace RealMix.Back.Middleware
{
    public class ExceptionConverterMiddleware
    {
        private readonly ILogger<ExceptionConverterMiddleware> _logger;
        private readonly RequestDelegate _next;
        private readonly JsonSerializerSettings _jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        };

        public ExceptionConverterMiddleware(RequestDelegate next, ILogger<ExceptionConverterMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }


        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Unhandled exception");
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";
                    var jsonString = JsonConvert.SerializeObject(new CommonResponse
                    {
                        IsError = true,
                        Message = e.GetFullExceptionMessage()
                    }, _jsonSettings);
                    await context.Response.WriteAsync(jsonString, Encoding.UTF8);
                }
            }
        }
    }
}
