namespace Backend.Models.Crm;

public class CreateOrderModel
{
    public required CustomerReqModel Customer { get; set; }
    public List<OrderLinesReqModel> OrderLines { get; set; } = [];
}

public class CustomerReqModel
{
    public required string Name { get; set; }
    public required string Address { get; set; }
    public required string Email { get; set; }
}

public class OrderLinesReqModel
{
    public required string ProductId { get; set; }
    public int ItemCount { get; set; }
}

