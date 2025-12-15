namespace Backend.Pim.Models;

public record CreateProduct(string Name, decimal Price, int Stock, string? ImageBase64);
