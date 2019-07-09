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

            services.AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSQLite()
                    .WithGlobalConnectionString(connectionString)
                    .ScanIn(typeof(DatabaseContext).Assembly).For.Migrations()
                );

            services.AddMediatR(typeof(Anchor).Assembly);
            services.AddDbContext<DatabaseContext>(options => options.UseSqlite(connectionString));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

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

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.UseCqrs();

            app.UseCors(x => x.AllowAnyOrigin());
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
