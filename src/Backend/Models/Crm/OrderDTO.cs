namespace Backend.Models.Crm;

public class OrderDTO
{
    public Guid OrderId { get; set; }
    public string? CustomerName { get; set; }
    public string? OrderStatus { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerAddress { get; set; }
}
