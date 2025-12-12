using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Pim;

public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public int? Price { get; set; }
    public int? Stock { get; set; }
    public string? ImageUrl { get; set; }
    public string? ImageBase64 { get; set; }
}
