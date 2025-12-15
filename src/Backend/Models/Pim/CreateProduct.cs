namespace Backend.Models.Pim;

public record CreateProduct(string Name, decimal Price, int Stock, string? ImageBase64);
