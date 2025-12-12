using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace Backend.Crm.EntityFramework.Entities
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string? ProdRef { get; set; } // External, product stored in CosmosDB 
        public Backend.Crm.EntityFramework.Entities.Order? Order { get; set; } // Navigation property
        public int ItemCount { get; set; }
    }
}
