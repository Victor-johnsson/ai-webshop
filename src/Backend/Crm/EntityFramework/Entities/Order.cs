using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Crm.EntityFramework.Entities;

namespace Backend.Crm.EntityFramework.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string? Status { get; set; }
        public string? PaymentId  { get; set; }
        public Customer? Customer { get; set; }
        public ICollection<OrderLine>? OrderLines { get; set; }
    }
}
