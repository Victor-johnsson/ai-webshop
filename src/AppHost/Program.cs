using Aspire.Hosting.Yarp.Transforms;
using Extensions;

var builder = DistributedApplication.CreateBuilder(args);

// ======== ENVIRONMENT & PARAMETERS ========
var env = builder.AddAzureAppServiceEnvironment("xproj-environment");

// ======== AZURE SERVICES ========
// Redis Cache
var redis = builder
    .AddAzureRedis("redis")
    .WithAccessKeyAuthentication()
    .RunAsExisting("redis-xproject-integrations", "rg-xproject-integrations");

// Storage Account Resources
var storage = builder.AddAzureStorage("storage").RunAsExisting("strgxprojectintegrations", "rg-xproject-integrations");
// var blobs = storage.AddBlobs("productimages");
var blobs = storage.AddBlobContainer("productimages");


// ======== DATABASES ========
// CosmosDB for Product Information
var cosmos = builder
    .AddAzureCosmosDB("cosmospim")
    .RunAsExisting("cosmosdb-ugx47vukmeif2","rg-x-integration-pim")
    .ConfigureAzureCosmosDbInfra();

var productsDatabase = cosmos.AddCosmosDatabase("productsCosmosDb", "db");

// Postgres for CRM (local Docker)
var crmPostgres = builder.AddPostgres("crm-db");
var db = crmPostgres.AddDatabase("db");


// ======== PROJECTS/SERVICES ========
// Product Catalog Service
var productCatalog = builder
    .AddProject<Projects.PimApi>("productCatalog")
    .WithExternalHttpEndpoints()
    .WithReference(productsDatabase)
    .WaitFor(productsDatabase);


// Backend Service
var backend = builder
    .AddProject<Projects.Backend>("backend")
    .WithExternalHttpEndpoints()
    .WithReference(redis)
    .WithReference(blobs)
    .WithReference(productCatalog)
    .WithReference(db)
    .WaitFor(redis)
    .WaitFor(productCatalog);

// Frontend Application
var frontend = builder
    .AddViteApp("frontend", "../Frontend")
    .WaitFor(backend);

var yarp = builder.AddYarp("yarp")
                  .WithExternalHttpEndpoints()
                  .WithConfiguration(c =>
                  {
                      c.AddRoute("/api/{**catch-all}", backend)
                      .WithTransformPathRemovePrefix("/api");

                  });

frontend.WithReference(yarp);
builder.Build().Run();
