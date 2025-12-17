using AppHost.Extensions;
using Aspire.Hosting.Azure;

var builder = DistributedApplication.CreateBuilder(args);

// ======== ENVIRONMENT & PARAMETERS ========
var env = builder.AddAzureAppServiceEnvironment("appservice-env");

var foundry = builder
    .AddAzureAIFoundry("foundry")
    .RunAsExisting("kiv-vj-resource", "rg-Viktor-8972");

var chat = foundry.AddDeployment("chat", AIFoundryModel.OpenAI.Gpt41);

// Storage Account Resources
var storage = builder.AddAzureStorage("storage").RunAsEmulator(e=>e.WithLifetime(ContainerLifetime.Persistent)).ConfigureStorageInfra();
var blobs = storage.AddBlobContainer("productimages");

var postgres = builder.AddAzurePostgresFlexibleServer("postgres");
var db = postgres.AddDatabase("db");
postgres.RunAsContainer(c => c.WithPgAdmin().WithLifetime(ContainerLifetime.Persistent));

// Backend Service
var backend = builder
    .AddProject<Projects.Backend>("backend")
    .WithExternalHttpEndpoints()
    .WithReference(blobs)
    .WithReference(db)
    .WithReference(chat)
    .WithUrlForEndpoint("https", url =>
    {
        url.DisplayText = "Scalar (HTTPS)";
        url.Url = "/scalar";
    })
    .WithUrlForEndpoint("http", url =>
    {
        url.DisplayText = "Scalar (HTTP)";
        url.Url = "/scalar";
    });

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
                      c.AddRoute("/api/{**catch-all}", backend);
                  }).PublishWithStaticFiles(frontend);

frontend.WithReference(yarp);
builder.Build().Run();
