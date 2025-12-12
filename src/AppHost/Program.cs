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

// Service Bus with Topics and Subscriptions
var servicebus = builder.AddAzureServiceBus("serviceBus").RunAsExisting("sbns-xproject-integrations", "rg-xproject-integrations");
var topic = servicebus.AddServiceBusTopic("topic", "sbt-xproject-integrations");
topic.AddServiceBusSubscription("logic-xproject-integrations");
topic.AddServiceBusSubscription("sbts-order-created");
topic.AddServiceBusSubscription("sbts-Transport-booking");

// Storage Account Resources
var storage = builder.AddAzureStorage("storage").RunAsExisting("strgxprojectintegrations", "rg-xproject-integrations");
// var blobs = storage.AddBlobs("productimages");
var blobs = storage.AddBlobContainer("productimages");

var tables = storage.AddTables("tables");

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

// Postgres for Payments Database
var paymentsDatabase = builder
    .AddAzurePostgresFlexibleServer("paymentsDatabase")
    .AddDatabase("payments");

// ======== PROJECTS/SERVICES ========
// Product Catalog Service
var productCatalog = builder
    .AddProject<Projects.PimApi>("productCatalog")
    .WithExternalHttpEndpoints()
    .WithReference(productsDatabase)
    .WaitFor(productsDatabase);

// CRM Application

// Payments Service
var paymentsService = builder
    .AddProject<Projects.PspApi>("paymentsService")
    .WithExternalHttpEndpoints()
    .WithReference(paymentsDatabase);

// Backend Service
var backend = builder
    .AddProject<Projects.Backend>("backend")
    .WithExternalHttpEndpoints()
    .WithReference(redis)
    .WithReference(servicebus)
    .WithReference(blobs)
    .WithReference(productCatalog)
    .WithReference(paymentsService)
    .WithReference(db)
    .WaitFor(redis)
    .WaitFor(servicebus)
    .WaitFor(paymentsService)
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
