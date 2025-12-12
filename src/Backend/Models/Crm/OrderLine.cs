using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Backend.Models.Crm;

namespace Backend.Models.Crm;

public class OrderLine
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public string ProdRef { get; set; } = string.Empty;
    public int ItemCount { get; set; }
}
