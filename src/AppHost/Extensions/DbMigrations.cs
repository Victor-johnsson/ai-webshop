using System.Diagnostics;
using AppHost.Extensions;
using Aspire.Hosting.Pipelines;
using Microsoft.Extensions.Logging;
//
namespace AppHost.Extensions;

public static class ExtMethods
{
    private const string Message = "Data Recieved: {Data}";

    extension(IDistributedApplicationBuilder builder)
    {
        public IResourceBuilder<ExecutableResource> AddEfMigrate(IResourceBuilder<ProjectResource> app, IResourceBuilder<IResourceWithConnectionString> database)
        {
            var projectDirectory = Path.GetDirectoryName(app.Resource.GetProjectMetadata().ProjectPath)!;

            var efmigrate = builder.AddExecutable(
                            $"ef-migrate-{app.Resource.Name}",
                            "dotnet",
                            projectDirectory)
                .WithArgs("ef")
                .WithArgs("database")
                .WithArgs("update")
                .WithArgs("--no-build")
                .WithArgs("--connection")
                .WithArgs(database.Resource)
                .WithEnvironment("DOTNET_ENVIRONMENT", "Development")
                .WaitFor(database);


            efmigrate.WithPipelineStepFactory(factoryContext =>
                      {
                          var step = new PipelineStep
                          {
                              Name = $"ef-migration-bundle-{app.Resource.Name}",
                              Tags = [WellKnownPipelineTags.BuildCompute],
                              Action = async context =>
                              {
                                  var psi = new ProcessStartInfo
                                  {
                                      FileName = "dotnet",
                                      RedirectStandardError = true,
                                      RedirectStandardOutput = true,
                                      WorkingDirectory = projectDirectory
                                  };
                                  // dotnet ef migrations bundle --self-contained -r linux-x64
                                  psi = psi.WithArgs("ef", "migrations", "bundle", "--self-contained", "-r", "linux-x64");

                                  await psi.ExecuteAsync(context.Logger, context.CancellationToken);
                              }
                          };

                          return [step];
                      });

            efmigrate.WithPipelineConfiguration(context =>
            {
                var appContainerBuildSteps = context.GetSteps(app.Resource, WellKnownPipelineTags.BuildCompute);

                var migrationBundle = context.GetSteps(efmigrate.Resource, WellKnownPipelineTags.BuildCompute);

                appContainerBuildSteps.DependsOn(migrationBundle);
            });

            return efmigrate;
        }
    }

    extension(ProcessStartInfo psi)
    {
        public ProcessStartInfo WithArgs(params string[] args)
        {
            foreach (string arg in args)
            {
                psi.ArgumentList.Add(arg);
            }
            return psi;
        }

        // Exec with logs

        public Task<int> ExecuteAsync(ILogger logger, CancellationToken cancellationToken = default)
        {
            var tcs = new TaskCompletionSource<int>();

            var process = new Process
            {
                StartInfo = psi,
                EnableRaisingEvents = true
            };

            process.OutputDataReceived += (sender, e) =>
            {
                if (e.Data != null)
                {
#pragma warning disable CA1873 // Avoid potentially expensive logging
                    logger.LogDebug(Message, e.Data);
                }
            };

            process.ErrorDataReceived += (sender, e) =>
            {
                if (e.Data != null)
                {
                    logger.LogDebug(Message, e.Data);
                }
            };

#pragma warning restore CA1873 // Avoid potentially expensive logging
            process.Exited += (sender, e) =>
            {
                tcs.SetResult(process.ExitCode);
                process.Dispose();
            };

            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            cancellationToken.Register(() =>
            {
                if (!process.HasExited)
                {
                    process.Kill();
                }
            });

            return tcs.Task;
        }
    }
}
