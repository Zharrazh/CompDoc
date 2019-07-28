using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RealMix.Db;
using Microsoft.EntityFrameworkCore;
using MediatR;
using RealMix.Core;
using Scrutor;
using RealMix.Core.Infrastructure.Services;
using RealMix.Common.Services;
using RealMix.Core.Models.Config;
using FluentMigrator.Runner;
using RealMix.Back.Middleware;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IO;

namespace RealMix.Back
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var authConfig = Configuration.GetSection("Auth").Get<AuthConfigModel>();
            var connectionString = Configuration.GetSection("Connections").GetValue<string>("Default");

            services
                .AddAuthentication(o =>
                {
                    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.Key));
                    options.TokenValidationParameters.ValidIssuer = authConfig.Issuer;
                    options.TokenValidationParameters.ValidAudience = authConfig.Audience;
                    options.TokenValidationParameters.IssuerSigningKey = key;
                    options.TokenValidationParameters.ValidateIssuerSigningKey = true;
                    options.TokenValidationParameters.ValidateLifetime = true;
                    options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
                });
            services.AddAuthorization();

            services.AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSQLite()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(DatabaseContext).Assembly).For.Migrations()
                );

            services.AddMediatR(typeof(Anchor).Assembly);
            services.AddDbContext<DatabaseContext>(options => options.UseSqlite(connectionString));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddResponseCompression();

            services
                .AddSingleton(typeof(ILogger<>), typeof(LoggerService<>))
                .AddSingleton<IHashService>(new HashService(authConfig.PasswordSalt));

            services.Scan(scan => scan
                .FromAssemblyOf<Anchor>()
                .AddClasses(classes => classes.InNamespaces("RealMix.Core.Services").Where(type => type.Name.EndsWith("Service")))
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsImplementedInterfaces()
                .WithTransientLifetime());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IMigrationRunner runner, IApplicationBuilder app, IHostingEnvironment env)
        {
            runner.MigrateUp();

            app.UseResponseCompression();

            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                var path = context.Request.Path.Value;
                if (!path.StartsWith("/api") && !Path.HasExtension(path))
                    context.Request.Path = "/index.html";
                await next();
            });

            app.UseCqrs();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
