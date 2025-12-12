using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Crm.EntityFramework.Entities;

namespace Backend.Crm.EntityFramework.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public Order? Order { get; set; } // Navigation property
    }
}
