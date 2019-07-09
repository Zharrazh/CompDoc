using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RealMix.Core.Infrastructure.Models;
using RealMix.Common.Extensions;

namespace RealMix.Back.Middleware
{
    public class CqrsMiddleware
    {
        private readonly RequestDelegate _next;

        public CqrsMiddleware(RequestDelegate next)
        {
            _next = next;
        }


        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                if (e is BadRequestException badRequest)
                {
                    context.Response.StatusCode = 400;
                    context.Response.ContentType = "application/json";
                    var jsonString = JsonConvert.SerializeObject(new CommonResponse
                    {
                        IsError = true,
                        Message = e.GetFullExceptionMessage()
                    });
                    await context.Response.WriteAsync(jsonString, Encoding.UTF8);
                }
                else if (e is NotFoundException notFound)
                {
                    context.Response.StatusCode = 404;
                }
                else throw;
            }
        }
    }
}
