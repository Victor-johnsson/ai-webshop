using Aspire.Hosting.Azure;
using Azure.Provisioning.Storage;

namespace AppHost.Extensions;

public static class InfraExtensions
{

    // public static IResourceBuilder<AzureRedisCacheResource> ConfigureRedisInfra(this IResourceBuilder<AzureRedisCacheResource>? redis)
    // {
    //
    //     ArgumentNullException.ThrowIfNull(redis);
    //     return redis.ConfigureInfrastructure(infra =>
    //     {
    //         var redisc = infra
    //             .GetProvisionableResources()
    //             .OfType<Azure.Provisioning.Redis.RedisResource>()
    //             .Single();
    //
    //         redisc.Sku = new()
    //         {
    //             Family = RedisSkuFamily.BasicOrStandard,
    //             Name = RedisSkuName.Basic,
    //             Capacity = 0,
    //         };
    //     });
    // }

    public static IResourceBuilder<AzureStorageResource> ConfigureStorageInfra(this IResourceBuilder<AzureStorageResource>? storage)
    {
        ArgumentNullException.ThrowIfNull(storage);
        return storage.ConfigureInfrastructure(infra =>
        {
            var storageConf = infra.GetProvisionableResources().OfType<StorageAccount>().Single();
            storageConf.Sku = new StorageSku() { Name = StorageSkuName.StandardLrs };
            storageConf.AllowBlobPublicAccess = true;

        });
    }

}
