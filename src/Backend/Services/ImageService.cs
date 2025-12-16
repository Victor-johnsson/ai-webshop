using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Backend.Services;

public interface IImageService
{
    Task<string> UploadImageAsync(string base64Image, string fileName);
    Task SetPublicReadOnExistingContainer();
}

public class ImageService(BlobContainerClient blobServiceClient, ILogger<ImageService> logger) : IImageService
{
    private readonly ILogger<ImageService> _logger = logger;

    private readonly BlobContainerClient _blobServiceClient = blobServiceClient;

    public async Task<string> UploadImageAsync(string base64Image, string fileName)
    {
        try
        {
            string base64Data = base64Image;
            if (base64Image.Contains(','))
            {
                base64Data = base64Image[(base64Image.IndexOf(',') + 1)..];
            }

            byte[] imageBytes = Convert.FromBase64String(base64Data);

            string extension = DetermineFileExtension(base64Image);

            string blobName = $"{fileName}_{DateTime.Now:yyyyMMddHHmmssffff}{extension}";

            return await UploadToBlobStorageAsync(imageBytes, blobName, extension);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading base64 image to storage");
            throw;
        }
    }

    private static string DetermineFileExtension(string base64Image)
    {
        if (!base64Image.Contains("data:image/"))
        {
            return ".jpg";
        }
        string mimeType = base64Image.Split(',')[0].Split(':')[1].Split(';')[0];
        return mimeType switch
        {
            "image/png" => ".png",
            "image/jpeg" => ".jpg",
            "image/gif" => ".gif",
            _ => ".jpg",
       };
    }

    public async Task SetPublicReadOnExistingContainer()
    {
        try
        {
            // Check if the container exists
            if (!await _blobServiceClient.ExistsAsync())
            {
                return;
            }
            await _blobServiceClient.SetAccessPolicyAsync(PublicAccessType.Blob, null);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }

    private async Task<string> UploadToBlobStorageAsync(
        byte[] imageBytes,
        string blobName,
        string extension
    )
    {
        // var containerClient = _blobServiceClient.GetBlobContainerClient();
        var blobClient = _blobServiceClient.GetBlobClient(blobName);

        using (var stream = new MemoryStream(imageBytes))
        {
            await blobClient.UploadAsync(
                stream,
                new BlobHttpHeaders
                {
                    ContentType = extension switch
                    {
                        ".png" => "image/png",
                        ".jpg" or ".jpeg" => "image/jpeg",
                        ".gif" => "image/gif",
                        _ => "application/octet-stream",
                    },
                }

            );
        }

        return blobClient.Uri.ToString();
    }
}
