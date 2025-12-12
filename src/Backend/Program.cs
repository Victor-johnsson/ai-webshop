using System.Text.Json;
using Backend.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using XProjectIntegrationsBackend.Interfaces;
using XProjectIntegrationsBackend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
builder.Services.AddScoped<Backend.Crm.Services.IOrderService, Backend.Crm.Services.OrderService>();
builder.Services.AddDbContext<BackendDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("db"))
);

builder.AddRedisClient("redis");

builder.AddAzureServiceBusClient("serviceBus");
builder.AddAzureBlobContainerClient("productimages");

builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddHttpClient<IPaymentsService, PaymentsService>();


builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder
    .Services.AddAuthorizationBuilder()
    .AddPolicy(
        "MustBeAdmin",
        policy =>
        {
            policy.RequireRole("Admin.Write");
            policy.RequireAuthenticatedUser();
        }
    );

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

builder.Services.AddScoped<IRedisCacheService, RedisCacheService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

// Configure HTTP request pipeline
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Apply EF Core migrations at startup
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<BackendDbContext>();
//     db.Database.Migrate();
// }

app.Run();
