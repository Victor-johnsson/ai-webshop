namespace ClassLibrary.Models;

public class OrderLine
{
    public required Guid ProductId { get; set; }
    public required int ItemCount { get; set; }
}
