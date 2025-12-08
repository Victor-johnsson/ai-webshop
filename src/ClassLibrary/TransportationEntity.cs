namespace Transportation;

public class TransportationEntity
{
    public required string PartitionKey { get; set; }
    public required string RowKey { get; set; }
    public required string Status { get; set; }
    public required string CustomerName { get; set; }
    public required string CustomerEmail { get; set; }
    public required string CustomerAddress { get; set; }
}
