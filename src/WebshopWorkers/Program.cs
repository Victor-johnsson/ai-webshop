using Azure.Identity;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebShopX.FunctionService.Services;

var builder = FunctionsApplication.CreateBuilder(args);
builder.AddServiceDefaults();

builder.ConfigureFunctionsWebApplication();


var config = builder.Configuration;
config
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();
var credential = new DefaultAzureCredential();

builder.AddRedisClient("redis");
builder.AddAzureServiceBusClient("serviceBus");

builder.AddAzureTableServiceClient("tables");
builder.Services.AddApplicationInsightsTelemetryWorkerService();
builder.Services.Configure<LoggerFilterOptions>(options => options.MinLevel = LogLevel.Information);

builder.Services.AddTransient<ITableStorageService, TableStorageService>();

builder.Services.AddHttpClient<IPimService, PimService>(e =>
    e.BaseAddress = new Uri("https+http://productCatalog")
);

builder.Services.AddHttpClient<ICrmService, CrmService>(client =>
{
    client.BaseAddress = new Uri("https+http://crmApplication");
});
builder.Services.AddScoped<IRedisCacheService, RedisCacheService>();

builder.Build().Run();
