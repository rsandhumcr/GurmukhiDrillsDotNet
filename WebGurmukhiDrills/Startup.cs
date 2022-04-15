using System.Text;
using AutoMapper;
using DbGurmukhiMsSql;
using DbGurmukhiMsSql.Interface;
using GurmukhiAppMain.Letter;
using GurmukhiAppMain.Word;
using LetterTranslation;
using Logging;
using multipleChoiceGenerator;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebGurmukhiDrills.Data;
using WebGurmukhiDrills.Models;
using WebGurmukhiDrills.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using NLog.Web;
using WebGurmukhiDrills.Infrastructure;

namespace WebGurmukhiDrills
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new GurmukhiAppMain.Infrastructure.AutoMapper.AutoMapperProfileConfiguration());
            });

            services.AddSingleton<IMapper>(sp => config.CreateMapper());

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("GurmukhiDrillsIdentityDb")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddTransient<Logging.ILog, LogConsole>();
            services.Add(new ServiceDescriptor(typeof(IGurmukhiRepository),
                srvc => new GurmukhiRepository(Configuration.GetConnectionString("GurmukhiDrillsDatabase")), ServiceLifetime.Transient));

            services.AddSingleton<IConfigureHolder>(new ConfigureHolder(Configuration));
            services.AddSingleton<ILetterSerivceBuilder, LetterSerivceBuilder>();
            services.AddTransient<ITranslationService, TranslationService>();
            services.AddSingleton<ITranslationServiceBuilder, TranslationServiceBuilder>();

            services.AddSingleton<IRandomLetterGenerator, RandomLetterGenerator>();
            services.AddSingleton<IRandomLetterService, RandomLetterService>();
            services.AddSingleton<IGroupLetterService, GroupLetterService>();
            services.AddSingleton<ILetterIndexGroupGenerator, LetterIndexGroupGenerator>();
            services.AddSingleton<ILetterGroupMapping, LetterGroupMapping>();
            services.AddSingleton<ILettersMulipleChoiceGenerator, LettersMulipleChoiceGenerator>();
            services.AddTransient(typeof(IMultipleChoiceGenerator<>), typeof(MultipleChoiceGenerator<>));
            services.AddTransient<IWordCategoryService, WordCategoryService>();
            services.AddTransient<IWordSubCategoryService, WordSubCategoryService>();
            services.AddTransient<IWordTranslationService, WordTranslationService>();
            services.AddTransient<IWordMultipleChoiceGenerator, WordMultipleChoiceGenerator>();
            services.AddTransient<IAppUtilities, AppUtilities>();
            
            services.AddMvc();
            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            env.ConfigureNLog("nlog.config");
            // make sure Chinese chars don't fk up
            //Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            //add NLog to ASP.NET Core
            loggerFactory.AddNLog();
            //add NLog.Web
            app.AddNLogWeb();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
        
        app.UseStaticFiles();
            app.UseIdentity();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Exercise" });
            });
        }
    }
}
