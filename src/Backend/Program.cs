using System.Text.Json;
using Backend.EntityFramework;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddOpenApi();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient();
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
builder.Services.AddScoped<IOrderService, OrderService>();
builder.AddNpgsqlDbContext<BackendDbContext>("db");
builder.EnrichNpgsqlDbContext<BackendDbContext>();
builder.AddAzureBlobContainerClient("productimages");
builder.Services.AddScoped<IImageService, ImageService>();
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


var app = builder.Build();


// Configure HTTP request pipeline
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapOpenApi();

app.MapScalarApiReference(options =>
{
   options.WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
   options.Theme = ScalarTheme.Kepler;
});

using var scope = app.Services.CreateScope();
var imageServiceScope = scope.ServiceProvider.GetRequiredService<IImageService>();
await imageServiceScope.SetPublicReadOnExistingContainer();

// Seed the database in development environment only
var env = app.Services.GetRequiredService<IWebHostEnvironment>();
if (env.IsDevelopment())
{
    var db = scope.ServiceProvider.GetRequiredService<BackendDbContext>();
    Backend.SeedData.SeedDatabase(db);
}

app.Run();
