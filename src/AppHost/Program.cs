using Aspire.Hosting.Yarp.Transforms;

var builder = DistributedApplication.CreateBuilder(args);

// ======== ENVIRONMENT & PARAMETERS ========
var env = builder.AddAzureAppServiceEnvironment("xproj-environment");

// ======== AZURE SERVICES ========
// Redis Cache
var redis = builder
    .AddAzureRedis("redis")
    .RunAsContainer();

// Storage Account Resources
var storage = builder.AddAzureStorage("storage").RunAsEmulator();
var blobs = storage.AddBlobContainer("productimages");


// Postgres for CRM (local Docker)
var postgres = builder.AddPostgres("postgres").WithPgAdmin();
var db = postgres.AddDatabase("db");

// Backend Service
var backend = builder
    .AddProject<Projects.Backend>("backend")
    .WithExternalHttpEndpoints()
    .WithReference(redis)
    .WithReference(blobs)
    .WithReference(db)
    .WaitFor(redis);

var migrations = builder.AddEfMigrate(backend, db);

backend.WaitForCompletion(migrations);
backend.WithChildRelationship(migrations);



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



