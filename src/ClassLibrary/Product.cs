
namespace Products;

public class Product
{
    // [JsonIgnore]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required int Price { get; set; }
    public required int Stock { get; set; }
    public string? ImageUrl { get; set; }
}
